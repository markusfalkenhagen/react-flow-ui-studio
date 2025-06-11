
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
import { Bot, Code, ListTodo } from 'lucide-react';

export function WorkflowView() {
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <div className="h-full flex flex-col border-l bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Multi-Agent Workflow
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Track AI agents working on your request
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ListTodo className="h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents" className="flex-1 mx-4 mb-4">
          <AgentSteps />
        </TabsContent>
        
        <TabsContent value="tasks" className="flex-1 mx-4 mb-4">
          <TaskOverview />
        </TabsContent>
        
        <TabsContent value="code" className="flex-1 mx-4 mb-4">
          <CodePreview />
        </TabsContent>
      </Tabs>
    </div>
  );
}
