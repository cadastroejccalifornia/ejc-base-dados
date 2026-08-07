The workhorse list row. Members (avatar + badge), teams (icon + rating), talks (icon + status).

```jsx
<ListRow avatar={<Avatar name="Ana"/>} title="Ana Beatriz" subtitle="Equipe Acolhida" trailing={<Badge tone="success" dot>Confirmado</Badge>} />
<ListRow icon="★" iconColor="var(--cat-terracotta)" title="Equipe Liturgia" subtitle="14 membros" trailing={<RatingBar value={4.6} size={15}/>} />
```
