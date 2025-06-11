
"use client";

import type { Message } from "@/src/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BotIcon, UserCircle2, Info } from "lucide-react";
import { FilePreview } from "@/src/components/files/FilePreview";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const getAvatar = (sender: Message["sender"]) => {
    if (sender === "user") {
      return (
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            <UserCircle2 className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      );
    }
    if (sender === "assistant") {
      return (
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
          <AvatarFallback>
            <BotIcon className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      );
    }
    return (
      <Avatar className="h-8 w-8 bg-muted text-muted-foreground">
        <AvatarFallback>
          <Info className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <ScrollArea className="h-full flex-1 p-4" ref={scrollAreaRef}>
      <div className="space-y-6">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender !== "user" && getAvatar(msg.sender)}
            <div
              className={`max-w-[70%] rounded-xl px-4 py-3 shadow-sm ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : msg.sender === "assistant"
                  ? "bg-card text-card-foreground border"
                  : "bg-muted text-muted-foreground border italic"
              }`}
            >
              {msg.sender === "system" && msg.reasoning && (
                <p className="mb-1 text-xs font-medium opacity-80 font-code">AI Reasoning: {msg.reasoning}</p>
              )}
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {msg.file && <FilePreview file={msg.file} />}
              <p className={`mt-1.5 text-xs opacity-70 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {format(msg.timestamp, "HH:mm")}
              </p>
            </div>
            {msg.sender === "user" && getAvatar(msg.sender)}
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
}
