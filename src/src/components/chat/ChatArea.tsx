
"use client";

import type { Message, FileObject } from "@/src/types";
import React, { useState, useEffect, useCallback } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Bot, Activity } from "lucide-react";

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
    // Add initial greeting message with animation delay
    setTimeout(() => {
      addMessage({
        text: "Hello! I'm FlowHero with multi-agent capabilities. I can break down complex tasks into steps and show you the workflow in real-time. How can I assist you today?",
        sender: "assistant",
      });
    }, 500);
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
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex h-full flex-col border-r bg-gradient-to-b from-background to-background/95"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 border-b bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <Bot className="h-8 w-8 text-primary" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
            />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              FlowHero Chat
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Activity className="h-3 w-3 text-green-500" />
              <p className="text-sm text-muted-foreground">
                Multi-agent AI assistance with workflow visualization
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </motion.div>
  );
}
