
import { Node } from '@xyflow/react';

export interface NodeData {
  label: string;
  description?: string;
  nodeType: 'trigger' | 'action' | 'helper';
  icon?: React.ReactNode;
  inputs?: { name: string; description?: string }[];
  outputs?: { name: string; description?: string }[];
  parameters?: { name: string; type: string; defaultValue?: any }[];
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

export interface WorkflowNode extends Node<NodeData> {}

export type NodeCategory = {
  id: string;
  name: string;
  nodes: NodeData[];
};
