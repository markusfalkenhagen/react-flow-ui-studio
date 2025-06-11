
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Circle, Clock, Zap } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  completedAt?: Date;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Create split view layout',
    description: 'Implement resizable panels for chat and workflow view',
    status: 'completed',
    priority: 'high',
    estimatedTime: '5 min',
    completedAt: new Date(Date.now() - 2000)
  },
  {
    id: '2',
    title: 'Design agent workflow components',
    description: 'Build components to visualize multi-agent processes',
    status: 'in-progress',
    priority: 'high',
    estimatedTime: '10 min'
  },
  {
    id: '3',
    title: 'Add real-time updates',
    description: 'Implement live progress tracking for agent steps',
    status: 'pending',
    priority: 'medium',
    estimatedTime: '8 min'
  },
  {
    id: '4',
    title: 'Code preview integration',
    description: 'Show generated code with syntax highlighting',
    status: 'pending',
    priority: 'medium',
    estimatedTime: '6 min'
  },
  {
    id: '5',
    title: 'Export workflow results',
    description: 'Allow users to export generated artifacts',
    status: 'pending',
    priority: 'low',
    estimatedTime: '4 min'
  }
];

export function TaskOverview() {
  const completedTasks = mockTasks.filter(task => task.status === 'completed').length;
  const totalTasks = mockTasks.length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    if (priority === 'high') {
      return <Zap className="h-3 w-3" />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{completedTasks} of {totalTasks} tasks completed</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100%-120px)]">
        <div className="space-y-3">
          {mockTasks.map((task) => (
            <Card key={task.id} className="transition-all duration-200 hover:shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    {getStatusIcon(task.status)}
                    <div className="flex-1">
                      <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                      {getPriorityIcon(task.priority)}
                      <span className="ml-1">{task.priority}</span>
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      ~{task.estimatedTime}
                    </span>
                  </div>
                  
                  {task.completedAt && (
                    <span className="text-xs text-muted-foreground">
                      {task.completedAt.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
