-- ============================================================
-- Aniversários da semana pra quem só tem acesso à própria ficha (MemberArea)
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
--
-- Hoje, RLS só deixa um membro comum ver a própria linha em jovens/tios —
-- então ele não consegue calcular "aniversários da semana" (precisa ver todo
-- mundo). Esta função devolve só o mínimo necessário (nome/apelido, foto,
-- dia e mês de nascimento — NUNCA o ano) pra qualquer pessoa logada, sem
-- abrir CPF, saúde, telefone ou os outros dados sensíveis da ficha.
--
-- IMPORTANTE (privacidade): a data volta MASCARADA — só "DD/MM" + um ano fixo
-- fictício (2000), pra o app conseguir parsear. O ano REAL de nascimento nunca
-- sai do banco, então nem inspecionando a resposta de rede dá pra ver a idade.
-- Datas malformadas (fora de DD/MM/AAAA) voltam nulas e são simplesmente ignoradas.
-- ============================================================

-- mascara "DD/MM/AAAA" -> "DD/MM/2000" (só dia e mês reais); qualquer outro formato -> null
create or replace function _mes_dia_publico(nasc text)
returns text
language sql
immutable
as $$
  select case
    when nasc ~ '^\d{2}/\d{2}/\d{4}$' then substring(nasc from 1 for 5) || '/2000'
    else null
  end;
$$;

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
         j.ficha->>'nome', j.ficha->>'apelido', _mes_dia_publico(j.ficha->>'nasc'),
         null, null, null, null, null, null,
         j.foto
  from jovens j
  union all
  select t.id, 'tios'::text,
         null, null, null,
         t.ficha->>'tiaNome', t.ficha->>'tiaApelido', _mes_dia_publico(t.ficha->>'tiaNasc'),
         t.ficha->>'tioNome', t.ficha->>'tioApelido', _mes_dia_publico(t.ficha->>'tioNasc'),
         t.foto
  from tios t;
$$;

grant execute on function aniversarios_semana_publico() to authenticated;
