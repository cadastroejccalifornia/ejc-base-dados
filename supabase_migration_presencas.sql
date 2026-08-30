-- ============================================================
-- EJC Califórnia — Migração: listas de presença dos eventos
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
-- Idempotente: pode rodar de novo sem erro.
-- Depende de eventos e da função is_dirigente() (já existentes).
-- ============================================================

create table if not exists presencas (
  id uuid primary key default gen_random_uuid(),
  evento_id uuid not null references eventos(id) on delete cascade,
  pessoa_id uuid not null,
  pessoa_tipo text not null,                    -- 'jovem' | 'tio'
  nome text,                                    -- snapshot do nome (exibição / fallback se a pessoa sair da base)
  equipe text,                                  -- snapshot da equipe do MJC (ou 'Tios' / 'Sem equipe')
  status text not null default 'presente',      -- 'presente' | 'justificado'
  created_at timestamptz default now(),
  unique (evento_id, pessoa_id)                 -- uma pessoa aparece uma vez por evento
);

create index if not exists presencas_evento_idx on presencas(evento_id);

alter table presencas enable row level security;

-- LEITURA: qualquer pessoa logada (dirigente OU membro)
drop policy if exists "autenticados veem presencas" on presencas;
create policy "autenticados veem presencas" on presencas for select using (auth.uid() is not null);

-- ESCRITA: só dirigentes criam / editam / removem presença
drop policy if exists "dirigentes inserem presencas" on presencas;
create policy "dirigentes inserem presencas" on presencas for insert with check (is_dirigente());
drop policy if exists "dirigentes atualizam presencas" on presencas;
create policy "dirigentes atualizam presencas" on presencas for update using (is_dirigente());
drop policy if exists "dirigentes removem presencas" on presencas;
create policy "dirigentes removem presencas" on presencas for delete using (is_dirigente());
