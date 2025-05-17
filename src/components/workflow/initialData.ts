
import { Edge, MarkerType, Node } from '@xyflow/react';
import { NodeCategory, NodeData } from './NodeTypes';

// Sample node categories and nodes for the node catalog
export const nodeCategories: NodeCategory[] = [
  {
    id: 'triggers',
    name: 'Triggers',
    nodes: [
      { 
        label: 'When Webhook Received', 
        description: 'Triggers when a webhook is called',
        nodeType: 'trigger',
        outputs: [{ name: 'output' }],
        parameters: [
          { name: 'webhook_url', type: 'string' }
        ]
      },
      { 
        label: 'Scheduled Trigger', 
        description: 'Runs on a schedule',
        nodeType: 'trigger',
        outputs: [{ name: 'output' }],
        parameters: [
          { name: 'cron', type: 'string', defaultValue: '0 0 * * *' }
        ] 
      },
      { 
        label: 'Email Received', 
        description: 'Triggers when an email is received',
        nodeType: 'trigger',
        outputs: [{ name: 'output' }],
        parameters: [
          { name: 'email_account', type: 'string' }
        ]
      },
    ]
  },
  {
    id: 'actions',
    name: 'Actions',
    nodes: [
      { 
        label: 'Send Email', 
        description: 'Sends an email',
        nodeType: 'action',
        inputs: [{ name: 'input' }],
        outputs: [{ name: 'output' }],
        parameters: [
          { name: 'to', type: 'string' },
          { name: 'subject', type: 'string' },
          { name: 'body', type: 'text' }
        ]
      },
      { 
        label: 'HTTP Request', 
        description: 'Makes an HTTP request',
        nodeType: 'action',
        inputs: [{ name: 'input' }],
        outputs: [{ name: 'output' }],
        parameters: [
          { name: 'url', type: 'string' },
          { name: 'method', type: 'select', defaultValue: 'GET' }
        ]
      },
      { 
        label: 'Update Database', 
        description: 'Updates a database record',
        nodeType: 'action',
        inputs: [{ name: 'input' }],
        outputs: [{ name: 'output' }],
        parameters: [
          { name: 'table', type: 'string' },
          { name: 'data', type: 'json' }
        ]
      },
    ]
  },
  {
    id: 'helpers',
    name: 'Helpers',
    nodes: [
      { 
        label: 'Filter Data', 
        description: 'Filters data based on conditions',
        nodeType: 'helper',
        inputs: [{ name: 'input' }],
        outputs: [{ name: 'true' }, { name: 'false' }],
        parameters: [
          { name: 'condition', type: 'expression' }
        ]
      },
      { 
        label: 'Transform Data', 
        description: 'Transforms data structure',
        nodeType: 'helper',
        inputs: [{ name: 'input' }],
        outputs: [{ name: 'output' }],
        parameters: [
          { name: 'transformation', type: 'json' }
        ]
      },
      { 
        label: 'Delay', 
        description: 'Adds a delay between steps',
        nodeType: 'helper',
        inputs: [{ name: 'input' }],
        outputs: [{ name: 'output' }],
        parameters: [
          { name: 'delay_seconds', type: 'number', defaultValue: 5 }
        ]
      },
    ]
  }
];

// Initial nodes for the workflow
export const initialNodes: Node<NodeData>[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: {
      label: 'When Webhook Received',
      description: 'Triggers when a webhook is called',
      nodeType: 'trigger',
      outputs: [{ name: 'output' }],
      parameters: [
        { name: 'webhook_url', type: 'string' }
      ]
    },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 250 },
    data: {
      label: 'Filter Data',
      description: 'Filters data based on conditions',
      nodeType: 'helper',
      inputs: [{ name: 'input' }],
      outputs: [{ name: 'true' }, { name: 'false' }],
      parameters: [
        { name: 'condition', type: 'expression' }
      ]
    },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 100, y: 400 },
    data: {
      label: 'Send Email',
      description: 'Sends an email',
      nodeType: 'action',
      inputs: [{ name: 'input' }],
      outputs: [{ name: 'output' }],
      parameters: [
        { name: 'to', type: 'string' },
        { name: 'subject', type: 'string' },
        { name: 'body', type: 'text' }
      ]
    },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 400, y: 400 },
    data: {
      label: 'HTTP Request',
      description: 'Makes an HTTP request',
      nodeType: 'action',
      inputs: [{ name: 'input' }],
      outputs: [{ name: 'output' }],
      parameters: [
        { name: 'url', type: 'string' },
        { name: 'method', type: 'select', defaultValue: 'GET' }
      ]
    },
  }
];

// Initial edges for the workflow
export const initialEdges: Edge[] = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    type: 'buttonedge',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    type: 'buttonedge',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  },
  { 
    id: 'e2-4', 
    source: '2', 
    target: '4', 
    type: 'buttonedge',
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
];
