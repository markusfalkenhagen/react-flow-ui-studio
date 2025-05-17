
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Badge } from '@/components/ui/badge';
import { useWorkflowStore } from './workflowStore';
import { Settings } from 'lucide-react';
import { NodeData } from './NodeTypes';

// Define the WorkflowNode component
const WorkflowNode = ({ data, isConnectable, selected }: NodeProps<NodeData>) => {
  const { openNodeSettings } = useWorkflowStore();
  const nodeType = data?.nodeType || 'action';
  const disabled = data?.disabled || false;
  
  // Create a settings click handler
  const onSettingsClick = () => {
    if (data?.id) {
      openNodeSettings(data.id);
    }
  };
  
  return (
    <div className={`relative p-4 shadow-md rounded-lg ${selected ? 'ring-2 ring-blue-500' : ''} 
      ${disabled ? 'opacity-60' : ''} 
      ${nodeType === 'trigger' ? 'bg-blue-50 border-blue-200' : 
        nodeType === 'helper' ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'} 
      border-2`}
    >
      {/* Left handle for inputs */}
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      
      {/* Right handle for outputs */}
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      
      <div className="flex items-center justify-between mb-2">
        <Badge variant={nodeType === 'trigger' ? 'default' : nodeType === 'helper' ? 'secondary' : 'outline'} className="text-xs">
          {data?.nodeType || 'Node'}
        </Badge>
        
        <button 
          onClick={onSettingsClick}
          className="w-6 h-6 rounded hover:bg-gray-100 flex items-center justify-center"
          title="Node Settings"
        >
          <Settings size={14} />
        </button>
      </div>
      
      <div className="font-medium text-sm mb-2">{data?.label || 'Node'}</div>
      
      {/* Show description if available */}
      {data?.description && (
        <div className="text-xs text-gray-500 mt-1 mb-2">{data.description}</div>
      )}
      
      {/* Show node type and version */}
      {data?.type && (
        <div className="flex flex-col gap-1 mt-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Type:</span>
            <span className="font-mono bg-gray-100 px-1 rounded">{data.type}</span>
          </div>
          {data?.typeVersion && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Version:</span>
              <span className="font-mono bg-gray-100 px-1 rounded">{data.typeVersion}</span>
            </div>
          )}
        </div>
      )}
      
      {/* Show webhook path if available */}
      {data?.webhookPath && (
        <div className="flex flex-col gap-1 mt-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Webhook:</span>
            <span className="font-mono bg-gray-100 px-1 rounded truncate max-w-[120px]">{data.webhookPath}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(WorkflowNode);
