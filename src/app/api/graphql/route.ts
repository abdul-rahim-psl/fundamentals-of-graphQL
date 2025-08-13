import { NextRequest } from "next/server";
import { createSchema, createYoga } from "graphql-yoga";

/**
 * In-memory storage for messages
 * In a real application, this would be replaced with a database
 */
const messages: string[] = ["Hello world!"];

/**
 * GraphQL schema definition
 * Defines two operations:
 * - Query.getMessages: Returns all stored messages
 * - Mutation.addMessage: Adds a new message and returns the updated list
 */
const typeDefs = /* GraphQL */ `
  type Query {
    getMessages: [String]
  }

  type Mutation {
    addMessage(message: String!): [String]
  }
`;

/**
 * Resolver functions that implement the operations defined in the schema
 */
const resolvers = {
  Query: {
    // Returns all messages from our in-memory store
    getMessages: () => messages,
  },
  Mutation: {
    // Adds a new message to the store and returns the updated list
    addMessage: (_: unknown, { message }: { message: string }) => {
      messages.push(message);
      return messages;
    },
  },
};

/**
 * Create a GraphQL Yoga instance with our schema and resolvers
 */
const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
  landingPage: false,
  fetchAPI: {
    Response: Response,
    Request: Request,
  },
});

/**
 * Route handler for GraphQL API requests
 * Processes both GET and POST requests through the Yoga middleware
 */
export async function GET(request: NextRequest) {
  return yoga.fetch(request);
}

export async function POST(request: NextRequest) {
  return yoga.fetch(request);
}
