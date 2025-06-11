
"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import {
  Bot,
  ChevronDown,
  ChevronUp,
  Circle,
  CheckCircle2,
  Loader2,
  Terminal,
  FileText,
  Brain,
  Sheet as SheetIcon,
  X,
  PenTool,
  ArrowLeft,
  Code2 as CodeIcon, // Ensure distinct name
  PenLine,
} from 'lucide-react';
import type { TaskStatusUIData, TaskStepStatus, TaskStep, SubStepLog } from '@/types';
import Link from 'next/link';

// Icon mapping for logs
const logIcons: { [key: string]: React.ElementType } = {
  command: CodeIcon, // Using Code2 for commands
  file_creation: FileText,
  info: Brain, // Default/info icon
  default: Brain,
};


const StatusIcon: React.FC<{ status: TaskStepStatus }> = ({ status }) => {
  if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  if (status === 'in-progress') return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />;
  if (status === 'error') return <X className="h-5 w-5 text-red-500" />;
  return <Circle className="h-5 w-5 text-muted-foreground" />; // pending
};

interface TaskProgressDisplayProps {
  taskData: TaskStatusUIData;
}

export const TaskProgressDisplay: React.FC<TaskProgressDisplayProps> = ({ taskData }) => {
  const [computerCardOpen, setComputerCardOpen] = useState(true);
  // Determine default open accordions: completed and in-progress steps
  const defaultOpenAccordions = taskData.detailedTaskSteps
    .filter(step => step.status === 'completed' || step.status === 'in-progress')
    .map(step => step.id);

  const completedComputerTasks = taskData.computerCard.tasks.filter(t => t.completed).length;
  const totalComputerTasks = taskData.computerCard.tasks.length;

  return (
    <div className="flex min-h-full flex-col bg-transparent text-foreground">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        {/* Optional: Add a back button if this component might be used on a dedicated page */}
        {/* <Button variant="outline" size="icon" className="h-8 w-8" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button> */}
        <h1 className="text-lg font-semibold">{taskData.pageTitle}</h1>
      </header>

      <ScrollArea className="flex-1">
        <div className="container mx-auto max-w-3xl p-4 md:p-6 space-y-6">
          {/* User Input Section */}
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <p className="text-sm mb-3">{taskData.userInput.text}</p>
              {taskData.userInput.attachment && (
                <div className="flex items-center justify-between p-2 border rounded-md bg-muted/50">
                  <div className="flex items-center gap-2">
                    {taskData.userInput.attachment.icon && React.createElement(taskData.userInput.attachment.icon, { className: "h-5 w-5 text-green-600" })}
                    <div>
                      <p className="text-sm font-medium">{taskData.userInput.attachment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {taskData.userInput.attachment.type} &middot; {taskData.userInput.attachment.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Agent Response Section */}
          <div className="flex items-start gap-3">
            {taskData.agent.icon && (
              <Avatar className="h-8 w-8 border bg-primary text-primary-foreground">
                <AvatarFallback>
                  {React.createElement(taskData.agent.icon, { className: "h-5 w-5" })}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1">
              <p className="font-semibold text-sm">{taskData.agent.name}</p>
              <p className="text-sm text-muted-foreground">{taskData.agent.response}</p>
            </div>
          </div>

          {/* Knowledge Recalled Accordion */}
          {taskData.knowledgeRecalled && (
            <Accordion type="single" collapsible className="w-full" defaultValue="knowledge">
              <AccordionItem value="knowledge">
                <AccordionTrigger className="text-sm py-2 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-500" />
                    {taskData.knowledgeRecalled.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1 pb-2 pl-6 text-sm text-muted-foreground">
                  {taskData.knowledgeRecalled.items.map(item => (
                    <p key={item.id}>{item.content}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {/* Detailed Task Steps */}
          <div className="space-y-2">
            <Accordion type="multiple" defaultValue={defaultOpenAccordions} className="w-full">
              {taskData.detailedTaskSteps.map((step) => (
                <AccordionItem value={step.id} key={step.id} className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline text-sm rounded-md data-[state=open]:bg-muted/50 px-2">
                    <div className="flex items-center gap-2 w-full">
                      <StatusIcon status={step.status} />
                      <span className="flex-1 text-left">{step.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2 pl-8 pr-2 space-y-1 text-sm">
                    {step.subTitle && <p className="text-muted-foreground italic mb-1">{step.subTitle}</p>}
                    {step.logs?.map(log => {
                        const LogIconComponent = log.icon || logIcons[log.type] || logIcons.default;
                        return (
                            <div key={log.id} className="flex items-center gap-2 p-1.5 bg-gray-50 dark:bg-gray-800 rounded-md">
                                {LogIconComponent && <LogIconComponent className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                                <span className="font-mono text-xs text-gray-600 dark:text-gray-400 break-all">{log.text}</span>
                            </div>
                        );
                    })}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
           {/* Down arrow icon - purely visual for now */}
           <div className="flex justify-center py-2">
             <ChevronDown className="h-6 w-6 text-muted-foreground opacity-50" />
           </div>
        </div>
      </ScrollArea>

      {/* Agent's Computer Card - Fixed at bottom of its panel */}
      <div className="sticky bottom-0 left-0 right-0 z-10 p-2 md:p-4 bg-background/80 backdrop-blur-sm border-t">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="p-3 cursor-pointer flex flex-row items-center justify-between" onClick={() => setComputerCardOpen(!computerCardOpen)}>
            <div className="flex items-center gap-2">
              <Image 
                src={taskData.computerCard.thumbnailUrl} 
                alt={taskData.computerCard.thumbnailAlt}
                data-ai-hint="code editor" 
                width={40} 
                height={24} 
                className="rounded-sm border"
              />
              <div>
                <CardTitle className="text-base">{taskData.computerCard.title}</CardTitle>
                {taskData.computerCard.editorIcon && (
                  <CardDescription className="text-xs flex items-center gap-1">
                    {React.createElement(taskData.computerCard.editorIcon, {className: "h-3 w-3"})}
                    {taskData.computerCard.subtitle}
                  </CardDescription>
                )}
              </div>
            </div>
            {computerCardOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </CardHeader>
          {computerCardOpen && (
            <CardContent className="p-3 pt-0">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">{taskData.computerCard.progressTitle}</p>
                <p className="text-sm text-muted-foreground">{completedComputerTasks}/{totalComputerTasks}</p>
              </div>
              <Progress value={(completedComputerTasks / totalComputerTasks) * 100} className="h-2 mb-3" />
              <ul className="space-y-1.5">
                {taskData.computerCard.tasks.map(task => (
                  <li key={task.id} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className={`h-4 w-4 ${task.completed ? 'text-green-500' : 'text-muted-foreground/30'}`} />
                    <span className={task.completed ? 'text-foreground' : 'text-muted-foreground'}>{task.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};


    