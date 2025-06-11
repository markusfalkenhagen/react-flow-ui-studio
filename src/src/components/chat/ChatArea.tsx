
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
      text: "Hello! I'm FlowHero. How can I assist you today?",
      sender: "assistant",
    });
  }, [addMessage]);

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
      // Simulate AI response - replace with actual AI integration
      setTimeout(() => {
        addMessage({
          text: `I received your message: "${text}". This is a simulated response. In a full implementation, this would connect to your AI service.`,
          sender: "assistant",
        });
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Error calling AI:", error);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
      addMessage({
        text: "Sorry, I encountered an error. Please try again.",
        sender: "assistant",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
