
import { Button } from '@/components/ui/button';
import { Check, Plus, X } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface WorkflowToolsProps {
  onSave: () => void;
  onClear: () => void;
  onLayout: () => void;
}

const WorkflowTools: React.FC<WorkflowToolsProps> = ({ onSave, onClear, onLayout }) => {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 bg-white border border-border p-2 rounded-md shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={onSave}>
              <Check className="h-4 w-4 mr-2" />
              <span>Save</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save workflow</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={onLayout}>
              <Plus className="h-4 w-4 mr-2" />
              <span>Auto Layout</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Organize nodes automatically</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={onClear} className="text-red-500 hover:text-red-600 hover:border-red-200">
              <X className="h-4 w-4 mr-2" />
              <span>Clear</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear workflow</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default WorkflowTools;
