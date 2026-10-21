-- AZ-Ready database schema (ready to apply when a backend is connected).
-- The app currently reads content from src/data and stores attempts locally;
-- these tables mirror those shapes one-to-one.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  created_at timestamptz not null default now()
);

create table public.topics (
  id text primary key,
  name text not null,
  category text not null check (category in ('cloud','architecture','governance')),
  description text
);

create table public.questions (
  id text primary key,
  topic_id text not null references public.topics(id) on delete cascade,
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer char(1) not null check (correct_answer in ('a','b','c','d')),
  explanation text not null,
  key_concept text,
  common_misconception text,
  difficulty text not null check (difficulty in ('Easy','Medium','Hard'))
);

create table public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references public.questions(id) on delete cascade,
  selected_answer char(1) not null,
  is_correct boolean not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.topics enable row level security;
alter table public.questions enable row level security;
alter table public.attempts enable row level security;

create policy "own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "topics readable" on public.topics for select using (true);
create policy "questions readable" on public.questions for select using (true);
create policy "own attempts read" on public.attempts for select using (auth.uid() = user_id);
create policy "own attempts insert" on public.attempts for insert with check (auth.uid() = user_id);
