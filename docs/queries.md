# GraphQL API Example Queries

This document provides examples of how to interact with the GraphQL API.

## Making GraphQL Requests

GraphQL requests are made by sending a POST request to the `/api/graphql` endpoint with a JSON body.

### Using `fetch` API (as used in our application)

```javascript
const fetchMessages = async () => {
  const response = await fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "{ getMessages }",
    }),
  });

  const data = await response.json();
  // Use data.data.getMessages
};
```

### Using cURL (for testing)

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"query": "{ getMessages }"}' \
  http://localhost:3000/api/graphql
```

## Query Examples

### Getting All Messages

```graphql
{
  getMessages
}
```

## Mutation Examples

### Adding a New Message

```graphql
mutation {
  addMessage(message: "Hello, GraphQL world!")
}
```

### Variable Usage (for safer input handling)

```graphql
mutation AddNewMessage($message: String!) {
  addMessage(message: $message)
}
```

With variables:

```json
{
  "message": "Hello, GraphQL world!"
}
```

## Using GraphiQL

For easier testing and exploration, you can use GraphiQL by going to:
http://localhost:3000/api/graphql

GraphiQL provides an interactive interface for testing queries and exploring the schema.
