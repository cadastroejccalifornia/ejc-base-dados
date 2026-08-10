-- ============================================================
-- EJC Califórnia — Migração: membro autocadastra como casal de tios
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
-- (incremental — só adiciona políticas que ainda não existem)
-- ============================================================

drop policy if exists "membro ve proprio tio" on tios;
create policy "membro ve proprio tio" on tios
  for select using (auth.uid() = user_id);

drop policy if exists "membro cria proprio tio" on tios;
create policy "membro cria proprio tio" on tios
  for insert with check (auth.uid() = user_id);

drop policy if exists "membro atualiza proprio tio" on tios;
create policy "membro atualiza proprio tio" on tios
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
