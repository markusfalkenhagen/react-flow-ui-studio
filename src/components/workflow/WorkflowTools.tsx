
import { Button } from '@/components/ui/button';
import { 
  Save, 
  X, 
  Upload, 
  Download, 
  Settings 
} from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useWorkflowStore } from './workflowStore';
import { useToast } from "@/hooks/use-toast";

interface WorkflowToolsProps {
  onSave: () => void;
  onClear: () => void;
  onLayout: () => void;
}

const WorkflowTools: React.FC<WorkflowToolsProps> = ({ onSave, onClear, onLayout }) => {
  const { openImportDialog, exportWorkflow, openCredentialSettings } = useWorkflowStore();
  const { toast } = useToast();

  const handleExport = () => {
    const workflow = exportWorkflow();
    const dataStr = JSON.stringify(workflow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `workflow-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Workflow Exported",
      description: `Successfully exported workflow JSON`
    });
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 bg-white border border-border p-2 rounded-md shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-2" />
              <span>Save</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save workflow</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={openImportDialog}>
              <Upload className="h-4 w-4 mr-2" />
              <span>Import</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Import workflow from JSON</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              <span>Export</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export workflow to JSON</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={onLayout}>
              <Settings className="h-4 w-4 mr-2" />
              <span>Layout</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Auto-arrange workflow nodes</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" onClick={openCredentialSettings}>
              <Settings className="h-4 w-4 mr-2" />
              <span>Credentials</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Manage credentials</TooltipContent>
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
