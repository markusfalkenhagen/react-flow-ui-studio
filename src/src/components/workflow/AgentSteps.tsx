
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, Clock, Play, AlertCircle } from 'lucide-react';

interface AgentStep {
  id: string;
  agent: string;
  task: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
  progress: number;
  startTime?: Date;
  endTime?: Date;
  details?: string[];
}

const mockSteps: AgentStep[] = [
  {
    id: '1',
    agent: 'Planner Agent',
    task: 'Analyze user request and create execution plan',
    status: 'completed',
    progress: 100,
    startTime: new Date(Date.now() - 5000),
    endTime: new Date(Date.now() - 3000),
    details: ['Parsed user requirements', 'Identified components needed', 'Created step-by-step plan']
  },
  {
    id: '2',
    agent: 'UI Designer',
    task: 'Design layout and component structure',
    status: 'in-progress',
    progress: 75,
    startTime: new Date(Date.now() - 3000),
    details: ['Designed main layout', 'Created component hierarchy', 'Working on styling...']
  },
  {
    id: '3',
    agent: 'Code Generator',
    task: 'Generate React components and logic',
    status: 'pending',
    progress: 0,
    details: []
  },
  {
    id: '4',
    agent: 'Quality Checker',
    task: 'Review and optimize generated code',
    status: 'pending',
    progress: 0,
    details: []
  }
];

export function AgentSteps() {
  const getStatusIcon = (status: AgentStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Play className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: AgentStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-600';
      case 'error':
        return 'bg-red-100 text-red-800';
    }
  };

  const getAvatarInitials = (agent: string) => {
    return agent
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4">
        {mockSteps.map((step, index) => (
          <Card key={step.id} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getAvatarInitials(step.agent)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-medium">{step.agent}</CardTitle>
                    <p className="text-xs text-muted-foreground">{step.task}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(step.status)}
                  <Badge variant="secondary" className={getStatusColor(step.status)}>
                    {step.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {step.status !== 'pending' && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{step.progress}%</span>
                  </div>
                  <Progress value={step.progress} className="h-2" />
                </div>
              )}
              
              {step.details.length > 0 && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Details:</p>
                  <ul className="text-xs space-y-1">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {step.startTime && (
                <div className="mt-3 text-xs text-muted-foreground">
                  Started: {step.startTime.toLocaleTimeString()}
                  {step.endTime && (
                    <span className="ml-2">
                      • Completed: {step.endTime.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
