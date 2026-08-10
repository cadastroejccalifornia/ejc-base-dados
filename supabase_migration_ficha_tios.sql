-- ============================================================
-- EJC Califórnia — Migração: ficha completa dos Tios
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
-- Idempotente (usa IF NOT EXISTS) — pode rodar de novo sem problema.
-- ============================================================

alter table tios add column if not exists ficha jsonb;
alter table tios add column if not exists foto text;
