-- ============================================================
-- EJC Califórnia — Migração: dirigente reconhecido por E-MAIL
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
--
-- Antes: a pessoa só era dirigente se a linha em `dirigentes` tivesse o
-- user_id ligado à conta (dependia da "reivindicação" do convite + políticas
-- extras). Isso falhava e a pessoa caía como membro.
--
-- Agora: é dirigente qualquer pessoa cujo E-MAIL esteja na tabela `dirigentes`.
-- Basta o convidado logar (ou criar conta) com esse e-mail que ganha acesso
-- total — sem depender do link mágico nem de reivindicação.
-- ============================================================

create or replace function is_dirigente()
returns boolean
language sql
security definer
stable
as $$
  select exists(
    select 1 from dirigentes
    where lower(email) = lower(auth.email())
  );
$$;
