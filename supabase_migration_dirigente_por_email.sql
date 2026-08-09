-- ============================================================
-- EJC Califórnia — Migração: dirigente reconhecido por user_id OU e-mail
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
--
-- É dirigente quem: já tem o user_id ligado à linha (admins existentes)
-- OU cujo e-mail de login está na tabela `dirigentes` (convidados novos).
-- Casar pelos DOIS evita que um descasamento de e-mail derrube um admin
-- que já usava a conta.
-- ============================================================

create or replace function is_dirigente()
returns boolean
language sql
security definer
stable
as $$
  select exists(
    select 1 from dirigentes
    where user_id = auth.uid()
       or lower(email) = lower(auth.email())
  );
$$;
