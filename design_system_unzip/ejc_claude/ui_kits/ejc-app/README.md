# UI Kit — App EJC Califórnia

Recriação click-through do app de gestão do EJC. Compõe as primitivas do design system
(`components/`) sobre os tokens de `styles.css`.

## Telas
- **Painel** — linha de KPIs (`StatCard`), grade de categorias, avaliações recentes (`ListRow` + `RatingBar`), ranking de equipes (`ProgressBar`) e próximo encontro.
- **Membros** — filtro por status (`SegmentedControl`), cards de membro com `Avatar`, `Tag` de equipe, `Badge` de status e `RatingBar`.
- **Avaliações** — alternância Equipes / Palestras; equipes com nota + presença, palestras com palestrante, nota e nº de avaliações.

## Estrutura
`index.html` é interativo e **autocontido**: o rail lateral troca de tela e as primitivas
estão embutidas no script (mesmos estilos/props da biblioteca em `components/`) para que o
arquivo renderize sozinho, sem depender do bundle compilado. Em produção, importe os
componentes reais de `components/` em vez de recriá-los.

## Ícones
[Lucide](https://lucide.dev) via CDN — traço fino, coerente com a referência. Ver ICONOGRAPHY no `readme.md` raiz.

## Chrome
Rail vertical (logo EJC no topo, item ativo = pílula marrom, avatar embaixo) + painel de
conteúdo em `surface-2` com cantos `--r-2xl`, dentro do canvas em gradiente quente.
