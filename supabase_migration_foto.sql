-- ============================================================
-- EJC Califórnia — Migração: foto do jovem
-- Rode este script no Supabase Dashboard > SQL Editor > New query > Run
-- ============================================================

-- coluna nova na tabela jovens pra guardar a URL da foto
alter table jovens add column if not exists foto text;

-- bucket de armazenamento pras fotos (público pra leitura — são fotos exibidas dentro do próprio app)
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do nothing;

-- qualquer pessoa pode ver as fotos (necessário pra elas aparecerem nas listagens)
create policy "fotos sao publicas para leitura" on storage.objects
  for select using (bucket_id = 'fotos');

-- qualquer pessoa autenticada (dirigente ou membro) pode enviar/atualizar foto
create policy "autenticado pode enviar foto" on storage.objects
  for insert to authenticated with check (bucket_id = 'fotos');

create policy "autenticado pode atualizar foto" on storage.objects
  for update to authenticated using (bucket_id = 'fotos');
