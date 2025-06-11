
"use client";

import type { Message, FileObject } from "@/types";
import React, { useState, useEffect, useCallback } from "react";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { intelligentWebhook } from '@/ai/flows/intelligent-webhooks';
import { useToast } from "@/hooks/use-toast";

export function ChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addAndSaveMessage = useCallback(async (newMessage: Omit<Message, "id" | "timestamp">) => {
    const messageToSave: Message = { ...newMessage, id: crypto.randomUUID(), timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, messageToSave]);

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageToSave),
      });

      if (!response.ok) {
        throw new Error(`Failed to save message. Status: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Error saving message to Supabase:", error.message);
      toast({
        title: "Error",
        description: "Failed to save message history. Please check your Supabase setup.",
        variant: "destructive",
      });
    }
  }, [toast]);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
          throw new Error(`Failed to fetch messages. Status: ${response.status}`);
        }
        const fetchedMessages: Message[] = await response.json();
        if (fetchedMessages.length === 0) {
          // If no messages, fetch initial greeting
          const settingsResponse = await fetch('/api/settings');
          if (!settingsResponse.ok) {
            throw new Error(`Failed to fetch settings. Status: ${settingsResponse.status}`);
          }
          const settings = await settingsResponse.json();
          const greeting = settings.greetingMessage || "Hello! Default greeting from FlowHero.";
          await addAndSaveMessage({
            text: greeting,
            sender: "assistant",
          });
        } else {
          setMessages(fetchedMessages);
        }
      } catch (error: any) {
        console.error("Error fetching messages or initial greeting:", error.message);
        toast({
          title: "Error",
          description: "Could not load chat history. Using fallback greeting.",
          variant: "destructive",
        });
        await addAndSaveMessage({
          text: "Hello! I'm FlowHero. How can I assist you today? (Fallback)",
          sender: "assistant",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [addAndSaveMessage, toast]);


  const handleSendMessage = async (text: string, file?: FileObject) => {
    if (!text.trim() && !file) return;

    const userMessage: Omit<Message, "id" | "timestamp"> = {
      text: text,
      sender: "user",
      file: file,
    };
    await addAndSaveMessage(userMessage);
    setIsLoading(true);

    try {
      const aiResponse = await intelligentWebhook({ message: text });

      if (aiResponse.reasoning) {
         await addAndSaveMessage({
          text: `FlowHero AI determined the following:`,
          sender: "system",
          reasoning: aiResponse.reasoning,
        });
      }
      
      // Example: Simulating tool action based on AI response
      await addAndSaveMessage({
        text: `Based on your request, I've selected the '${aiResponse.toolSelected}' tool. This is a simulated response for that tool.`,
        sender: "assistant",
      });

    } catch (error) {
      console.error("Error calling AI:", error);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
       await addAndSaveMessage({
        text: "Sorry, I encountered an error. Please try again.",
        sender: "assistant",
      });
    } finally {
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
