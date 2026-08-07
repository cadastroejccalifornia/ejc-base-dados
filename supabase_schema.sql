-- ============================================================
-- EJC Califórnia — Base de Dados (Supabase)
-- Projeto: lmxepyuclguashzafzak
-- Rode este script inteiro em: Supabase Dashboard > SQL Editor > New query > Run
-- ============================================================

-- ---------- Tabelas ----------

create table dirigentes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  nome text not null,
  email text not null,
  cargo text not null,
  created_at timestamptz default now()
);

create table jovens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  nome text not null,
  telefone text,
  mjc text,
  ejc text,
  endereco text,
  instrumento text,
  ativo boolean default true,
  ficha jsonb,
  created_at timestamptz default now()
);

create table tios (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  nome text not null,
  telefone text,
  ejc text,
  endereco text,
  ativo boolean default true,
  created_at timestamptz default now()
);

create table montagens (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  autor text,
  visibilidade text default 'Todos com acesso',
  cells jsonb default '{}',
  created_at timestamptz default now()
);

create table formularios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  favorito boolean default false,
  sistema boolean default false,
  campos jsonb default '[]',
  created_at timestamptz default now()
);

-- ---------- Row Level Security ----------

alter table dirigentes enable row level security;
alter table jovens enable row level security;
alter table tios enable row level security;
alter table montagens enable row level security;
alter table formularios enable row level security;

-- função auxiliar: o usuário logado é dirigente?
create or replace function is_dirigente()
returns boolean
language sql
security definer
stable
as $$
  select exists(select 1 from dirigentes where user_id = auth.uid());
$$;

-- DIRIGENTES: só dirigentes veem/gerenciam a lista de dirigentes
create policy "dirigentes veem dirigentes" on dirigentes for select using (is_dirigente());
create policy "dirigentes gerenciam dirigentes" on dirigentes for insert with check (is_dirigente());
create policy "dirigentes atualizam dirigentes" on dirigentes for update using (is_dirigente());
create policy "dirigentes removem dirigentes" on dirigentes for delete using (is_dirigente());

-- JOVENS: dirigente vê/edita tudo; membro só o próprio registro
create policy "dirigentes veem jovens" on jovens for select using (is_dirigente());
create policy "membro ve proprio jovem" on jovens for select using (auth.uid() = user_id);
create policy "dirigentes inserem jovens" on jovens for insert with check (is_dirigente());
create policy "membro cria proprio jovem" on jovens for insert with check (auth.uid() = user_id);
create policy "dirigentes atualizam jovens" on jovens for update using (is_dirigente());
create policy "membro atualiza proprio jovem" on jovens for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "dirigentes removem jovens" on jovens for delete using (is_dirigente());

-- TIOS: só dirigentes (por enquanto — sem formulário próprio de tios ainda)
create policy "dirigentes gerenciam tios select" on tios for select using (is_dirigente());
create policy "dirigentes gerenciam tios insert" on tios for insert with check (is_dirigente());
create policy "dirigentes gerenciam tios update" on tios for update using (is_dirigente());
create policy "dirigentes gerenciam tios delete" on tios for delete using (is_dirigente());

-- MONTAGENS: só dirigentes
create policy "dirigentes gerenciam montagens select" on montagens for select using (is_dirigente());
create policy "dirigentes gerenciam montagens insert" on montagens for insert with check (is_dirigente());
create policy "dirigentes gerenciam montagens update" on montagens for update using (is_dirigente());
create policy "dirigentes gerenciam montagens delete" on montagens for delete using (is_dirigente());

-- FORMULARIOS: só dirigentes
create policy "dirigentes gerenciam formularios select" on formularios for select using (is_dirigente());
create policy "dirigentes gerenciam formularios insert" on formularios for insert with check (is_dirigente());
create policy "dirigentes gerenciam formularios update" on formularios for update using (is_dirigente());
create policy "dirigentes gerenciam formularios delete" on formularios for delete using (is_dirigente());

-- ---------- Formulário padrão do sistema (Ficha do jovem) ----------
insert into formularios (nome, favorito, sistema, campos) values (
  'Ficha do jovem', true, true,
  '[
    {"key":"c-nome","id":"nome","label":"Nome completo","type":"texto"},
    {"key":"c-apelido","id":"apelido","label":"Apelido","type":"texto"},
    {"key":"c-nasc","id":"nasc","label":"Data de nascimento","type":"data"},
    {"key":"c-cpf","id":"cpf","label":"CPF","type":"texto"},
    {"key":"c-email","id":"email","label":"E-mail","type":"texto"},
    {"key":"c-whats","id":"whats","label":"WhatsApp","type":"texto"},
    {"key":"c-insta","id":"insta","label":"Instagram","type":"texto"},
    {"key":"c-end","id":"endereco","label":"Endereço completo","type":"texto"},
    {"key":"c-sac","id":"sacramentos","label":"Sacramentos","type":"multipla"},
    {"key":"c-pais","id":"pais","label":"Estado dos pais","type":"unica"},
    {"key":"c-cal","id":"fezCalifornia","label":"Fez EJC no Califórnia?","type":"simnao"},
    {"key":"c-garcom","id":"garcom","label":"Já foi garçom?","type":"simnao"},
    {"key":"c-fora","id":"serviuFora","label":"Já serviu fora?","type":"simnao"},
    {"key":"c-mjc","id":"mjcAtual","label":"Equipe atual do MJC","type":"unica"},
    {"key":"c-mus","id":"musico","label":"Músico?","type":"simnao"},
    {"key":"c-rf","id":"restrFisica","label":"Restrição física","type":"unica"},
    {"key":"c-ra","id":"restrAlim","label":"Restrição alimentar","type":"unica"},
    {"key":"c-neuro","id":"neuro","label":"Neurodivergências e saúde mental","type":"multipla"}
  ]'::jsonb
);
