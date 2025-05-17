
import { Node } from '@xyflow/react';

export interface NodeData {
  id?: string;
  position?: { x: number; y: number };
  label: string;
  description?: string;
  nodeType: 'trigger' | 'action' | 'helper';
  icon?: React.ReactNode;
  inputs?: { name: string; description?: string }[];
  outputs?: { name: string; description?: string }[];
  parameters?: { name: string; type: string; defaultValue?: any }[];
}

export interface WorkflowNode extends Node<NodeData> {}

export type NodeCategory = {
  id: string;
  name: string;
  nodes: NodeData[];
};
