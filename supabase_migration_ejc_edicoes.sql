-- ============================================================
-- EJC Califórnia — Migração: edições do EJC (Bloco F do backlog)
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
-- Idempotente: pode rodar de novo sem erro.
--
-- Hoje a lista de EJCs (I até XXXI) estava hardcoded no código do app.
-- Essa tabela deixa o app buscar do banco, com uma tela em Configurações
-- pra cadastrar a próxima edição sem precisar mexer em código.
-- Enquanto essa migração não roda, o app usa a lista antiga (hardcoded)
-- como semente — nada quebra, só não dá pra adicionar edições novas ainda.
-- ============================================================

create table if not exists ejc_edicoes (
  id uuid primary key default gen_random_uuid(),
  numero int not null unique,
  ano int not null,
  created_at timestamptz default now()
);

alter table ejc_edicoes enable row level security;

drop policy if exists "autenticados veem ejc_edicoes" on ejc_edicoes;
create policy "autenticados veem ejc_edicoes" on ejc_edicoes for select using (auth.uid() is not null);

drop policy if exists "dirigentes inserem ejc_edicoes" on ejc_edicoes;
create policy "dirigentes inserem ejc_edicoes" on ejc_edicoes for insert with check (is_dirigente());

insert into ejc_edicoes (numero, ano) values
  (31,2026),(30,2025),(29,2024),(28,2023),(27,2022),(26,2019),(25,2018),(24,2017),(23,2016),(22,2015),
  (21,2014),(20,2013),(19,2012),(18,2011),(17,2010),(16,2009),(15,2008),(14,2007),(13,2006),(12,2005),
  (11,2004),(10,2003),(9,2002),(8,2001),(7,2000),(6,1999),(5,1998),(4,1997),(3,1996),(2,1995),(1,1993)
on conflict (numero) do nothing;
