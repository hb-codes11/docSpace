-- Migration: 20261113000000_scalable_schema_rls.sql
-- Description: Scalable Supabase architecture with strict Row Level Security (RLS), user profiles, and tool usage tracking.

-- 1. Ensure tool_preferences table has updated constraints and index
alter table public.tool_preferences
  add column if not exists updated_at timestamptz default now();

create index if not exists idx_tool_preferences_user_id
  on public.tool_preferences (user_id);

-- Ensure RLS is active and policies are strictly bounded
alter table public.tool_preferences enable row level security;
revoke all on public.tool_preferences from public, anon;
grant select, insert, update, delete on public.tool_preferences to authenticated;

drop policy if exists "Read own preferences" on public.tool_preferences;
create policy "Read own preferences" on public.tool_preferences
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Create own preferences" on public.tool_preferences;
create policy "Create own preferences" on public.tool_preferences
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Update own preferences" on public.tool_preferences;
create policy "Update own preferences" on public.tool_preferences
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Delete own preferences" on public.tool_preferences;
create policy "Delete own preferences" on public.tool_preferences
  for delete to authenticated using ((select auth.uid()) = user_id);

-- 2. User Profiles Table
create table if not exists public.user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  theme text default 'system' check (theme in ('system', 'light', 'dark')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.user_profiles enable row level security;
revoke all on public.user_profiles from public, anon;
grant select, insert, update on public.user_profiles to authenticated;

drop policy if exists "Users can read own profile" on public.user_profiles;
create policy "Users can read own profile" on public.user_profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.user_profiles;
create policy "Users can update own profile" on public.user_profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can insert own profile" on public.user_profiles;
create policy "Users can insert own profile" on public.user_profiles
  for insert to authenticated with check ((select auth.uid()) = id);

-- Trigger to create profile automatically upon user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Anonymous Tool Usage Statistics Table (Per User, for Scalable Dashboard)
create table if not exists public.user_tool_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users (id) on delete cascade not null,
  tool text not null check (tool in ('merge', 'split', 'organize', 'images', 'export', 'compress', 'docx', 'word')),
  operations_count integer default 1 check (operations_count >= 0),
  last_used_at timestamptz default now() not null,
  constraint uq_user_tool unique (user_id, tool)
);

create index if not exists idx_user_tool_stats_user_id
  on public.user_tool_stats (user_id);

alter table public.user_tool_stats enable row level security;
revoke all on public.user_tool_stats from public, anon;
grant select, insert, update on public.user_tool_stats to authenticated;

drop policy if exists "Users can read own tool stats" on public.user_tool_stats;
create policy "Users can read own tool stats" on public.user_tool_stats
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own tool stats" on public.user_tool_stats;
create policy "Users can insert own tool stats" on public.user_tool_stats
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own tool stats" on public.user_tool_stats;
create policy "Users can update own tool stats" on public.user_tool_stats
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

