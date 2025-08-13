# GraphQL Basics Documentation

Welcome to the documentation for the GraphQL Basics project! This folder contains detailed information about different aspects of the application.

## Available Documentation

1. **[Schema Documentation](./schema.md)** - Details about the GraphQL schema, types, queries, and mutations
2. **[Example Queries](./queries.md)** - Examples of how to interact with the GraphQL API
3. **[Architecture Documentation](./architecture.md)** - Overview of the system design and component interactions

## Quick Start

To get started with this project:

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Visit http://localhost:3000 in your browser
4. Explore the GraphQL API at http://localhost:3000/api/graphql

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── graphql/
│   │       └── route.ts     # GraphQL API endpoint
│   ├── page.tsx             # Frontend UI component
│   └── layout.tsx           # Root layout
docs/
├── architecture.md          # Architecture documentation
├── index.md                 # This file
├── queries.md               # Example queries documentation
└── schema.md                # Schema documentation
```

## Key Features

- Simple GraphQL API with queries and mutations
- React-based frontend for interacting with the API
- TypeScript for type safety
- Next.js App Router for routing and API endpoints

## Need Help?

If you need additional help or have questions about this project, please check the README.md file at the root of the repository or consult the [Next.js documentation](https://nextjs.org/docs) and [GraphQL documentation](https://graphql.org/learn/).
