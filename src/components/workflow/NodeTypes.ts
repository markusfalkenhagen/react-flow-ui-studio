
export type NodeData = {
  label: string;
  description?: string;
  nodeType: 'trigger' | 'action' | 'helper';
  icon?: string;
  inputs?: { name: string; description?: string }[];
  outputs?: { name: string; description?: string }[];
  parameters?: { 
    name: string; 
    type: string; 
    defaultValue?: any;
    value?: any;
  }[];
  id?: string;
  type?: string;
  typeVersion?: number;
  position?: [number, number];
  webhookPath?: string;
  credentials?: Record<string, { id: string; name: string }>;
  disabled?: boolean;
};

export type NodeCategory = {
  id: string;
  name: string;
  nodes: NodeData[];
};

export type Credential = {
  id: string;
  name: string;
  type: string;
  data: Record<string, any>;
};

export type WebhookData = {
  id: string;
  name: string;
  path: string;
  method: string;
  url: string;
};

export type WorkflowData = {
  nodes: NodeData[];
  connections: Record<string, { main: Array<Array<{ node: string; type: string; index: number }>> }>;
  meta?: Record<string, any>;
};
