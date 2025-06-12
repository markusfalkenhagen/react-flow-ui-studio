
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SettingsButton } from './SettingsButton';
import { motion } from 'framer-motion';
import { Zap, Bot, Crown } from 'lucide-react';

export function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-14 border-b bg-card/80 backdrop-blur-sm flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative p-2 rounded-xl bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-background" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              FlowHero
            </h1>
            <p className="text-xs text-muted-foreground">
              Professional AI Workspace
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Badge variant="secondary" className="text-xs border">
          <Crown className="h-3 w-3 mr-1" />
          Professional
        </Badge>
        
        <Button variant="outline" size="sm" className="h-8 text-xs">
          <Zap className="h-3 w-3 mr-1" />
          Upgrade
        </Button>
        
        <SettingsButton />
      </motion.div>
    </motion.header>
  );
}
