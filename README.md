# PubKey Link

## Getting Started

### Prerequisites

- Node v18 or higher
- PNPM
- Docker

### Installation

Clone the repo and install dependencies:

```shell
git clone https://github.com/pubkeyapp/pubkey-link.git
cd pubkey-link
pnpm
```

### Automatic setup

You can run the automatic setup script to create the `.env` file, test the setup and push the database schema.

```shell
pnpm setup
```

### Environment variables

Copy the `.env.example` file to `.env` and fill in the missing values.

```shell
cp .env.example .env
```

### Starting the services

You will need to start the database before starting the backend.

```shell
pnpm dev:services
```

### Pushing the database schema

If you start from scratch, you will need to push the database schema to the database.

```shell
pnpm prisma db push
```

Also, after each change to the schema in `prisma/schema.prisma`, you will need to run the above command again.

### Starting the API

```shell
pnpm dev:api
```

### Starting the web ui

```shell
pnpm dev:web
```

### Starting the SDK generator

```shell
pnpm dev:sdk
```

## Extending the application

You can use the following commands to generate new models, API features, web features and SDK types.

### Adding a new model

The following command will generate a new model in `prisma/schema.prisma`.

You will need to run `pnpm prisma db push` to push the schema to the database.

```shell
pnpm nx g prisma-model company
```

Output:

```shell
> NX Generating @pubkey-link/tools:prisma-model

UPDATE prisma/schema.prisma
```

### Adding a new API feature

The following command will generate a new API feature in `libs/api/company/*`.

You will need to restart the API server to make sure it picks up the new libraries.

```shell
pnpm nx g api-feature company
```

Output:

```shell
> NX Generating @pubkey-link/tools:api-feature

CREATE libs/api/company/data-access/...
CREATE libs/api/company/feature/...
UPDATE libs/api/core/feature/src/lib/api-core-feature.module.ts
CREATE libs/sdk/src/graphql/feature-company.graphql
CREATE apps/api-e2e/src/api/api-company-feature.spec.ts
```

### Adding a new web feature

The following command will generate a new web feature in `libs/web/company/*`.

You will need to restart the web server to make sure it picks up the new libraries.

```shell
pnpm nx g web-feature company
```

Output:

```shell
> NX Generating @pubkey-link/tools:web-feature

CREATE libs/web/company/data-access/...
CREATE libs/web/company/feature/...
CREATE libs/web/company/ui/...
UPDATE libs/web/shell/feature/src/lib/shell-admin-routes.tsx
UPDATE tsconfig.base.json
```
