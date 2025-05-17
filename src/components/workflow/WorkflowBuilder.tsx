
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { 
  ReactFlow, 
  MiniMap, 
  Controls, 
  Background, 
  addEdge, 
  Connection, 
  useReactFlow,
  Panel,
  MarkerType,
  NodeTypes,
  EdgeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import WorkflowNode from './WorkflowNode';
import ButtonEdge from './ButtonEdge';
import { initialEdges, initialNodes, nodeCategories } from './initialData';
import NodeCatalog from './NodeCatalog';
import WorkflowTools from './WorkflowTools';
import { useToast } from '@/hooks/use-toast';
import { useWorkflowStore } from './workflowStore';
import NodeSettingsDrawer from './NodeSettingsDrawer';
import ImportWorkflowDialog from './ImportWorkflowDialog';
import CredentialsDialog from './CredentialsDialog';
import WebhookDialog from './WebhookDialog';
import { Button } from '@/components/ui/button'; // Import the Button component

// Define node types
const nodeTypes: NodeTypes = {
  custom: WorkflowNode,
};

// Define edge types
const edgeTypes: EdgeTypes = {
  buttonedge: ButtonEdge,
};

const WorkflowBuilder: React.FC = () => {
  const toast = useToast();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  // Use store instead of useState hooks
  const {
    nodes, 
    edges, 
    setNodes, 
    setEdges,
    openWebhookSettings,
  } = useWorkflowStore();
  
  // Initialize with sample data if empty
  useEffect(() => {
    if (nodes.length === 0) {
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [nodes.length, setNodes, setEdges]);
  
  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds: any) => {
      return nds.map((node: any) => {
        const change = changes.find((c: any) => c.id === node.id);
        if (change?.type === 'position' && change?.position) {
          return { ...node, position: change.position };
        }
        return node;
      });
    });
  }, [setNodes]);
  
  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds: any) => {
      const edgesToDelete = changes.filter((c: any) => c.type === 'remove').map((c: any) => c.id);
      if (edgesToDelete.length > 0) {
        return eds.filter((e: any) => !edgesToDelete.includes(e.id));
      }
      return eds;
    });
  }, [setEdges]);
  
  const onConnect = useCallback((connection: Connection) => {
    const newEdge = {
      ...connection,
      type: 'buttonedge',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    setEdges((eds: any) => addEdge(newEdge, eds));
    
    toast.toast({
      title: "Connection Created",
      description: "Nodes have been connected successfully."
    });
  }, [setEdges, toast]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      if (!reactFlowBounds || !reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: {
          ...nodeData,
          id: `node-${Date.now()}`,
        }
      };

      setNodes((nds: any) => [...nds, newNode]);
      
      toast.toast({
        title: "Node Added",
        description: `${nodeData.label} node has been added to the workflow.`
      });
    },
    [reactFlowInstance, setNodes, toast]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onSaveWorkflow = () => {
    const workflow = useWorkflowStore.getState().exportWorkflow();
    localStorage.setItem('n8n-workflow', JSON.stringify(workflow));
    console.log('Saving workflow:', workflow);
    toast.toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved to local storage."
    });
  };

  const onClearWorkflow = () => {
    if (window.confirm("Are you sure you want to clear the workflow? All nodes and connections will be removed.")) {
      setNodes([]);
      setEdges([]);
      toast.toast({
        title: "Workflow Cleared",
        description: "All nodes and edges have been removed."
      });
    }
  };

  const onAutoLayout = () => {
    // Simple auto layout - arrange nodes in a grid
    const newNodes = [...nodes];
    const nodeCountSqrt = Math.ceil(Math.sqrt(newNodes.length));
    
    newNodes.forEach((node, index) => {
      const row = Math.floor(index / nodeCountSqrt);
      const col = index % nodeCountSqrt;
      
      node.position = {
        x: col * 300 + 50,
        y: row * 200 + 50,
      };
    });
    
    setNodes(newNodes);
    toast.toast({
      title: "Auto Layout Applied",
      description: "Nodes have been organized in a grid layout."
    });
  };

  return (
    <div className="h-full w-full grid grid-cols-4 gap-4">
      <div className="col-span-1 h-full overflow-hidden">
        <NodeCatalog categories={nodeCategories} onDragStart={onDragStart} />
      </div>
      <div className="col-span-3 h-full border rounded-md overflow-hidden bg-workflow-bg" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          deleteKeyCode={['Backspace', 'Delete']}
        >
          <Controls />
          <MiniMap zoomable pannable />
          <Background />
          
          <Panel position="top-center">
            <WorkflowTools 
              onSave={onSaveWorkflow}
              onClear={onClearWorkflow} 
              onLayout={onAutoLayout}
            />
          </Panel>
          
          <Panel position="bottom-center" className="p-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white"
              onClick={openWebhookSettings}
            >
              Webhook Settings
            </Button>
          </Panel>
        </ReactFlow>
      </div>
      
      {/* Modals and Dialogs */}
      <NodeSettingsDrawer />
      <ImportWorkflowDialog />
      <CredentialsDialog />
      <WebhookDialog />
    </div>
  );
};

export default WorkflowBuilder;
