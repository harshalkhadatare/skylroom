-- =========================================================
-- Drift — Supabase schema
-- Run this in your Supabase project:  Dashboard → SQL Editor
-- → New query → paste → Run.  It is safe to run more than once.
-- =========================================================

-- ---------------------------------------------------------
-- 1. PROFILES  (one row per user; the "required fields")
-- ---------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text,
  display_name text,
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are readable by owner" on public.profiles;
create policy "profiles are readable by owner"
  on public.profiles for select using (auth.uid() = id);

drop policy if exists "profiles are updatable by owner" on public.profiles;
create policy "profiles are updatable by owner"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------
-- 2. MIXES  (each saved soundscape belongs to one user)
-- ---------------------------------------------------------
create table if not exists public.mixes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text not null,
  master     int  not null default 78,
  channels   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists mixes_user_id_created_idx
  on public.mixes (user_id, created_at desc);

alter table public.mixes enable row level security;

-- A user may only see, add, or remove their OWN mixes.
drop policy if exists "read own mixes" on public.mixes;
create policy "read own mixes"
  on public.mixes for select using (auth.uid() = user_id);

drop policy if exists "insert own mixes" on public.mixes;
create policy "insert own mixes"
  on public.mixes for insert with check (auth.uid() = user_id);

drop policy if exists "update own mixes" on public.mixes;
create policy "update own mixes"
  on public.mixes for update using (auth.uid() = user_id);

drop policy if exists "delete own mixes" on public.mixes;
create policy "delete own mixes"
  on public.mixes for delete using (auth.uid() = user_id);
