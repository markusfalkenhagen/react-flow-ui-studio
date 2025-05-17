
import { create } from 'zustand';
import { NodeData, Credential, WebhookData, WorkflowData } from './NodeTypes';
import { Node, Edge, MarkerType } from '@xyflow/react';

interface WorkflowState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  credentials: Credential[];
  webhooks: WebhookData[];
  selectedNodeId: string | null;
  showNodeSettings: boolean;
  showCredentialSettings: boolean;
  showWebhookSettings: boolean;
  showImportDialog: boolean;
  lastWebhookCall: { url: string; data: any } | null;

  setNodes: (nodes: Node<NodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  addCredential: (credential: Credential) => void;
  updateCredential: (id: string, credential: Partial<Credential>) => void;
  removeCredential: (id: string) => void;
  addWebhook: (webhook: WebhookData) => void;
  updateWebhook: (id: string, webhook: Partial<WebhookData>) => void;
  removeWebhook: (id: string) => void;
  openNodeSettings: (nodeId: string) => void;
  closeNodeSettings: () => void;
  openCredentialSettings: () => void;
  closeCredentialSettings: () => void;
  openWebhookSettings: () => void;
  closeWebhookSettings: () => void;
  openImportDialog: () => void;
  closeImportDialog: () => void;
  importWorkflow: (workflow: WorkflowData) => void;
  exportWorkflow: () => WorkflowData;
  callWebhook: (url: string, data: any) => Promise<any>;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  credentials: [],
  webhooks: [],
  selectedNodeId: null,
  showNodeSettings: false,
  showCredentialSettings: false,
  showWebhookSettings: false,
  showImportDialog: false,
  lastWebhookCall: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  
  addCredential: (credential) => set((state) => ({
    credentials: [...state.credentials, credential]
  })),
  
  updateCredential: (id, credential) => set((state) => ({
    credentials: state.credentials.map(c => 
      c.id === id ? { ...c, ...credential } : c
    )
  })),
  
  removeCredential: (id) => set((state) => ({
    credentials: state.credentials.filter(c => c.id !== id)
  })),
  
  addWebhook: (webhook) => set((state) => ({
    webhooks: [...state.webhooks, webhook]
  })),
  
  updateWebhook: (id, webhook) => set((state) => ({
    webhooks: state.webhooks.map(w => 
      w.id === id ? { ...w, ...webhook } : w
    )
  })),
  
  removeWebhook: (id) => set((state) => ({
    webhooks: state.webhooks.filter(w => w.id !== id)
  })),

  openNodeSettings: (nodeId) => set({ selectedNodeId: nodeId, showNodeSettings: true }),
  closeNodeSettings: () => set({ showNodeSettings: false }),
  
  openCredentialSettings: () => set({ showCredentialSettings: true }),
  closeCredentialSettings: () => set({ showCredentialSettings: false }),
  
  openWebhookSettings: () => set({ showWebhookSettings: true }),
  closeWebhookSettings: () => set({ showWebhookSettings: false }),
  
  openImportDialog: () => set({ showImportDialog: true }),
  closeImportDialog: () => set({ showImportDialog: false }),
  
  updateNodeData: (nodeId, data) => set((state) => ({
    nodes: state.nodes.map(node => 
      node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
    )
  })),
  
  importWorkflow: (workflow) => {
    // Convert workflow structure to React Flow format
    const rfNodes: Node<NodeData>[] = workflow.nodes.map(node => {
      // Get position from array to proper format
      const position = node.position 
        ? { x: node.position[0], y: node.position[1] } 
        : { x: 0, y: 0 };
      
      // Extract webhook path for webhook nodes
      let webhookPath;
      if (node.type === 'n8n-nodes-base.webhook') {
        webhookPath = node.parameters?.path || '';
      }
      
      return {
        id: node.id || `node-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        type: 'custom',
        position,
        data: {
          ...node,
          nodeType: node.type?.includes('webhook') ? 'trigger' : 
                    node.type?.includes('respond') ? 'helper' : 'action',
          webhookPath,
        }
      };
    });
    
    // Convert connections to edges
    const rfEdges: Edge[] = [];
    Object.entries(workflow.connections || {}).forEach(([sourceNodeId, connections]) => {
      connections.main?.forEach((outputConnections, outputIndex) => {
        outputConnections.forEach(connection => {
          rfEdges.push({
            id: `e${sourceNodeId}-${connection.node}-${outputIndex}-${connection.index}`,
            source: sourceNodeId,
            target: connection.node,
            type: 'buttonedge',
            sourceHandle: outputIndex.toString(),
            targetHandle: connection.index.toString(),
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          });
        });
      });
    });
    
    // Extract webhooks
    const webhooks: WebhookData[] = workflow.nodes
      .filter(node => node.type === 'n8n-nodes-base.webhook')
      .map(node => ({
        id: node.id || '',
        name: node.name || '',
        path: node.parameters?.path || '',
        method: node.parameters?.httpMethod || 'POST',
        url: `${window.location.origin}/webhook/${node.parameters?.path || ''}`,
      }));
    
    // Extract credentials
    const credentials: Credential[] = [];
    workflow.nodes.forEach(node => {
      if (node.credentials) {
        Object.entries(node.credentials).forEach(([type, cred]) => {
          if (cred && !credentials.some(c => c.id === cred.id)) {
            credentials.push({
              id: cred.id,
              name: cred.name,
              type,
              data: {}
            });
          }
        });
      }
    });
    
    set({ 
      nodes: rfNodes, 
      edges: rfEdges,
      webhooks,
      credentials
    });
  },

  exportWorkflow: () => {
    const { nodes, edges } = get();
    
    // Convert nodes back to n8n format
    const n8nNodes = nodes.map(node => {
      const { data } = node;
      return {
        ...data,
        position: [node.position.x, node.position.y] as [number, number],
        id: node.id
      };
    });
    
    // Convert edges back to n8n connections
    const connections: Record<string, { main: any[] }> = {};
    edges.forEach(edge => {
      if (!connections[edge.source]) {
        connections[edge.source] = { main: [] };
      }
      
      const sourceIndex = parseInt(edge.sourceHandle || '0');
      const targetIndex = parseInt(edge.targetHandle || '0');
      
      if (!connections[edge.source].main[sourceIndex]) {
        connections[edge.source].main[sourceIndex] = [];
      }
      
      connections[edge.source].main[sourceIndex].push({
        node: edge.target,
        type: 'main',
        index: targetIndex
      });
    });
    
    return {
      nodes: n8nNodes,
      connections
    };
  },
  
  callWebhook: async (url, data) => {
    try {
      // Save webhook call information
      set({ lastWebhookCall: { url, data } });
      
      // Make the actual API call
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      return await response.json();
    } catch (error) {
      console.error('Error calling webhook:', error);
      return { error: 'Failed to call webhook' };
    }
  }
}));
