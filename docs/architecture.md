# Architecture and Design Documentation

This document explains the architecture and design decisions for this GraphQL message board application.

## Overall Architecture

The application follows a simple, but complete client-server architecture:

```
┌───────────────────┐         ┌───────────────────┐
│                   │         │                   │
│  Next.js Frontend │ ←─────→ │  GraphQL API      │
│  (React)          │  HTTP   │  (GraphQL Yoga)   │
│                   │  POST   │                   │
└───────────────────┘         └───────────────────┘
                                       ↕️
                              ┌───────────────────┐
                              │                   │
                              │  In-Memory Store  │
                              │  (messages array) │
                              │                   │
                              └───────────────────┘
```

## Key Components

### 1. GraphQL API (`src/app/api/graphql/route.ts`)

- **Framework**: GraphQL Yoga
- **Role**: Processes GraphQL queries and mutations
- **Key Features**:
  - TypeScript type safety
  - Schema definition with GraphQL SDL
  - Resolver functions that implement business logic
  - Integration with Next.js App Router API routes

### 2. Frontend (`src/app/page.tsx`)

- **Framework**: React with Next.js App Router
- **Role**: User interface for interacting with the GraphQL API
- **Key Features**:
  - Client-side form with state management
  - Direct GraphQL queries using fetch API
  - Reactive UI updates based on API responses
  - Loading state management

### 3. Data Store

- Currently a simple in-memory JavaScript array
- In a production application, this would be replaced by a database

## Request Flow

1. User submits a new message in the UI
2. Frontend component sends a GraphQL mutation to `/api/graphql`
3. GraphQL Yoga parses and validates the request
4. The resolver function adds the message to the in-memory array
5. The updated array is returned to the client
6. React state is updated, causing the UI to re-render with the new message

## Design Decisions

### Why GraphQL?

- **Efficient data fetching**: Client specifies exactly what data it needs
- **Type safety**: Schema provides a contract between client and server
- **Single endpoint**: All data operations go through one API endpoint
- **Self-documenting**: Schema serves as documentation for the API

### Why GraphQL Yoga?

- Modern, lightweight GraphQL server
- Easy integration with Next.js API routes
- Built-in schema validation
- Developer-friendly error messages

### Why In-Memory Storage?

- Simplicity for this learning project
- No database setup required
- Easily replaced with a real database for production use

## Future Architecture Improvements

1. **Add Database Layer**: Replace in-memory array with MongoDB, PostgreSQL, etc.
2. **Add Authentication**: Implement user authentication and authorization
3. **GraphQL Client**: Replace direct fetch calls with Apollo Client or URQL
4. **State Management**: Add more robust state management for larger applications
5. **Subscriptions**: Add real-time updates with GraphQL subscriptions
