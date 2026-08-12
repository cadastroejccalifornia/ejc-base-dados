# Backlog — Melhorias EJC (origem: Forms - Banco de Dados EJC, 2026-08-12)

Cada item tem um número fixo (referenciar em commits). Status: `[ ]` pendente, `[x]` feito.

## Bloco A — Padronização de dados & limpeza de conceitos ✅ (2026-08-12)
- [x] **A1.** Padrão de capitalização automático ao enviar a ficha: Nome/endereço/apelido/nome do pai/nome da mãe em "Primeira Letra Maiúscula"; e-mail sempre minúsculo; campos de EJC/ECC (do Califórnia ou "é de fora") sempre com EJC/ECC maiúsculo e número em romano (ex: "25 EJC Califórnia" → "XXV EJC Califórnia"). Aplicar só depois do envio (normalização no salvar, não enquanto digita). *(nome/apelido/pai/mãe/endereço já existiam; adicionado: e-mail minúsculo + `toEjcEccProprio` para o campo livre "Qual seu EJC/ECC?")*
- [x] **A2.** Remover completamente o conceito de pessoa ativa/inativa (independente de estar em equipe do MJC). *(campo `ativo` tirado de toda a UI/mapeamento; Início mostra "Total de jovens"; Relatórios perderam os cards "Pessoas ativas"/"Músicos ativos" — cobre também o D2 do Bloco D)*
- [x] **A3.** Quando a pessoa é "de fora" (não fez no Califórnia): guardar e mostrar também **em qual EJC** ela serviu, além da equipe. *(campo trocado de lista simples pra `RepeatEquipeEcc`, igual já era feito pros tios)*
- [x] **A4.** Comprimir/redimensionar imagem de foto para gastar menos espaço. *(reduzido de 480px/85% pra 320px/80% — maior uso na tela é 84px, cobre retina 3x com folga)*

## Bloco B — Início & bugs de UI
- [ ] **B1.** Aniversário da semana: mostrar na ficha para quem **não** tem acesso ao portal, só dia/mês (sem idade/ano). Dentro do portal, manter como está hoje.
- [ ] **B2.** Botão "Ver todos" nos últimos cadastros deve navegar para a aba Jovens.
- [ ] **B3.** Início: separar "últimos cadastros" em dois blocos — últimos 2 jovens e últimos 2 tios.
- [ ] **B4.** Corrigir bug: filtros não funcionam nas abas Jovens e Tios.
- [ ] **B5.** Corrigir bug: no celular, ao editar a ficha de outra pessoa como dirigente, a página não rola/desce.
- [ ] **B6.** Revisão geral de responsividade — fichas no celular (prioridade) e telas wide de desktop.

## Bloco C — Acesso & Dirigentes
- [ ] **C1.** Qualquer admin/dirigente pode excluir um cadastro, sempre com confirmação.
- [ ] **C2.** Área do dirigente: opção "Minha ficha" (acesso rápido à própria ficha + edição).
- [ ] **C3.** Todos os dirigentes devem ter acesso ao portal (poder atualizar senha e editar fichas) — cadastros/funções específicas por tipo de cargo vêm depois.

## Bloco D — Relatórios
- [ ] **D1.** Filtro por equipe + EJC (ex: "todo mundo que foi Secretaria no XXXI EJC") → lista de cards (foto, nome, telefone), ordenada: jovem coordenador → tio coordenador → equipe → tio apoio.
- [x] **D2.** Remover os relatórios de "pessoas ativas" e "músicos ativos". *(feito junto do A2, 2026-08-12 — era a mesma limpeza)*
- [ ] **D3.** Todo card de relatório deve ser clicável e abrir a lista de pessoas correspondente.

## Bloco E — Calendário
- [ ] **E1.** Permitir editar um evento do calendário (não só excluir).
- [ ] **E2.** Campo "responsabilidade do evento" com opções: EJC, MJC, Ficha, Pós, Montagem, Finanças, Palestra.

## Bloco F — EJCs (edições)
- [ ] **F1.** Opção de cadastrar novos EJCs no banco (hoje a lista vai só até XXXI/2026).

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
