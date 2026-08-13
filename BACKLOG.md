# Backlog — Melhorias EJC (origem: Forms - Banco de Dados EJC, 2026-08-12)

Cada item tem um número fixo (referenciar em commits). Status: `[ ]` pendente, `[x]` feito.

## Bloco A — Padronização de dados & limpeza de conceitos ✅ (2026-08-12)
- [x] **A1.** Padrão de capitalização automático ao enviar a ficha: Nome/endereço/apelido/nome do pai/nome da mãe em "Primeira Letra Maiúscula"; e-mail sempre minúsculo; campos de EJC/ECC (do Califórnia ou "é de fora") sempre com EJC/ECC maiúsculo e número em romano (ex: "25 EJC Califórnia" → "XXV EJC Califórnia"). Aplicar só depois do envio (normalização no salvar, não enquanto digita). *(nome/apelido/pai/mãe/endereço já existiam; adicionado: e-mail minúsculo + `toEjcEccProprio` para o campo livre "Qual seu EJC/ECC?")*
- [x] **A2.** Remover completamente o conceito de pessoa ativa/inativa (independente de estar em equipe do MJC). *(campo `ativo` tirado de toda a UI/mapeamento; Início mostra "Total de jovens"; Relatórios perderam os cards "Pessoas ativas"/"Músicos ativos" — cobre também o D2 do Bloco D)*
- [x] **A3.** Quando a pessoa é "de fora" (não fez no Califórnia): guardar e mostrar também **em qual EJC** ela serviu, além da equipe. *(campo trocado de lista simples pra `RepeatEquipeEcc`, igual já era feito pros tios)*
- [x] **A4.** Comprimir/redimensionar imagem de foto para gastar menos espaço. *(reduzido de 480px/85% pra 320px/80% — maior uso na tela é 84px, cobre retina 3x com folga)*

## Bloco B — Início & bugs de UI ✅ (2026-08-12, ver ressalvas)
- [x] **B1.** Aniversário da semana: mostrar na ficha para quem **não** tem acesso ao portal, só dia/mês (sem idade/ano). Dentro do portal, manter como está hoje. *(confirmado com o usuário: é a Área do Membro. Card novo `AniversariosResumoMembro`, alimentado pela RPC `aniversarios_semana_publico` — **precisa rodar** [supabase_migration_aniversarios_publicos.sql](supabase_migration_aniversarios_publicos.sql) no SQL Editor antes de funcionar)*
- [x] **B2.** Botão "Ver todos" nos últimos cadastros deve navegar para a aba Jovens. *(e o de Tios pra aba Tios, já que o card foi separado em B3)*
- [x] **B3.** Início: separar "últimos cadastros" em dois blocos — últimos 2 jovens e últimos 2 tios.
- [x] **B4.** Corrigir bug: filtros não funcionam nas abas Jovens e Tios. *(o dropdown "Equipe" em Jovens era só decorativo — agora filtra de verdade; sumiu de Tios, que não tem equipe do MJC)*
- [x] **B5.** Corrigir bug: no celular, ao editar a ficha de outra pessoa como dirigente, a página não rola/desce. *(causa real, achada com print do usuário 2026-08-12: na visualização da ficha do jovem, a linha de "Equipes que serviu" não tinha `flexWrap` — o badge "Coordenador" empurrava a linha pra fora da tela e travava a rolagem ("saltando pro lado"). A versão dos tios já tinha isso certo; só faltava no jovem. Corrigido — mais preciso que o fix genérico de touch-scroll que eu tinha colocado antes)*
- [~] **B6.** Revisão geral de responsividade — fichas no celular (prioridade) e telas wide de desktop. *(sem regressão nova identificada na leitura do código; item aberto — como não consigo ver a tela renderizada aqui, preciso que você aponte telas/prints específicos com problema pra eu corrigir)*

## Bloco C — Acesso & Dirigentes ✅ (2026-08-12)
- [x] **C1.** Qualquer admin/dirigente pode excluir um cadastro, sempre com confirmação. *(botão de lixeira na ficha (`PersonDetail`), abre modal de confirmação, chama `removeJovem`/`removeTio` novos no store — RLS já permitia exclusão pra dirigentes, não precisou de migração)*
- [x] **C2.** Área do dirigente: opção "Minha ficha" (acesso rápido à própria ficha + edição). *(item novo no menu do avatar — acha a ficha do próprio dirigente pelo `user_id` e abre a mesma tela de visualização/edição usada pra qualquer pessoa)*
- [x] **C3.** Todos os dirigentes devem ter acesso ao portal (poder atualizar senha e editar fichas). *(já era assim na arquitetura atual — qualquer linha na tabela `dirigentes` vira admin com App completo, "Alterar senha" e edição de fichas, independente do cargo; nenhum código restringe por cargo hoje. Só "Configurações" — cadastrar/remover outros dirigentes — fica exclusivo do dono, o que é intencional. A separação por tipo de cargo fica pra depois, como você mesmo colocou)*

## Bloco D — Relatórios ✅ (2026-08-12)
- [x] **D1.** Filtro por equipe + EJC (ex: "todo mundo que foi Secretaria no XXXI EJC") → lista de cards (foto, nome, telefone), ordenada: jovem coordenador → tio coordenador → equipe → tio apoio. *(novo card "Buscar por equipe e edição do EJC" no topo de Relatórios; busca no histórico de serviço que já está nas fichas — `equipesCalifornia`/`equipesEjc` de jovens e tios, juntando os formatos com/sem ano — e abre a lista no modal já ordenada pelo papel)*
- [x] **D2.** Remover os relatórios de "pessoas ativas" e "músicos ativos". *(feito junto do A2, 2026-08-12 — era a mesma limpeza)*
- [x] **D3.** Todo card de relatório deve ser clicável e abrir a lista de pessoas correspondente. *(as barras de "Músicos por instrumento" e "Pessoas por equipe do MJC" agora abrem o mesmo modal de lista, reusado do D1)*

## Bloco E — Calendário ✅ (2026-08-12)
- [x] **E1.** Permitir editar um evento do calendário (não só excluir). *(botão de editar (lápis) ao lado do de excluir em cada evento da lista; abre o mesmo modal de criar, agora reusado pra editar via novo `updateEvento`)*
- [x] **E2.** Campo "responsabilidade do evento" com opções: EJC, MJC, Ficha, Pós, Montagem, Finanças, Palestra. *(chips no modal de criar/editar; aparece como tag colorida no evento da lista. **Precisa rodar** [supabase_migration_evento_responsabilidade.sql](supabase_migration_evento_responsabilidade.sql) no Supabase antes de funcionar — adiciona a coluna nova)*

## Bloco F — EJCs (edições) ✅ (2026-08-12)
- [x] **F1.** Opção de cadastrar novos EJCs no banco (hoje a lista vai só até XXXI/2026). *(a lista de edições, que era uma lista fixa no código, virou uma tabela `ejc_edicoes` no banco; novo card "Edições do EJC" em Configurações — botão "Adicionar próximo EJC" já sugere o próximo número, só pede o ano. Todos os formulários (ficha do jovem, ficha dos tios, filtro de Relatórios) agora leem a lista do banco. **Precisa rodar** [supabase_migration_ejc_edicoes.sql](supabase_migration_ejc_edicoes.sql) — sem ela o app usa a lista antiga como reserva (nada quebra, só não dá pra adicionar edição nova ainda))*

## Bloco G — Montagem (bloco maior, dividir em sub-etapas)
- [ ] **G1.** Trocar bolinha vermelha ao lado do nome por um X vermelho.
- [ ] **G2.** Ao criar montagem: escolher se é pública ou privada (do criador); privada pode ser tornada pública depois.
- [ ] **G3.** Ao criar montagem: escolher a qual EJC ela pertence.
- [ ] **G4.** Reestruturar linhas/tamanhos por equipe (regra: só ajustar o que for pedido abaixo, resto continua igual):
  - Coordenação Geral: 2 jovens coordenadores + 1 linha casal de tios coordenadores
  - Sala: casal de tios como 1 linha só; permitir adicionar mais em Animadores, Mini Bar, Boa Vontade e Músico
  - Compras: casal de tios como 1 linha só; manter 4 jovens da equipe + opção de +1
  - Acolhida, Cafezinho, Cozinha, Liturgia Interna, Secretaria: 1 linha casal coordenador + 3 linhas tios apoio + 15 linhas de equipe
  - Liturgia Externa: 1 linha casal coordenador + 3 linhas tios apoio + 20 linhas de equipe
  - Ordem e Limpeza: 6 pessoas, sem separação de papel
  - Recepção ao Palestrante: só 1 linha de tios coordenadores; remover tios apoio e equipe
  - Tios Circulistas: remover jovem coordenador; 1 linha casal de tios coordenadores + 2 linhas tios apoio
  - Visitação Externa: remover jovens coordenadores; 1 linha casal de tios coordenadores + 20 linhas de equipe; remover tios apoio
  - Em qualquer equipe: sempre permitir excluir qualquer linha (não só as com pessoa) e sempre ter opção de adicionar mais gente.
- [ ] **G5.** Equipe especial "Corte/Recusa" (não conta como equipe de serviço):
  - Quem está nela entra na ficha, ao final do encontro, como "não serviu".
  - Em qualquer linha de qualquer equipe: opção de excluir a pessoa da montagem ou mover para Corte/Recusa; ao fazer isso a linha original fica em aberto (pode receber outra pessoa ou ser excluída).
  - Dividida em dois blocos separados: Jovens e Tios.
  - Guardar histórico de qual equipe a pessoa estava antes do corte (visível na linha), mas isso **nunca** conta como "serviu naquela equipe" quando as fichas forem atualizadas — entra como não serviu.
  - Opção de remover alguém da lista de Corte/Recusa (engano ou retorno à montagem).
- [ ] **G6.** "Adicionar EJC à ficha dos integrantes" — ação pós-evento, com tela de confirmação (edita muitas fichas de uma vez):
  - Para quem ficou na montagem: adiciona na ficha "EJC (ano) + Equipe + coordenou ou não", no mesmo formato usado hoje.
  - Para quem não serviu (Corte/Recusa) e para todo mundo que já fez EJC anterior (edições passadas) sem ter servido nesta: adicionar "EJC (ano) — não serviu" (ou nomenclatura já usada hoje para isso).

---
**Convenção de commits:** referenciar o número do item, ex: `git commit -m "A2: remove conceito de pessoa ativa/inativa"`.
