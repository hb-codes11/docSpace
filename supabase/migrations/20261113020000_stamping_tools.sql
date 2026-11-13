alter table public.tool_preferences
  drop constraint tool_preferences_last_tool_check,
  add constraint tool_preferences_last_tool_check
  check (last_tool in ('merge','split','word','organize','images','export','compress','docx','watermark','numbers'));

alter table public.user_tool_stats
  drop constraint user_tool_stats_tool_check,
  add constraint user_tool_stats_tool_check
  check (tool in ('merge','split','word','organize','images','export','compress','docx','watermark','numbers'));
