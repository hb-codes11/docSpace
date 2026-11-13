create table public.tool_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  last_tool text not null check (last_tool in ('merge', 'split', 'word'))
);

alter table public.tool_preferences enable row level security;
revoke all on public.tool_preferences from public, anon, authenticated;
grant select, insert, update on public.tool_preferences to authenticated;

create policy "Read own preferences" on public.tool_preferences
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Create own preferences" on public.tool_preferences
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own preferences" on public.tool_preferences
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
