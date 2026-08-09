-- ============================================================
-- EJC Califórnia — Migração: tabela de eventos (Calendário)
-- Rode este script no Supabase Dashboard > SQL Editor > New query > Run
-- (incremental — só cria a tabela `eventos` e suas políticas)
-- ============================================================

create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  data date not null,
  descricao text,
  created_at timestamptz default now()
);

alter table eventos enable row level security;

-- só dirigentes veem e gerenciam o calendário do movimento
-- (a função is_dirigente() já foi criada no schema principal)
create policy "dirigentes veem eventos" on eventos for select using (is_dirigente());
create policy "dirigentes inserem eventos" on eventos for insert with check (is_dirigente());
create policy "dirigentes atualizam eventos" on eventos for update using (is_dirigente());
create policy "dirigentes removem eventos" on eventos for delete using (is_dirigente());
