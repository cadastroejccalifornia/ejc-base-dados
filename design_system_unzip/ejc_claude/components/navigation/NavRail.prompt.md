Left navigation rail for the app shell. Active item gets the brown pill.

```jsx
<NavRail logoSrc="assets/ejc-logo.png" activeId="dash" onSelect={setView}
  items={[{id:"dash",label:"Início",icon:<Icon name="home"/>},{id:"membros",label:"Membros",icon:<Icon name="users"/>,badge:3}]}
  footer={<Avatar name="Você" size="md"/>} />
```
