-- ============================================================
-- EJC Califórnia — Migração: tabela de eventos (Calendário)
-- Rode este script no Supabase Dashboard > SQL Editor > New query > Run
-- É idempotente: pode rodar de novo sem erro (mesmo se a tabela já existir).
-- ============================================================

create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  data date not null,
  descricao text,
  created_at timestamptz default now()
);

alter table eventos enable row level security;

-- LEITURA: qualquer pessoa logada (dirigente OU membro) vê o calendário do movimento
drop policy if exists "dirigentes veem eventos" on eventos;
drop policy if exists "autenticados veem eventos" on eventos;
create policy "autenticados veem eventos" on eventos for select using (auth.uid() is not null);

-- ESCRITA: só dirigentes criam / editam / removem eventos
drop policy if exists "dirigentes inserem eventos" on eventos;
create policy "dirigentes inserem eventos" on eventos for insert with check (is_dirigente());
drop policy if exists "dirigentes atualizam eventos" on eventos;
create policy "dirigentes atualizam eventos" on eventos for update using (is_dirigente());
drop policy if exists "dirigentes removem eventos" on eventos;
create policy "dirigentes removem eventos" on eventos for delete using (is_dirigente());
