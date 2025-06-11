
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import { SettingsButton } from './SettingsButton';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-16 shrink-0 items-center gap-2 border-b bg-gradient-to-r from-background/95 to-background backdrop-blur-sm px-4"
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-2 flex-1">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Bot className="h-6 w-6 text-primary" />
        </motion.div>
        <div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            FlowHero
          </h1>
        </div>
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </motion.div>
      </div>
      <div className="flex items-center gap-2">
        <SettingsButton />
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
