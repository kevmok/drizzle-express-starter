# Express Typescript REST API with Drizzle ORM & PlanetScale

[![Languages](https://skillicons.dev/icons?i=ts,nodejs,express,planetscale)](https://skillicons.dev)

This is a TypeScript-based API built with Express and Drizzle ORM. It provides endpoints for managing jwt authentication and authorization, as well as CRUD operations for various resources.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies using `pnpm install`.
3. Create a `.env` file in the root directory and add the necessary environment variables (see `.env.example` for an example).
4. Run the development server using `pnpm dev`.

## Scripts

In the project directory, you can run:

Builds the TypeScript code into JavaScript code.

```
pnpm build
```

Runs the app in development mode using Nodemon and tsx.

```
pnpm dev
```

Drops the database specified in the `drizzle.config.ts` file.

```
pnpm db:drop
```

Generates database schema files based on the models in the `src/db/migrations` directory.

```
pnpm db:generate
```

Pushes the database schema files to the database specified in the `drizzle.config.ts` file.

```
pnpm db:push
```

Opens the Drizzle Studio web interface for managing the database.

```
pnpm db:studio
```

## License

This project is licensed under the MIT License.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
