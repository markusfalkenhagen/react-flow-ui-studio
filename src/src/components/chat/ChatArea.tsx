
"use client";

import type { Message, FileObject } from "@/src/types";
import React, { useState, useEffect, useCallback } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useToast } from "@/hooks/use-toast";

export function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addMessage = useCallback((newMessage: Omit<Message, "id" | "timestamp">) => {
    const messageToAdd: Message = { 
      ...newMessage, 
      id: crypto.randomUUID(), 
      timestamp: new Date() 
    };
    setMessages((prevMessages) => [...prevMessages, messageToAdd]);
  }, []);

  useEffect(() => {
    // Add initial greeting message
    addMessage({
      text: "Hello! I'm FlowHero with multi-agent capabilities. I can break down complex tasks into steps and show you the workflow in real-time. How can I assist you today?",
      sender: "assistant",
    });
  }, [addMessage]);

  const simulateAgentWorkflow = async (userText: string) => {
    // Simulate different agent responses based on user input
    const responses = [
      {
        text: `🤖 **Planner Agent**: I've analyzed your request: "${userText}". Let me break this down into actionable steps and coordinate with other agents.`,
        sender: "assistant" as const,
        reasoning: "Planning phase - analyzing requirements and creating execution strategy"
      },
      {
        text: `🎨 **UI Designer Agent**: Based on the plan, I'm designing the interface components and user experience flow. This will ensure optimal usability.`,
        sender: "assistant" as const,
        reasoning: "Design phase - creating user interface and experience patterns"
      },
      {
        text: `⚙️ **Implementation Agent**: Now implementing the designed solution with proper code structure, error handling, and best practices.`,
        sender: "assistant" as const,
        reasoning: "Development phase - writing and optimizing code implementation"
      },
      {
        text: `✅ **Quality Assurance Agent**: Reviewing the implementation for performance, accessibility, and code quality. Everything looks good!`,
        sender: "assistant" as const,
        reasoning: "Quality check phase - ensuring standards and best practices"
      }
    ];

    for (let i = 0; i < responses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000 + i * 1000));
      addMessage(responses[i]);
    }
  };

  const handleSendMessage = async (text: string, file?: FileObject) => {
    if (!text.trim() && !file) return;

    const userMessage: Omit<Message, "id" | "timestamp"> = {
      text: text,
      sender: "user",
      file: file,
    };
    addMessage(userMessage);
    setIsLoading(true);

    try {
      // Simulate multi-agent workflow
      await simulateAgentWorkflow(text);
      setIsLoading(false);

    } catch (error) {
      console.error("Error in agent workflow:", error);
      toast({
        title: "Error",
        description: "Failed to process request with agent workflow. Please try again.",
        variant: "destructive",
      });
      addMessage({
        text: "Sorry, I encountered an error in the agent workflow. Please try again.",
        sender: "assistant",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col border-r">
      <div className="p-4 border-b bg-background">
        <h2 className="text-lg font-semibold">FlowHero Chat</h2>
        <p className="text-sm text-muted-foreground">
          Multi-agent AI assistance with workflow visualization
        </p>
      </div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
