# kev.studio

Portfolio of 17 projects spanning product design, art direction, branding, web design, and motion

**https://kev.studio**

## Stack

- React 19, TypeScript, Vite 7
- Material UI 7
- React Router 7
- Dark/light theme toggle

## Structure

```
src/
  screens/     Home, Project, Gallery, About
  components/  WikiLayout, ProjectCard, Header, Breadcrumbs, Blockquote, SeeAlso
  data/        Project taxonomy (17 entries) and asset mappings
  theme.ts     Design tokens, discipline colors, dark/light themes
```

## Development

```bash
pnpm install
pnpm dev        # localhost:4002
pnpm build      # TypeScript check + production build
```

## Deployment

Pushes to `main` auto-deploy to Vercel.
