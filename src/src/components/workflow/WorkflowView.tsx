
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AgentSteps } from './AgentSteps';
import { TaskOverview } from './TaskOverview';
import { CodePreview } from './CodePreview';
import { Bot, Code, ListTodo, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function WorkflowView() {
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-full flex flex-col border-l bg-gradient-to-b from-background to-background/95"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 border-b bg-gradient-to-r from-purple-500/5 to-blue-500/5 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="relative"
            >
              <Bot className="h-8 w-8 text-purple-500" />
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
              />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Multi-Agent Workflow
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Activity className="h-3 w-3 text-green-500" />
                <p className="text-sm text-muted-foreground">
                  Track AI agents working on your request
                </p>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Badge variant="secondary" className="bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 border-green-200">
              <Zap className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </motion.div>
        </div>
      </motion.div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <TabsList className="grid w-full grid-cols-3 mx-6 mt-4 bg-gradient-to-r from-muted/50 to-muted backdrop-blur-sm">
            <TabsTrigger 
              value="agents" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-primary/5"
            >
              <Bot className="h-4 w-4" />
              Agents
            </TabsTrigger>
            <TabsTrigger 
              value="tasks" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-primary/5"
            >
              <ListTodo className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="code" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-primary/5"
            >
              <Code className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
        </motion.div>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <TabsContent value="agents" className="flex-1 mx-6 mb-6">
            <AgentSteps />
          </TabsContent>
          
          <TabsContent value="tasks" className="flex-1 mx-6 mb-6">
            <TaskOverview />
          </TabsContent>
          
          <TabsContent value="code" className="flex-1 mx-6 mb-6">
            <CodePreview />
          </TabsContent>
        </motion.div>
      </Tabs>
    </motion.div>
  );
}
