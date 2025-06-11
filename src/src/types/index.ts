
export interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant" | "system";
  timestamp: Date;
  file?: FileObject;
  reasoning?: string;
}

export interface FileObject {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  isImage: boolean;
}

export interface TaskStatusUIData {
  pageTitle: string;
  userInput: {
    text: string;
    attachment?: {
      name: string;
      type: string;
      size: string;
      icon: any;
    };
  };
  agent: {
    name: string;
    icon: any;
    response: string;
  };
  knowledgeRecalled: {
    title: string;
    items: Array<{
      id: string;
      title: string;
      content: string;
    }>;
  };
  detailedTaskSteps: Array<{
    id: string;
    title: string;
    status: "completed" | "in-progress" | "pending";
    subTitle?: string;
    logs?: Array<{
      id: string;
      type: "command" | "info" | "file_creation";
      icon?: any;
      text: string;
    }>;
  }>;
  computerCard: {
    title: string;
    subtitle: string;
    editorIcon: any;
    thumbnailUrl: string;
    thumbnailAlt: string;
    progressTitle: string;
    tasks: Array<{
      id: string;
      text: string;
      completed: boolean;
    }>;
  };
}
