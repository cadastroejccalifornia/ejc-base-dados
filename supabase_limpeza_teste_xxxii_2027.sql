-- ============================================================
-- EJC Califórnia — Limpeza do teste do XXXII EJC (2027)
-- Rode no Supabase Dashboard > SQL Editor > New query > Run
--
-- Isso tira só as entradas "XXXII EJC (2027)" (servido ou "Não serviu")
-- do histórico ("Equipes que serviu") de todo mundo que foi atingido pelo
-- teste de "Adicionar EJC à ficha dos integrantes". NÃO mexe na montagem
-- de teste nem na edição XXXII EJC (2027) cadastrada em Configurações —
-- só nas fichas.
-- ============================================================

-- (opcional) rode isso primeiro só pra ver quem seria afetado, antes de mudar algo:
-- select id, nome from jovens where ficha->'equipesCalifornia' @> '[{"ano":"XXXII EJC (2027)"}]'::jsonb or exists (select 1 from jsonb_array_elements(ficha->'equipesCalifornia') e where e->>'ejc'='XXXII EJC');
-- select id, nome from tios where exists (select 1 from jsonb_array_elements(coalesce(ficha->'equipesEjc','[]'::jsonb) || coalesce(ficha->'equipesCalifornia','[]'::jsonb)) e where e->>'ejc'='XXXII EJC');

-- JOVENS: tira a entrada de XXXII EJC (2027) de equipesCalifornia
update jovens
set ficha = jsonb_set(
  ficha,
  '{equipesCalifornia}',
  coalesce(
    (
      select jsonb_agg(elem)
      from jsonb_array_elements(ficha->'equipesCalifornia') elem
      where not ( (elem->>'ano') = 'XXXII EJC (2027)' or (elem->>'ejc') = 'XXXII EJC' )
    ),
    '[]'::jsonb
  )
)
where ficha->'equipesCalifornia' is not null
  and exists (
    select 1 from jsonb_array_elements(ficha->'equipesCalifornia') elem
    where (elem->>'ano') = 'XXXII EJC (2027)' or (elem->>'ejc') = 'XXXII EJC'
  );

-- TIOS: tira de equipesEjc (quem fez ECC no Califórnia)
update tios
set ficha = jsonb_set(
  ficha,
  '{equipesEjc}',
  coalesce(
    (
      select jsonb_agg(elem)
      from jsonb_array_elements(ficha->'equipesEjc') elem
      where not ( (elem->>'ejc') = 'XXXII EJC' )
    ),
    '[]'::jsonb
  )
)
where ficha->'equipesEjc' is not null
  and exists (
    select 1 from jsonb_array_elements(ficha->'equipesEjc') elem
    where (elem->>'ejc') = 'XXXII EJC'
  );

-- TIOS: tira de equipesCalifornia (quem é "de fora")
update tios
set ficha = jsonb_set(
  ficha,
  '{equipesCalifornia}',
  coalesce(
    (
      select jsonb_agg(elem)
      from jsonb_array_elements(ficha->'equipesCalifornia') elem
      where not ( (elem->>'ejc') = 'XXXII EJC' )
    ),
    '[]'::jsonb
  )
)
where ficha->'equipesCalifornia' is not null
  and exists (
    select 1 from jsonb_array_elements(ficha->'equipesCalifornia') elem
    where (elem->>'ejc') = 'XXXII EJC'
  );
