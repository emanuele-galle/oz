# OZ Extrait

E-commerce profumi di lusso - Restyling sito ozextrait.com con design minimalista luxury.

## Stack

- **Next.js**: 16.1 (con Turbopack)
- **React**: 19.2.4
- **TypeScript**: 5.9
- **Tailwind CSS**: 4.1.18
- **Node.js**: 24.13.0 LTS

## Quick Start

### Development Local
```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

### Build Production
```bash
npm run build
npm start
```

### Docker
```bash
docker compose build
docker compose up -d
```

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   └── components/
│       └── ui/              # UI components
├── public/                  # Static assets
├── Dockerfile               # Multi-stage Docker build
└── docker-compose.yml       # Docker Compose config
```

## Scripts

- `npm run dev` - Development server con Turbopack
- `npm run build` - Build production
- `npm start` - Start production server
- `npm run lint` - ESLint check
- `npm run type-check` - TypeScript check

## Deploy

Push su `main` triggera automaticamente GitHub Actions che deploya su VPS.

## Environment Variables

Copia `.env.example` in `.env` e configura:

```bash
cp .env.example .env
```

## URL

Production: https://oz.fodivps2.cloud
