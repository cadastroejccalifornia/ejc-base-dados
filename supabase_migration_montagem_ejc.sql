-- ============================================================
-- EJC Califórnia — Migração: qual EJC é cada montagem (Bloco G do backlog)
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
-- Idempotente: pode rodar de novo sem erro.
-- ============================================================

alter table montagens add column if not exists ejc text;

-- controla quais linhas existem em cada seção de cada aba (permite adicionar/excluir linhas
-- livremente, além do número inicial padrão de cada equipe) — ver rowsForSection no app
alter table montagens add column if not exists rows jsonb default '{}';
