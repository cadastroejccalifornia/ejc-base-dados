-- ============================================================
-- EJC Califórnia — Migração: convite de dirigente por e-mail
-- Rode este script no Supabase Dashboard > SQL Editor > New query > Run
-- (é incremental — só adiciona 2 políticas novas, não mexe nas tabelas existentes)
-- ============================================================

-- Permite que a própria pessoa convidada veja o convite pendente com o seu e-mail
-- (necessário pro app checar "existe convite esperando por mim?" no primeiro login)
create policy "usuario ve seu proprio convite pendente" on dirigentes
  for select
  using (user_id is null and email = auth.email());

-- Permite que a própria pessoa convidada "reivindique" o convite, ligando o user_id dela
-- (só pode reivindicar um convite com o MESMO e-mail do login, e só pode setar o próprio id —
--  não dá pra reivindicar convite de outra pessoa nem virar dirigente sem ter sido convidado)
create policy "usuario reivindica seu proprio convite" on dirigentes
  for update
  using (user_id is null and email = auth.email())
  with check (user_id = auth.uid() and email = auth.email());
