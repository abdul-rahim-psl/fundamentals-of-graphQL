"use client";

import { useState, useEffect } from "react";

/**
 * Home component - Main page of our GraphQL messaging application
 *
 * Provides a UI for:
 * 1. Viewing all messages (using the getMessages query)
 * 2. Adding new messages (using the addMessage mutation)
 */
export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch messages from the GraphQL API on component mount
   */
  useEffect(() => {
    fetchMessages();
  }, []);

  /**
   * Fetches messages using the getMessages GraphQL query
   */
  const fetchMessages = async () => {
    setIsLoading(true);

    const query = "query { getMessages }";

    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (data.data?.getMessages) {
        setMessages(data.data.getMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles adding a new message using the addMessage GraphQL mutation
   */
  const addMessage = async () => {
    if (!newMsg.trim()) return;

    try {
      const query = `
        mutation {
          addMessage(message: ${JSON.stringify(newMsg)})
        }
      `;

      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (data.data?.addMessage) {
        setMessages(data.data.addMessage);
        setNewMsg("");
      }
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  /**
   * Handle form submission for adding messages
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage();
  };

  return (
    <div className="font-sans flex flex-col items-center min-h-screen p-8 pb-20 max-w-4xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-3">GraphQL Message Board</h1>
        <p className="text-gray-500">A simple demo of GraphQL with Next.js</p>
      </header>

      <main className="flex flex-col w-full max-w-lg gap-8">
        {/* Message Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Add a New Message</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </form>

        {/* Message List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          {isLoading ? (
            <p>Loading messages...</p>
          ) : messages.length > 0 ? (
            <ul className="border rounded-lg overflow-hidden divide-y">
              {messages.map((msg, i) => (
                <li key={i} className="p-4 hover:bg-gray-50">
                  {msg}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              No messages yet. Be the first to add one!
            </p>
          )}
        </div>

        {/* GraphQL Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">About this App</h3>
          <p className="text-sm text-gray-600 mb-3">
            This is a simple demonstration of GraphQL with Next.js App Router.
            It uses:
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>GraphQL Yoga for the API</li>
            <li>Next.js App Router for routing</li>
            <li>In-memory data store (for demo purposes)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
