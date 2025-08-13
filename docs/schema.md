# GraphQL Schema Documentation

This document outlines the GraphQL schema used in this project.

## Types

Currently, our schema is simple and only works with string messages.

```graphql
type Query {
  getMessages: [String]
}

type Mutation {
  addMessage(message: String!): [String]
}
```

## Queries

### getMessages

Returns an array of message strings.

**Example Request:**

```graphql
{
  getMessages
}
```

**Example Response:**

```json
{
  "data": {
    "getMessages": [
      "Hello world!",
      "Welcome to GraphQL!",
      "This is a test message."
    ]
  }
}
```

## Mutations

### addMessage

Adds a new message to the list and returns the updated list.

**Arguments:**

- `message` (String!): The message content to add

**Example Request:**

```graphql
mutation {
  addMessage(message: "Hello from GraphQL!")
}
```

**Example Response:**

```json
{
  "data": {
    "addMessage": [
      "Hello world!",
      "Welcome to GraphQL!",
      "This is a test message.",
      "Hello from GraphQL!"
    ]
  }
}
```

## Future Schema Enhancements

In a real application, you might want to enhance this schema:

```graphql
type Message {
  id: ID!
  content: String!
  author: String
  timestamp: String
}

type Query {
  getMessages: [Message!]!
  getMessage(id: ID!): Message
}

type Mutation {
  addMessage(content: String!, author: String): Message!
  deleteMessage(id: ID!): Boolean!
}
```
