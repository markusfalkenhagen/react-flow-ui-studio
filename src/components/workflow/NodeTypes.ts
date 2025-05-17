
export type NodeData = {
  label: string;
  description?: string;
  nodeType: 'trigger' | 'action' | 'helper';
  icon?: string;
  inputs?: { name: string; description?: string }[];
  outputs?: { name: string; description?: string }[];
  parameters?: { name: string; type: string; defaultValue?: any }[];
};

export type NodeCategory = {
  id: string;
  name: string;
  nodes: NodeData[];
};
