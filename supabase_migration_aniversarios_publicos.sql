-- ============================================================
-- Aniversários da semana pra quem só tem acesso à própria ficha (MemberArea)
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
--
-- Hoje, RLS só deixa um membro comum ver a própria linha em jovens/tios —
-- então ele não consegue calcular "aniversários da semana" (precisa ver todo
-- mundo). Esta função devolve só o mínimo necessário (nome/apelido, foto,
-- dia e mês de nascimento — NUNCA o ano) pra qualquer pessoa logada, sem
-- abrir CPF, saúde, telefone ou os outros dados sensíveis da ficha.
-- ============================================================

create or replace function aniversarios_semana_publico()
returns table(
  id uuid, tipo text,
  nome text, apelido text, nasc text,
  tia_nome text, tia_apelido text, tia_nasc text,
  tio_nome text, tio_apelido text, tio_nasc text,
  foto text
)
language sql
security definer
stable
as $$
  select j.id, 'jovem'::text,
         j.ficha->>'nome', j.ficha->>'apelido', j.ficha->>'nasc',
         null, null, null, null, null, null,
         j.foto
  from jovens j
  union all
  select t.id, 'tios'::text,
         null, null, null,
         t.ficha->>'tiaNome', t.ficha->>'tiaApelido', t.ficha->>'tiaNasc',
         t.ficha->>'tioNome', t.ficha->>'tioApelido', t.ficha->>'tioNasc',
         t.foto
  from tios t;
$$;

grant execute on function aniversarios_semana_publico() to authenticated;
