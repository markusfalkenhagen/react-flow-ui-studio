
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { NodeData } from './NodeTypes';

const WorkflowNode = ({ data, isConnectable, selected }: NodeProps<NodeData>) => {
  const nodeClass = `${data.nodeType}-node`;

  return (
    <div className={`bg-white rounded-md shadow-sm border ${nodeClass} ${selected ? 'border-workflow-node-selected border-2' : 'border-workflow-node-border'}`}>
      <div className="p-3">
        <div className="flex items-center gap-2">
          {data.icon && <div className="w-5 h-5 flex-shrink-0">{data.icon}</div>}
          <div className="font-medium truncate">{data.label}</div>
        </div>
        {data.description && <div className="text-xs text-gray-500 mt-1">{data.description}</div>}
      </div>
      
      <div className="p-3 border-t border-gray-100 text-xs text-gray-500">
        <div>Double-click to configure</div>
      </div>
      
      <Handle
        type="target"
        position={Position.Top}
        className="input-handle"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="output-handle"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(WorkflowNode);
