-- ============================================================
-- EJC Califórnia — Migração: horário do evento (Calendário)
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
-- Idempotente: pode rodar de novo sem erro.
-- ============================================================

alter table eventos add column if not exists hora text;
