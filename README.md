# Echo - AI-Powered Customer Support Widget Platform

## Overview

Echo is a comprehensive, enterprise-grade customer support platform that enables businesses to embed an AI-powered chat and voice widget on their websites. Built as a modern monorepo, it provides a complete solution for managing customer conversations, integrating AI assistants, and delivering seamless support experiences.

## What It Does

Echo is a multi-application platform consisting of:

1. **Admin Dashboard** - A feature-rich web application where organizations manage their customer support operations
2. **Customer Widget** - An embeddable chat/voice interface that end-users interact with on client websites
3. **Embed Script** - A lightweight JavaScript snippet that clients add to their websites to display the widget
4. **Backend Infrastructure** - A scalable Convex-powered backend handling real-time data, AI agents, and integrations

## How It Helps

### For Businesses
- **Reduce Support Costs**: Automate responses with AI-powered assistants (via VAPI integration)
- **Centralized Management**: Manage all customer conversations, settings, and integrations from one dashboard
- **Customization**: Customize widget appearance, greeting messages, and default suggestions per organization
- **Voice Support**: Integrate voice AI capabilities for phone-based support
- **Analytics & Insights**: Track conversation status (unresolved, escalated, resolved) and customer sessions
- **Multi-Organization Support**: Built-in support for multiple organizations with Clerk authentication

### For Developers
- **Easy Integration**: Simple script tag integration - just add one line of code
- **Type-Safe**: Full TypeScript support across the entire monorepo
- **Scalable Architecture**: Built on Next.js 15, React 19, and Convex for real-time capabilities
- **Modern Stack**: Uses latest technologies with full React Server Components support
- **Shared Components**: Reusable shadcn/ui component library across applications

### For End Users
- **Instant Support**: Chat interface with AI-powered responses
- **Voice Option**: Optional voice call capability through VAPI integration
- **Session Continuity**: Conversations persist across sessions with metadata tracking
- **Mobile Responsive**: Works seamlessly on all devices

## Technology Stack

- **Frontend**: Next.js 15.2.3, React 19.0.0, TypeScript 5.7.3
- **Backend**: Convex (serverless database and functions)
- **Authentication**: Clerk (user auth + organization management)
- **UI Framework**: shadcn/ui with Radix UI primitives, Tailwind CSS 4.0.8
- **AI/Voice**: VAPI AI integration, Convex AI Agents
- **Build System**: Turborepo 2.4.2, pnpm 10.4.1
- **Error Tracking**: Sentry
- **State Management**: Jotai

## Project Structure

```
next15-echo-main/
├── apps/                          # Application packages
│   ├── web/                      # Main admin dashboard (port 3000)
│   │   ├── app/                  # Next.js 15 app directory
│   │   │   ├── (auth)/          # Authentication routes (sign-in, sign-up, org-selection)
│   │   │   ├── (dashboard)/     # Protected dashboard routes
│   │   │   │   ├── billing/     # Subscription management
│   │   │   │   ├── conversations/ # Customer conversation management
│   │   │   │   ├── customization/ # Widget customization settings
│   │   │   │   ├── files/       # File management
│   │   │   │   ├── integrations/ # Third-party integrations
│   │   │   │   ├── plugins/     # Plugin management (VAPI, etc.)
│   │   │   │   └── page.tsx     # Dashboard home
│   │   │   ├── api/             # API routes
│   │   │   ├── layout.tsx       # Root layout
│   │   │   └── global-error.tsx # Error boundary
│   │   ├── components/          # Web-specific components
│   │   │   └── providers.tsx    # Convex & Clerk providers
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility functions
│   │   ├── modules/             # Feature modules
│   │   │   ├── auth/           # Authentication logic
│   │   │   ├── billing/        # Billing/subscription features
│   │   │   ├── customization/  # Widget customization logic
│   │   │   ├── dashboard/      # Dashboard features
│   │   │   ├── files/          # File handling
│   │   │   ├── integrations/   # Integration features
│   │   │   └── plugins/        # Plugin system
│   │   ├── public/             # Static assets
│   │   │   └── languages/      # Localization files
│   │   ├── middleware.ts       # Clerk auth middleware
│   │   ├── next.config.mjs     # Next.js configuration
│   │   ├── components.json     # shadcn/ui config
│   │   ├── instrumentation.ts  # Sentry instrumentation
│   │   └── package.json        # Dependencies
│   │
│   ├── widget/                  # Customer-facing widget (port 3001)
│   │   ├── app/                # Next.js app directory
│   │   │   ├── layout.tsx      # Widget layout
│   │   │   └── page.tsx        # Widget interface
│   │   ├── components/         # Widget-specific components
│   │   ├── hooks/              # Widget hooks
│   │   ├── lib/                # Widget utilities
│   │   ├── modules/
│   │   │   └── widget/         # Widget core functionality
│   │   ├── public/             # Widget assets
│   │   ├── next.config.mjs     # Next.js configuration
│   │   └── package.json        # Dependencies
│   │
│   └── embed/                   # Embed script (port 3002)
│       ├── embed.ts            # Main embed script logic
│       ├── config.ts           # Embed configuration
│       ├── icons.ts            # SVG icons
│       ├── demo.html           # Demo page
│       ├── landing.html        # Landing page
│       ├── vite.config.ts      # Vite build config
│       └── package.json        # Dependencies
│
├── packages/                    # Shared packages
│   ├── backend/                # Convex backend
│   │   └── convex/            # Convex functions & schema
│   │       ├── _generated/    # Auto-generated Convex types
│   │       ├── lib/           # Backend utilities
│   │       │   └── secrets.ts # AWS Secrets Manager integration
│   │       ├── private/       # Private (authenticated) functions
│   │       ├── public/        # Public API functions
│   │       │   └── organizations.ts # Organization management
│   │       ├── system/        # System-level functions
│   │       ├── schema.ts      # Database schema definition
│   │       ├── http.ts        # HTTP endpoints (webhooks)
│   │       ├── users.ts       # User management
│   │       ├── playground.ts  # AI agent playground
│   │       ├── auth.config.ts # Clerk auth configuration
│   │       ├── convex.config.ts # Convex configuration
│   │       └── package.json   # Backend dependencies
│   │
│   ├── ui/                     # Shared UI components (@workspace/ui)
│   │   └── src/
│   │       ├── components/    # shadcn/ui components
│   │       ├── hooks/         # Shared React hooks
│   │       ├── lib/           # UI utilities
│   │       └── styles/
│   │           └── globals.css # Global styles
│   │
│   ├── math/                   # Example utility package (@workspace/math)
│   │   └── src/
│   │       ├── add.ts         # Add function
│   │       └── subtract.ts    # Subtract function
│   │
│   ├── eslint-config/          # Shared ESLint configuration
│   │   └── package.json
│   │
│   └── typescript-config/      # Shared TypeScript configuration
│       └── package.json
│
├── .vscode/                     # VS Code workspace settings
├── .eslintrc.js                # Root ESLint config
├── .gitignore                  # Git ignore rules
├── .npmrc                      # npm configuration
├── package.json                # Root package.json
├── pnpm-lock.yaml              # pnpm lock file
├── pnpm-workspace.yaml         # pnpm workspace configuration
├── tsconfig.json               # Root TypeScript config
├── turbo.json                  # Turborepo configuration
└── README.md                   # This file
```

## Database Schema

The Convex backend (`packages/backend/convex/schema.ts`) includes:

- **subscriptions**: Organization subscription status
- **widgetSettings**: Widget configuration per organization (greet messages, suggestions, VAPI settings)
- **plugins**: Third-party service integrations (VAPI API keys stored in AWS Secrets Manager)
- **conversations**: Customer support conversations with status tracking
- **contactSessions**: Customer session data with browser metadata
- **users**: User profiles

## Environment Variables

### Root Level
No environment variables required at root level.

### Apps/Web (`apps/web/.env.local`)
```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_JWT_ISSUER_DOMAIN=your-clerk-domain.clerk.accounts.dev

# Sentry (optional)
SENTRY_AUTH_TOKEN=xxxxx
NEXT_PUBLIC_SENTRY_DSN=xxxxx

# Build flags
CI=false
```

**File Location**: `apps/web/.env.local` (create this file, not tracked in git)

### Apps/Widget (`apps/widget/.env.local`)
```env
# Convex
NEXT_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
```

**File Location**: `apps/widget/.env.local` (create this file, not tracked in git)

### Apps/Embed (`apps/embed/config.ts`)
The embed app uses a TypeScript config file instead of environment variables:
```typescript
export const EMBED_CONFIG = {
  WIDGET_URL: 'http://localhost:3001', // Change to production URL
  DEFAULT_POSITION: 'bottom-right' as const,
};
```

**File Location**: `apps/embed/config.ts` (tracked in git, modify for production)

### Packages/Backend (`packages/backend/convex/` - Convex Environment Variables)
These are set in the Convex dashboard (not in `.env` files):
```env
# Clerk
CLERK_JWT_ISSUER_DOMAIN=your-clerk-domain.clerk.accounts.dev
CLERK_SECRET_KEY=sk_test_xxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxx

# AWS Secrets Manager (for storing VAPI keys)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=xxxxx
AWS_SECRET_ACCESS_KEY=xxxxx
```

**Location**: Set these in Convex Dashboard → Settings → Environment Variables
**Access**: Run `npx convex env set VARIABLE_NAME value` or use the dashboard

## Dependencies

### Root Dependencies
```json
{
  "prettier": "^3.5.1",
  "turbo": "^2.4.2",
  "typescript": "5.7.3",
  "packageManager": "pnpm@10.4.1",
  "node": ">=20"
}
```

### Apps/Web Dependencies
```json
{
  "dependencies": {
    "@clerk/nextjs": "^6.27.1",
    "@convex-dev/agent": "^0.1.16",
    "@hookform/resolvers": "^5.2.0",
    "@sentry/nextjs": "^9.42.1",
    "@workspace/backend": "workspace:*",
    "@workspace/math": "workspace:*",
    "@workspace/ui": "workspace:*",
    "bowser": "^2.12.0",
    "convex": "^1.25.4",
    "countries-and-timezones": "^3.8.0",
    "date-fns": "^4.1.0",
    "jotai": "^2.12.5",
    "lucide-react": "^0.475.0",
    "next": "^15.2.3",
    "next-themes": "^0.4.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.61.1",
    "sonner": "^2.0.6",
    "zod": "3.25.67"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@workspace/eslint-config": "workspace:^",
    "@workspace/typescript-config": "workspace:*",
    "typescript": "^5.7.3"
  }
}
```

### Apps/Widget Dependencies
```json
{
  "dependencies": {
    "@convex-dev/agent": "^0.1.16",
    "@hookform/resolvers": "^5.2.0",
    "@vapi-ai/web": "^2.3.8",
    "@workspace/backend": "workspace:*",
    "@workspace/math": "workspace:*",
    "@workspace/ui": "workspace:*",
    "convex": "^1.25.4",
    "date-fns": "^4.1.0",
    "jotai": "^2.12.5",
    "lucide-react": "^0.475.0",
    "next": "^15.2.3",
    "next-themes": "^0.4.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.61.1",
    "zod": "3.25.67"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@workspace/eslint-config": "workspace:^",
    "@workspace/typescript-config": "workspace:*",
    "typescript": "^5.7.3"
  }
}
```

### Apps/Embed Dependencies
```json
{
  "devDependencies": {
    "@types/node": "^20",
    "@workspace/eslint-config": "workspace:^",
    "@workspace/typescript-config": "workspace:*",
    "eslint": "^9.20.1",
    "typescript": "^5.7.3",
    "vite": "^5.0.8"
  }
}
```

### Packages/Backend Dependencies
```json
{
  "dependencies": {
    "@ai-sdk/openai": "^1.3.23",
    "@aws-sdk/client-secrets-manager": "^3.859.0",
    "@clerk/backend": "^2.6.1",
    "@convex-dev/agent": "^0.1.16",
    "@convex-dev/agent-playground": "^0.0.17",
    "@convex-dev/rag": "^0.3.3",
    "@vapi-ai/server-sdk": "^0.10.0",
    "ai": "^4.3.19",
    "convex": "^1.25.4",
    "convex-helpers": "^0.1.100",
    "svix": "^1.73.0",
    "zod": "3.25.67"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@workspace/typescript-config": "workspace:*",
    "typescript": "latest"
  }
}
```

### Packages/UI Dependencies
```json
{
  "dependencies": {
    "@dicebear/collection": "^9.2.3",
    "@dicebear/core": "^9.2.3",
    "@hookform/resolvers": "^5.2.0",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@radix-ui/react-use-controllable-state": "^1.2.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.475.0",
    "next-themes": "^0.4.4",
    "react": "^19.0.0",
    "react-day-picker": "^9.8.1",
    "react-dom": "^19.0.0",
    "react-dropzone": "^14.3.8",
    "react-hook-form": "^7.61.1",
    "react-markdown": "^10.1.0",
    "react-resizable-panels": "^3.0.3",
    "recharts": "2.15.4",
    "remark-gfm": "^4.0.1",
    "sonner": "^2.0.6",
    "tailwind-merge": "^3.0.1",
    "tw-animate-css": "^1.2.4",
    "use-stick-to-bottom": "^1.1.1",
    "vaul": "^1.1.2",
    "zod": "3.25.67"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.8",
    "@turbo/gen": "^2.4.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@workspace/eslint-config": "workspace:*",
    "@workspace/typescript-config": "workspace:*",
    "tailwindcss": "^4.0.8",
    "typescript": "^5.7.3"
  }
}
```

## Installation

### Prerequisites
- Node.js >= 20
- pnpm 10.4.1 (installed automatically via packageManager field)

### Setup Steps

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up Convex**:
   ```bash
   cd packages/backend
   pnpm run setup
   # Follow the prompts to create a Convex project
   ```

3. **Configure environment variables**:
   - Create `apps/web/.env.local` with your Convex URL and Clerk keys
   - Create `apps/widget/.env.local` with your Convex URL
   - Update `apps/embed/config.ts` with your widget URL
   - Set Convex environment variables in the Convex dashboard

4. **Set up Clerk**:
   - Create a Clerk application at [clerk.com](https://clerk.com)
   - Enable Organizations feature
   - Create a webhook endpoint pointing to your Convex HTTP endpoint
   - Copy your webhook secret to Convex environment variables

5. **Configure AWS Secrets Manager** (for VAPI integration):
   - Create an AWS account and set up IAM user
   - Add AWS credentials to Convex environment variables
   - The app will store VAPI API keys securely in Secrets Manager

## Development

### Run all applications concurrently:
```bash
pnpm dev
```

This starts:
- Web dashboard: http://localhost:3000
- Widget: http://localhost:3001
- Embed: http://localhost:3002
- Convex backend: convex dev

### Run specific applications:
```bash
# Web dashboard only
cd apps/web && pnpm dev

# Widget only
cd apps/widget && pnpm dev

# Embed script only
cd apps/embed && pnpm dev

# Backend only
cd packages/backend && pnpm dev
```

## Build

### Build all applications:
```bash
pnpm build
```

### Build specific applications:
```bash
turbo build --filter=web
turbo build --filter=widget
turbo build --filter=embed
```

## Adding UI Components

To add shadcn/ui components to the shared UI package:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This places components in `packages/ui/src/components/` for use across all apps.

## Usage

### For Developers Integrating Echo

Add this script to your website:
```html
<script
  src="https://your-domain.com/embed.js"
  data-organization-id="your-org-id"
  data-position="bottom-right"
></script>
```

### For Organizations Using Echo

1. Sign up at the web dashboard
2. Create an organization
3. Configure widget settings (greeting, suggestions, VAPI assistant)
4. Get your organization ID
5. Add the embed script to your website
6. Monitor conversations in the dashboard

## Key Features

- **Multi-tenant**: Full organization support with Clerk
- **Real-time**: Powered by Convex for instant updates
- **AI Agents**: Convex AI agents for intelligent responses
- **Voice Support**: VAPI integration for voice calls
- **Customizable**: Per-organization widget customization
- **Session Tracking**: Detailed visitor metadata and session management
- **Conversation Management**: Track, escalate, and resolve customer conversations
- **Plugin System**: Extensible plugin architecture for integrations
- **Type-safe**: End-to-end TypeScript with generated types
- **Monorepo**: Shared code and consistent tooling across applications

## License

Private - All rights reserved

## Support

For issues or questions, contact your development team.
