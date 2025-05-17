
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { NodeData } from './NodeTypes';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { settings } from 'lucide-react';
import { useWorkflowStore } from './workflowStore';

const WorkflowNode = ({ data, isConnectable, selected }: NodeProps<NodeData>) => {
  const { openNodeSettings } = useWorkflowStore();
  const nodeClass = `${data.nodeType}-node`;
  const isDisabled = data.disabled;

  const handleDoubleClick = () => {
    openNodeSettings(data.id || '');
  };

  return (
    <div 
      className={`bg-white rounded-md shadow-sm border ${nodeClass} ${selected ? 'border-workflow-node-selected border-2' : 'border-workflow-node-border'} ${isDisabled ? 'opacity-50' : ''}`}
      style={{ width: '220px' }}
      onDoubleClick={handleDoubleClick}
    >
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {data.icon && <div className="w-5 h-5 flex-shrink-0">{data.icon}</div>}
            <div className="font-medium truncate">{data.label}</div>
          </div>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  openNodeSettings(data.id || '');
                }}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <settings className="h-4 w-4 text-gray-500" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto">Settings</HoverCardContent>
          </HoverCard>
        </div>
        
        {data.description && <div className="text-xs text-gray-500 mt-1">{data.description}</div>}
        
        {data.type && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">
              {data.type}
              {data.typeVersion && <span className="ml-1 opacity-70">v{data.typeVersion}</span>}
            </Badge>
          </div>
        )}
        
        {data.webhookPath && (
          <div className="mt-2">
            <Badge variant="outline" className="text-xs bg-blue-50">
              {data.webhookPath}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
        <div>Double-click to configure</div>
        {isDisabled && <Badge variant="destructive" className="text-[10px] h-5">Disabled</Badge>}
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="input-handle"
        isConnectable={isConnectable && !isDisabled}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="output-handle"
        isConnectable={isConnectable && !isDisabled}
      />
    </div>
  );
};

export default memo(WorkflowNode);
