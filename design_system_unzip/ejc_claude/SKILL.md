---
name: ejc-california-design
description: Use this skill to generate well-branded interfaces and assets for the EJC Califórnia (Encontro de Jovens com Cristo, BH) management app — production or throwaway prototypes/mocks. Contains design guidelines, colors, type, fonts, the EJC logo, and UI kit components for prototyping.
user-invocable: true
---

Read `readme.md` within this skill first, then explore the other files.

- Global CSS entrypoint: `styles.css` (imports every token file). Link it to inherit brand colors, type, spacing, radius and shadows.
- Design tokens: `tokens/`. Reusable React primitives: `components/<group>/<Name>.jsx` (each with a `.d.ts` contract and `.prompt.md` usage note). Full-screen recreations: `ui_kits/ejc-app/`.
- Brand assets: `assets/` (EJC logo). Icons: Lucide via CDN.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and produce static HTML the user can view. If working on production code, copy assets and follow the rules here to design on-brand.

If invoked without guidance, ask what the user wants to build (a screen? a component? a report?), ask a few focused questions, then act as an expert designer producing HTML artifacts _or_ production code as needed. Keep the warm, rounded, airy aesthetic: brown primary, generous radii, soft diffuse shadows, no hard borders, Portuguese (pt-BR) copy, sentence-case titles, no emoji.
