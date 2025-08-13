# GraphQL Basics with Next.js

A simple message board application that demonstrates GraphQL implementation in a Next.js project using GraphQL Yoga.

## Project Overview

This application serves as a learning resource for understanding GraphQL basics with the following features:

- **Frontend**: React components with Next.js App Router
- **Backend**: GraphQL API built with GraphQL Yoga
- **Operations**:
  - Query: `getMessages` (fetch message list)
  - Mutation: `addMessage` (add new message)

## Architecture Flow

When a GraphQL operation is executed:

1. **Frontend Component** sends a GraphQL query/mutation to `/api/graphql`
2. **Next.js API Route** receives the request
3. **GraphQL Yoga** parses the query, validates it, and runs the resolver function
4. **Resolver Function** executes business logic (read/write from in-memory store)
5. **GraphQL Server** returns JSON result to the client
6. **Frontend** updates the UI with the returned data

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

Key files and directories in this project:

```
src/
├── app/
│   ├── api/
│   │   └── graphql/
│   │       └── route.ts     # GraphQL API endpoint using GraphQL Yoga
│   ├── page.tsx             # Frontend client component with form and message list
│   └── layout.tsx           # Root layout with fonts and metadata
```

## GraphQL API Explanation

### Schema Definition

The GraphQL schema in `src/app/api/graphql/route.ts` defines:

```graphql
type Query {
  getMessages: [String]
}

type Mutation {
  addMessage(message: String!): [String]
}
```

### Resolvers

The resolvers implement the business logic:

```typescript
const resolvers = {
  Query: {
    // Returns all messages from our in-memory store
    getMessages: () => messages,
  },
  Mutation: {
    // Adds a new message to the store and returns the updated list
    addMessage: (_: any, { message }: { message: string }) => {
      messages.push(message);
      return messages;
    },
  },
};
```

## Frontend Implementation

The frontend React component in `src/app/page.tsx`:

1. Uses React state to manage messages and form inputs
2. Fetches messages on page load using the `getMessages` query
3. Provides a form to add new messages using the `addMessage` mutation
4. Updates the UI when messages are added

## Technologies Used

- **Next.js**: React framework with App Router
- **GraphQL Yoga**: Modern GraphQL server implementation
- **TypeScript**: Type safety throughout the application
- **React**: Frontend UI components and state management

## Further Learning Resources

- [GraphQL Official Documentation](https://graphql.org/learn/)
- [GraphQL Yoga Documentation](https://the-guild.dev/graphql/yoga-server)
- [Next.js Documentation](https://nextjs.org/docs)

## Extending This Project

Here are some ways you could extend this basic application:

1. Add a database connection (MongoDB, PostgreSQL, etc.)
2. Implement authentication for message authors
3. Add more complex types (message with author, timestamp, etc.)
4. Implement subscriptions for real-time updates
5. Add GraphQL input validation
6. Set up Apollo Client on the frontend for more advanced caching
