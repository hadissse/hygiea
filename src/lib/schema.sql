-- Sukoon database schema

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Users (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Charts
create table if not exists public.charts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'natal',
  birth_date date not null,
  birth_time time not null,
  birth_place text not null,
  latitude double precision not null,
  longitude double precision not null,
  timezone text not null,
  chart_json jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Events (log entries)
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  note text,
  mood text,
  energy text,
  tags text[] default '{}',
  placement_key text,
  extra jsonb default '{}'
);

-- Calibrations (user-adjusted planet positions)
create table if not exists public.calibrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  planet text not null,
  degree_offset double precision not null default 0,
  updated_at timestamptz not null default now(),
  unique(user_id, planet)
);

-- Traits (cached trait profile)
create table if not exists public.traits (
  user_id uuid primary key references auth.users(id) on delete cascade,
  profile_json jsonb not null,
  updated_at timestamptz not null default now()
);

-- Journey progress
create table if not exists public.journey_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  journey_id text not null,
  week_start date not null,
  step_index integer not null default 0,
  completed_steps integer[] default '{}',
  journal_entries jsonb default '{}',
  updated_at timestamptz not null default now(),
  unique(user_id, journey_id, week_start)
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.charts enable row level security;
alter table public.events enable row level security;
alter table public.calibrations enable row level security;
alter table public.traits enable row level security;
alter table public.journey_progress enable row level security;

-- RLS policies: each user can only access their own rows
create policy "profiles: own" on public.profiles for all using (auth.uid() = id);
create policy "charts: own" on public.charts for all using (auth.uid() = user_id);
create policy "events: own" on public.events for all using (auth.uid() = user_id);
create policy "calibrations: own" on public.calibrations for all using (auth.uid() = user_id);
create policy "traits: own" on public.traits for all using (auth.uid() = user_id);
create policy "journey_progress: own" on public.journey_progress for all using (auth.uid() = user_id);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger charts_updated_at before update on public.charts
  for each row execute function public.set_updated_at();
create trigger calibrations_updated_at before update on public.calibrations
  for each row execute function public.set_updated_at();
create trigger traits_updated_at before update on public.traits
  for each row execute function public.set_updated_at();
create trigger journey_progress_updated_at before update on public.journey_progress
  for each row execute function public.set_updated_at();

-- ============================================================
-- Hygiea additive tables (Phase 0 schema migration)
-- ============================================================

-- Soul Barometer daily reading
create table if not exists public.soul_barometer (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  reading text check (reading in (
    'hardened_ahrimanic',
    'tilting_ahrimanic',
    'centered',
    'tilting_luciferic',
    'dispersed_luciferic'
  )),
  signals jsonb default '{}',
  created_at timestamptz not null default now(),
  unique(user_id, date)
);

-- Evening Rückschau (backward day review)
create table if not exists public.ruckschau (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  reverse_entries jsonb default '[]',
  witness_note text,
  created_at timestamptz not null default now(),
  unique(user_id, date)
);

-- Six exercises progress (6-day cycle)
create table if not exists public.exercise_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  week_start date not null,
  day_index integer check (day_index between 0 and 5),
  exercise_id integer check (exercise_id between 1 and 6),
  completed boolean default false,
  reflection text,
  created_at timestamptz not null default now(),
  unique(user_id, week_start, day_index)
);

-- Calendar of the Soul (52 weekly verses)
create table if not exists public.calendar_soul_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  year integer not null,
  week_number integer check (week_number between 1 and 52),
  read_at timestamptz,
  verse_reflection text,
  unique(user_id, year, week_number)
);

-- Ninefold constitution cache
create table if not exists public.constitution (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  biographical_phase integer,
  dominant_temperament text,
  ninefold_json jsonb default '{}',
  updated_at timestamptz not null default now(),
  unique(user_id)
);

-- Goethean observation journal
create table if not exists public.goethean_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  kingdom text check (kingdom in ('mineral', 'plant', 'animal', 'human')),
  observation text not null,
  interpretation text,
  created_at timestamptz not null default now()
);

-- Foundation Stone quarterly arc
create table if not exists public.foundation_arc (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  arc_number integer check (arc_number between 1 and 4),
  arc_start date not null,
  movement_id integer check (movement_id between 1 and 4),
  reflection text,
  completed_at timestamptz,
  unique(user_id, arc_number)
);

-- AI synthesis log (audit trail — no journal text stored here)
create table if not exists public.ai_synthesis_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  input_context jsonb default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default now()
);

-- RLS on all Hygiea tables
alter table public.soul_barometer    enable row level security;
alter table public.ruckschau         enable row level security;
alter table public.exercise_progress enable row level security;
alter table public.calendar_soul_log enable row level security;
alter table public.constitution      enable row level security;
alter table public.goethean_entries  enable row level security;
alter table public.foundation_arc    enable row level security;
alter table public.ai_synthesis_log  enable row level security;

create policy "soul_barometer: own"    on public.soul_barometer    for all using (auth.uid() = user_id);
create policy "ruckschau: own"         on public.ruckschau         for all using (auth.uid() = user_id);
create policy "exercise_progress: own" on public.exercise_progress for all using (auth.uid() = user_id);
create policy "calendar_soul_log: own" on public.calendar_soul_log for all using (auth.uid() = user_id);
create policy "constitution: own"      on public.constitution      for all using (auth.uid() = user_id);
create policy "goethean_entries: own"  on public.goethean_entries  for all using (auth.uid() = user_id);
create policy "foundation_arc: own"    on public.foundation_arc    for all using (auth.uid() = user_id);
create policy "ai_synthesis_log: own"  on public.ai_synthesis_log  for all using (auth.uid() = user_id);

-- updated_at trigger for constitution
create trigger constitution_updated_at before update on public.constitution
  for each row execute function public.set_updated_at();
