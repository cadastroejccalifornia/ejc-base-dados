# EJC Califórnia — Design System

Design system para o aplicativo de gestão do **EJC (Encontro de Jovens com Cristo) — Califórnia, BH**.
O app dá acesso aos dados dos integrantes, avaliações de equipes e de palestras, e dashboards de
acompanhamento do dia a dia dos encontros.

A direção visual segue o **vídeo de referência** enviado pelo usuário (dashboard estilo smart-home:
fundo claro quente, cards muito arredondados, rail lateral de ícones, botões circulares flutuantes,
círculos de ícone coloridos, linhas em pílula com controles) fundida com a **identidade do EJC**
(cruz marrom, letras amarelas com contorno vermelho — ver `assets/ejc-logo.png`).

## Fontes deste sistema
- **Logo:** `uploads/Boas práticas para uma boa reunião (13).png` → copiado para `assets/ejc-logo.png`.
- **Referência de UI:** vídeo `uploads/0c3048c3c82e33f1f6efb73e10e95ec9.mp4` (quadros extraídos em `scraps/`).
- Não há codebase nem Figma anexados — os componentes foram criados do zero seguindo essas referências.

## CONTENT FUNDAMENTALS (voz e texto)
- **Idioma:** português do Brasil, informal-respeitoso — trata o membro por "você".
- **Tom:** acolhedor e direto, próprio de comunidade jovem de igreja; sem jargão corporativo.
- **Vocabulário do domínio:** encontro / encontrão, equipe, palestra, palestrante, encontrista,
  tio/tia, coordenação, escala, presença, avaliação.
- **Casing:** títulos em *sentence case* ("Avaliações recentes", "Próximo encontro"). Overlines em
  MAIÚSCULAS com Space Mono ("EJC CALIFÓRNIA · BH").
- **Números:** notas em escala 0–5 com uma casa decimal (4.4); presença em %.
- **Emoji:** não. Ícones fazem esse papel.
- **Exemplos de copy:** botões "Salvar avaliação", "Confirmar equipe", "Ver escala"; status
  "Confirmado" / "Pendente"; papéis "Coordenadora", "Tio", "Encontrista".

## VISUAL FOUNDATIONS
- **Cores:** marca quente do EJC — marrom `#784230` (primário, vem da cruz), amarelo `#f5ce1b`
  (letras EJC) e vermelho `#d8342b` (contorno). Neutros quentes: canvas creme `#f2eee7` com leve
  topo lavanda, cards brancos, pílulas em `#f7f4ef`. Texto quase-preto quente `#2a241f`.
  Máx. 1–2 cores de fundo. Círculos de categoria usam um set harmonizado (`--cat-*`).
- **Tipografia:** *Plus Jakarta Sans* (geométrica humanista arredondada) para UI e display;
  *Space Mono* para overlines/códigos. Números de dashboard em 800, bem grandes.
- **Espaçamento:** base 4 (`--sp-*`), gutters de 24px, padding de card 20px.
- **Cantos:** generosos — cards `--r-lg` (22px), painéis/shell `--r-2xl` (34px), pílulas 999px.
- **Sombras:** difusas e quentes (tom marrom, baixa opacidade); **sem bordas duras**. Hairline
  `#ece6dd` só quando um separador é indispensável.
- **Fundos:** gradiente quente sutil no canvas; conteúdo em painel `surface-2`. Sem texturas,
  sem gradientes chamativos, sem imagens full-bleed.
- **Elevação/superfícies:** três níveis — canvas → painel `surface-2` → card branco.
- **Estados:** hover = leve mudança de superfície (`surface-2`→`surface-3`) ou marrom mais escuro;
  press = `scale(.97)` nos botões / `scale(.9)` nos icon-buttons; foco = anel `--focus-ring`.
- **Animação:** transições curtas (.12–.2s ease) em cor, superfície e transform; nada de bounce.
- **Transparência/blur:** praticamente não usada — o visual é sólido e claro.
- **Cards:** brancos, `--r-lg`, `--shadow-sm`, sem borda; cabeçalho opcional (título + ação à direita
  como "Ver todos" ou um `Select`).
- **Layout:** rail lateral fixo (76px) + painel de conteúdo rolável; grids com `gap`.

## ICONOGRAPHY
- **Sistema:** [Lucide](https://lucide.dev) — traço ~1.8, arredondado, coerente com a referência.
  **Substituição sinalizada:** a referência não trazia um icon set nomeado; Lucide é o match mais
  próximo (traço fino, cantos suaves). Trocar se o time preferir outro.
- Carregado via CDN nos kits/cards. Ícones sempre dentro de círculos coloridos (`--cat-*`) para
  categorias/linhas, ou monocromáticos (texto) na navegação.
- Sem emoji. Sem unicode como ícone (os cards de componente usam glifos só como placeholder de preview).
- **Logo:** `assets/ejc-logo.png`. Único PNG com fundo branco; sobre fundo escuro precisa de versão
  sem fundo (pendente — ver CAVEATS).

## Índice / manifesto
- `styles.css` — entrypoint global (só `@import`).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadow.css`, `fonts.css`, `base.css`.
- `guidelines/` — cards de fundamentos (Colors, Type, Spacing, Brand).
- `components/`
  - `buttons/` — **Button**, **IconButton**
  - `forms/` — **Switch**, **SearchInput**, **Select**, **SegmentedControl**
  - `data/` — **StatCard**, **RatingBar**, **ProgressBar**, **Badge**, **Tag**
  - `layout/` — **Card**, **Avatar**, **ListRow**
  - `navigation/` — **NavRail**
- `ui_kits/ejc-app/` — recriação click-through do app (Painel, Membros, Avaliações).
- `assets/` — `ejc-logo.png`.
- `SKILL.md` — invólucro Agent Skill para uso no Claude Code.

### Adições intencionais
Como não havia inventário de componentes de origem, foi autorado um conjunto padrão dimensionado
para o app (KPIs, avaliação por estrelas, listas de membros/equipes). `RatingBar` e `StatCard` são
específicos do domínio (avaliações e dashboards).

## CAVEATS
- **Fontes substituídas** por equivalentes do Google Fonts (Plus Jakarta Sans + Space Mono). Se
  houver fontes oficiais do grupo, envie os arquivos para eu trocar.
- **Logo:** só temos o PNG com fundo branco. Para usar o logo sobre o marrom/telas escuras, preciso
  de um **PNG/SVG com fundo transparente**.
- **Ícones Lucide** são uma substituição — confirme se serve.
