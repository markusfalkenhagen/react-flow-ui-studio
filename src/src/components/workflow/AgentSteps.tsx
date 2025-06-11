
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, Clock, Play, AlertCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Play className="h-4 w-4 text-blue-500" />
          </motion.div>
        );
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: AgentStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 border-gray-200';
      case 'error':
        return 'bg-gradient-to-r from-red-100 to-red-50 text-red-800 border-red-200';
    }
  };

  const getAvatarInitials = (agent: string) => {
    return agent
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-purple-500 to-blue-500',
      'bg-gradient-to-br from-blue-500 to-cyan-500',
      'bg-gradient-to-br from-cyan-500 to-green-500',
      'bg-gradient-to-br from-green-500 to-yellow-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6">
        <AnimatePresence>
          {mockSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
            >
              <Card className="transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-card/80 to-card backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Avatar className={`h-12 w-12 ${getAvatarGradient(index)} text-white ring-2 ring-white/20`}>
                          <AvatarFallback className="text-sm font-bold">
                            {getAvatarInitials(step.agent)}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <CardTitle className="text-base font-semibold">{step.agent}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{step.task}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {step.status === 'in-progress' && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Zap className="h-4 w-4 text-yellow-500" />
                        </motion.div>
                      )}
                      {getStatusIcon(step.status)}
                      <Badge variant="secondary" className={getStatusColor(step.status)}>
                        {step.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {step.status !== 'pending' && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mb-4"
                    >
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Progress</span>
                        <span>{step.progress}%</span>
                      </div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ originX: 0 }}
                      >
                        <Progress 
                          value={step.progress} 
                          className="h-3 bg-gradient-to-r from-muted to-muted/50" 
                        />
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {step.details.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <p className="text-sm font-medium text-muted-foreground">Details:</p>
                      <ul className="text-sm space-y-2">
                        {step.details.map((detail, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 }}
                            className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10"
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                              className="w-2 h-2 bg-primary rounded-full"
                            />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  
                  {step.startTime && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-4 text-xs text-muted-foreground bg-gradient-to-r from-muted/20 to-muted/10 rounded-lg p-3"
                    >
                      Started: {step.startTime.toLocaleTimeString()}
                      {step.endTime && (
                        <span className="ml-3">
                          • Completed: {step.endTime.toLocaleTimeString()}
                        </span>
                      )}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
}
