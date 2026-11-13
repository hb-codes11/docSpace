alter table public.tool_preferences
  drop constraint tool_preferences_last_tool_check,
  add constraint tool_preferences_last_tool_check
    check (last_tool in ('merge', 'split', 'word', 'organize', 'images', 'export', 'compress', 'docx'));
