
"use client";

import type { Message } from "@/src/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BotIcon, UserCircle2, Info } from "lucide-react";
import { FilePreview } from "@/src/components/files/FilePreview";
import { motion, AnimatePresence } from "framer-motion";
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
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <UserCircle2 className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </motion.div>
      );
    }
    if (sender === "assistant") {
      return (
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Avatar className="h-10 w-10 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground ring-2 ring-primary/30">
            <AvatarFallback>
              <BotIcon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </motion.div>
      );
    }
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Avatar className="h-10 w-10 bg-muted text-muted-foreground ring-2 ring-muted-foreground/20">
          <AvatarFallback>
            <Info className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </motion.div>
    );
  };

  return (
    <ScrollArea className="h-full flex-1 p-6" ref={scrollAreaRef}>
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-start gap-4 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender !== "user" && getAvatar(msg.sender)}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                className={`max-w-[75%] rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm border ${
                  msg.sender === "user"
                    ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground border-primary/20"
                    : msg.sender === "assistant"
                    ? "bg-gradient-to-br from-card to-card/90 text-card-foreground border-border/50"
                    : "bg-gradient-to-br from-muted to-muted/90 text-muted-foreground border-border/30 italic"
                }`}
              >
                {msg.sender === "system" && msg.reasoning && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-2 text-xs font-medium opacity-80 font-mono bg-black/10 rounded px-2 py-1"
                  >
                    🧠 AI Reasoning: {msg.reasoning}
                  </motion.p>
                )}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="whitespace-pre-wrap leading-relaxed"
                >
                  {msg.text}
                </motion.p>
                {msg.file && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <FilePreview file={msg.file} />
                  </motion.div>
                )}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className={`mt-3 text-xs opacity-60 flex items-center gap-1 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className="w-1 h-1 bg-current rounded-full" />
                  {format(msg.timestamp, "HH:mm")}
                </motion.p>
              </motion.div>
              {msg.sender === "user" && getAvatar(msg.sender)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
