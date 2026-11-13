create function public.increment_tool_usage(tool_name text)
returns void
language sql
security invoker
set search_path = ''
as $$
  insert into public.user_tool_stats (user_id, tool)
  values (auth.uid(), tool_name)
  on conflict (user_id, tool) do update
    set operations_count = user_tool_stats.operations_count + 1,
        last_used_at = now();
$$;

revoke all on function public.increment_tool_usage(text) from public, anon;
grant execute on function public.increment_tool_usage(text) to authenticated;
