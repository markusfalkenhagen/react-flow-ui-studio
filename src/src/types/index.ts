
import type React from 'react';

export interface FileObject {
  id: string;
  name: string;
  type: string;
  url: string; // Can be a blob URL for local preview or a remote URL
  size: number;
  isImage: boolean;
  dataAiHint?: string; // For placeholder images from design
}

export interface Message {
  id:string;
  text: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
  file?: FileObject;
  reasoning?: string; 
}

// New types for Task Progress UI
export interface SubStepLog {
  id: string;
  type: 'command' | 'file_creation' | 'info';
  icon?: React.ElementType; // Lucide icon component
  text: string;
  timestamp?: string; 
}

export type TaskStepStatus = 'pending' | 'in-progress' | 'completed' | 'error';

export interface TaskStep {
  id: string;
  title: string;
  status: TaskStepStatus;
  subTitle?: string; 
  logs?: SubStepLog[];
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string; 
}

export interface ComputerCardTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskStatusUIData {
  pageTitle: string;
  userInput: {
    text: string;
    attachment?: {
      name: string;
      type: string;
      size: string;
      icon?: React.ElementType; // e.g., Spreadsheet icon
    };
  };
  agent: {
    name: string;
    icon?: React.ElementType;
    response: string;
  };
  knowledgeRecalled?: {
    title: string;
    items: KnowledgeItem[];
  };
  detailedTaskSteps: TaskStep[];
  computerCard: {
    title: string;
    subtitle: string;
    editorIcon?: React.ElementType;
    thumbnailUrl: string;
    thumbnailAlt: string;
    progressTitle: string;
    tasks: ComputerCardTask[];
  };
}

    