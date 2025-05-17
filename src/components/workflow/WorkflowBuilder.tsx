
import React, { useCallback, useRef, useState } from 'react';
import { 
  ReactFlow, 
  Node as ReactFlowNode,
  Edge as ReactFlowEdge,
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge, 
  Connection, 
  useReactFlow,
  Panel,
  MarkerType,
  NodeTypes,
  EdgeTypes
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import WorkflowNode from './WorkflowNode';
import ButtonEdge from './ButtonEdge';
import { NodeData, WorkflowNode as WorkflowNodeType } from './NodeTypes';
import { initialEdges, initialNodes, nodeCategories } from './initialData';
import NodeCatalog from './NodeCatalog';
import WorkflowTools from './WorkflowTools';
import { useToast } from '@/hooks/use-toast';

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
  // Define types explicitly for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState<ReactFlowNode<NodeData>>(initialNodes as ReactFlowNode<NodeData>[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<ReactFlowEdge>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  
  const onConnect = useCallback((connection: Connection) => {
    const newEdge = {
      ...connection,
      type: 'buttonedge',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
    
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
      const nodeDataString = event.dataTransfer.getData('application/reactflow');
      
      if (!reactFlowBounds || !reactFlowInstance || !nodeDataString) return;
      
      const nodeData: NodeData = JSON.parse(nodeDataString);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: ReactFlowNode<NodeData> = {
        id: `node-${Date.now()}`,
        type: 'custom',
        position,
        data: nodeData,
      };

      setNodes((nds) => nds.concat(newNode));
      
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
    const workflow = { nodes, edges };
    console.log('Saving workflow:', workflow);
    toast.toast({
      title: "Workflow Saved",
      description: "Your workflow has been saved successfully."
    });
  };

  const onClearWorkflow = () => {
    setNodes([]);
    setEdges([]);
    toast.toast({
      title: "Workflow Cleared",
      description: "All nodes and edges have been removed."
    });
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
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
