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
- [x] **B3.** Início: separar "últimos cadastros" em dois blocos — últimos jovens e últimos tios. *(ajustado 2026-08-12, a pedido: agora são 3 por card em vez de 2; nome mostrado como "nome e sobrenome" (não o nome completo); jovem mostra o apelido acima do telefone; os dois cards ficam sempre do mesmo tamanho — grid com stretch em vez de alinhar pelo topo)*
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

## Bloco G — Montagem (bloco maior, dividido em sub-etapas) ✅ (2026-08-12 — G1 a G6 completos)
- [x] **G1.** Trocar bolinha vermelha ao lado do nome por um X vermelho. *(2026-08-12: botão de remover da equipe agora é vermelho sólido com X branco, bem mais visível que o "bolinha" antigo)*
- [x] **G2.** Ao criar montagem: escolher se é pública ou privada (do criador); privada pode ser tornada pública depois. *(2026-08-12: a escolha na criação já existia; adicionado botão "Tornar pública" na tela da montagem, aparece só quando ela está "Só o proprietário". **Caveat encontrado:** hoje o RLS do banco deixa QUALQUER dirigente ver/editar qualquer montagem, então "Só o proprietário" ainda é só um rótulo visual, não uma restrição de acesso de verdade — não mexi nisso agora por ser mudança de banco maior, mas fica registrado)*
- [x] **G3.** Ao criar montagem: escolher a qual EJC ela pertence. *(2026-08-12: select no modal de criação + mostrado no card da lista e no cabeçalho da planilha. **Precisa rodar** [supabase_migration_montagem_ejc.sql](supabase_migration_montagem_ejc.sql))*
- [x] **G4.** Reestruturar linhas/tamanhos por equipe (regra: só ajustar o que for pedido abaixo, resto continua igual):
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
  - ✅ Feito em 2026-08-12. Reli o pedido com a regra "o que eu não pedir pra mudar tá certo": em equipes como Acolhida/Cafezinho/Cozinha/Liturgia Interna/Secretaria/Liturgia Externa/Tios Circulistas, mantive "Jovens coordenadores" (não foi pedido pra tirar) e só mudei o que foi citado (casal→1 linha, contagens de equipe/apoio). Em Recepção ao Palestrante entendi que só sobra a linha de tios coordenadores (frase "colocar X e excluir Y e Z" cobrindo os 3 outros grupos). Toda seção agora tem "Adicionar linha em [equipe]" no rodapé e um ícone de lixeira por linha (exclui a linha inteira, com ou sem pessoa) — isso vale pra TODAS as equipes, não só as citadas. **Se alguma equipe ficou diferente do que você imaginava, me avisa qual e eu ajusto.** **Precisa rodar** [supabase_migration_montagem_ejc.sql](supabase_migration_montagem_ejc.sql) (coluna nova pra guardar as linhas adicionadas/excluídas).
- [x] **G5.** Equipe especial "Corte/Recusa" (não conta como equipe de serviço). ✅ 2026-08-12
  - Quem está nela entra na ficha, ao final do encontro, como "não serviu". *(guardado pra quando o G6 existir — a lista já marca claramente quem está em Corte/Recusa)*
  - Em qualquer linha de qualquer equipe: opção de excluir a pessoa da montagem ou mover para Corte/Recusa; ao fazer isso a linha original fica em aberto (pode receber outra pessoa ou ser excluída). *(novo botão de tesoura ao lado da lixeira, em toda linha preenchida de toda equipe)*
  - Dividida em dois blocos separados: Jovens e Tios. *(dois cards, um embaixo do outro)*
  - Guardar histórico de qual equipe a pessoa estava antes do corte (visível na linha). *("Estava em: {equipe}" em cada linha do Corte/Recusa)*
  - Opção de remover alguém da lista de Corte/Recusa (engano ou retorno à montagem). *(botão de remover em cada linha do Corte/Recusa — só tira da lista, não recoloca automaticamente em nenhuma equipe)*
  - Não aparece como aba junto das equipes normais — é um botão separado (ícone de tesoura, cor vermelha) ao lado das abas, com um separador visual.
  - **Precisa rodar** [supabase_migration_montagem_ejc.sql](supabase_migration_montagem_ejc.sql) (nova versão, com a coluna `corte`).
- [x] **G6.** "Adicionar EJC à ficha dos integrantes" — ação pós-evento, com tela de confirmação (edita muitas fichas de uma vez). ✅ 2026-08-12
  - Para quem ficou na montagem: adiciona na ficha "EJC (ano) + Equipe + coordenou ou não", no mesmo formato usado hoje.
  - Para quem não serviu (Corte/Recusa) e para todo mundo que já fez EJC anterior (edições passadas) sem ter servido nesta: adicionar "EJC (ano) — não serviu" (ou nomenclatura já usada hoje para isso).
  - **Como ficou:** botão "Adicionar EJC à ficha dos integrantes" no topo da montagem (só funciona se a montagem tiver um EJC escolhido — G3). Abre uma tela de **revisão antes de gravar**: mostra a lista de quem vai receber "serviu em [equipe]" (todo mundo alocado em alguma linha, com a função que constou) e a lista de quem vai receber "não serviu" (quem está no Corte/Recusa dessa montagem + qualquer jovem/tio que já participou/serviu numa edição anterior e não está nessa montagem). Só depois de conferir as duas listas é que confirma e a gravação roda com barra de progresso.
  - **Detalhe técnico importante:** a ação é segura de rodar de novo (upsert) — se a pessoa já tiver uma entrada dessa mesma edição na ficha, ela é substituída, não duplicada.
  - **Limite assumido:** "já fez EJC anterior" considera jovens que fizeram o EJC no Califórnia (campo próprio) OU qualquer jovem/tio que já tenha uma entrada de serviço numa edição mais antiga. Jovens "de fora" que nunca serviram nem fizeram Califórnia não entram nessa lista automática (não tem como saber que "deveriam" ter servido). Se isso não bater com o que você esperava, me avisa que eu ajusto o critério.

## Extras (fora da lista original, pedidos durante a execução)
- [x] **X1.** Ícones sumindo na Montagem (X, tesoura, lixeira ficavam em branco ao trocar de aba/linha). ✅ 2026-08-12 — `MontagemSheet` não chamava `useLucide()`.
- [x] **X2.** Cards de "Últimos jovens/tios": 3 por card, nome resumido (nome+sobrenome) só no jovem, apelido acima do telefone só no jovem, tios mantêm o nome completo do casal, cards do mesmo tamanho. ✅ 2026-08-12
- [x] **X3.** Montagem pública: dar opção de voltar a ser só do proprietário (antes só dava pra ir privada→pública). ✅ 2026-08-12
- [x] **X4.** Recarregar a página (F5) sempre voltava pro Início, perdendo o lugar onde a pessoa estava. ✅ 2026-08-12 — última tela, filtro de equipe, ficha aberta e (dentro da Montagem) aba/modo Corte-Recusa ficam salvos no navegador (`localStorage`) e são restaurados ao recarregar.
- [x] **X5.** Jovens/Tios: filtro por EJC/ECC específico que a pessoa fez, e opção "De fora do Califórnia". ✅ 2026-08-12 (revisado) — terceira caixa "EJC: Todos" (jovens) / "ECC: Todos" (tios) ao lado do filtro de Equipe: abre a lista com "De fora do Califórnia" primeiro, seguido de cada edição (XXXI EJC, XXX EJC, ... / XXIX ECC, XXVIII ECC, ...). Filtra exatamente por aquela edição (ou por quem é de fora).

---
**Convenção de commits:** referenciar o número do item, ex: `git commit -m "A2: remove conceito de pessoa ativa/inativa"`.
