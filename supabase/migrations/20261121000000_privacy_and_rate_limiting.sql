// Migration: 20261121000000_privacy_and_rate_limiting.sql
-- Description: Adds sign, sanitize, and redact tools with Postgres RLS rate-limiting function.

-- 1. Update allowed tools check constraints
alter table public.tool_preferences
  drop constraint tool_preferences_last_tool_check,
  add constraint tool_preferences_last_tool_check
  check (last_tool in ('merge','split','word','organize','images','export','compress','docx','watermark','numbers','scan','sign','sanitize','redact'));

alter table public.user_tool_stats
  drop constraint user_tool_stats_tool_check,
  add constraint user_tool_stats_tool_check
  check (tool in ('merge','split','word','organize','images','export','compress','docx','watermark','numbers','scan','sign','sanitize','redact'));

-- 2. Security Audit & Pentest Defense: User Action Rate Limiting Table
create table if not exists public.user_security_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users (id) on delete cascade not null,
  event_type text not null check (event_type in ('pdf_operation', 'preference_sync', 'auth_verify')),
  created_at timestamptz default now() not null
);

create index if not exists idx_user_security_events_user_time
  on public.user_security_events (user_id, created_at desc);

alter table public.user_security_events enable row level security;
revoke all on public.user_security_events from public, anon;
grant select, insert on public.user_security_events to authenticated;

create policy "Users can view own security events" on public.user_security_events
  for select to authenticated using ((select auth.uid()) = user_id);

create policy "Users can record security event" on public.user_security_events
  for insert to authenticated with check ((select auth.uid()) = user_id);

-- 3. Rate-limiting check function (returns false if user exceeds 60 events/minute)
create or replace function public.check_rate_limit(p_event text default 'pdf_operation')
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count int;
begin
  if auth.uid() is null then
    return true;
  end if;

  select count(*) into recent_count
  from public.user_security_events
  where user_id = auth.uid()
    and event_type = p_event
    and created_at > (now() - interval '1 minute');

  if recent_count >= 60 then
    return false;
  end if;

  insert into public.user_security_events (user_id, event_type)
  values (auth.uid(), p_event);

  return true;
end;
$$;

revoke all on function public.check_rate_limit(text) from public, anon;
grant execute on function public.check_rate_limit(text) to authenticated;
