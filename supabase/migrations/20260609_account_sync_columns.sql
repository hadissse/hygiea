
-- Advisor hardening: pin search_path; make handle_new_user trigger-only
-- (it was callable via /rest/v1/rpc as SECURITY DEFINER).
alter function public.set_updated_at() set search_path = '';
revoke execute on function public.handle_new_user() from public, anon, authenticated;
alter function public.handle_new_user() set search_path = '';
