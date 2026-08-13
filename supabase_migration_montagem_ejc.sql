-- ============================================================
-- EJC Califórnia — Migração: qual EJC é cada montagem (Bloco G do backlog)
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
-- Idempotente: pode rodar de novo sem erro.
-- ============================================================

alter table montagens add column if not exists ejc text;

-- controla quais linhas existem em cada seção de cada aba (permite adicionar/excluir linhas
-- livremente, além do número inicial padrão de cada equipe) — ver rowsForSection no app
alter table montagens add column if not exists rows jsonb default '{}';

-- lista de Corte/Recusa (quem saiu da montagem e vai entrar na ficha como "não serviu"),
-- separada em jovens e tios, com o histórico de qual equipe a pessoa estava antes do corte
alter table montagens add column if not exists corte jsonb default '{"jovens":[],"tios":[]}';
