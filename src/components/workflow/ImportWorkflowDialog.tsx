
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useWorkflowStore } from './workflowStore';
import { useToast } from "@/hooks/use-toast";
import { WorkflowData } from "./NodeTypes";

const ImportWorkflowDialog = () => {
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { showImportDialog, closeImportDialog, importWorkflow } = useWorkflowStore();
  const { toast } = useToast();

  const handleImport = () => {
    try {
      setError(null);
      if (!jsonText.trim()) {
        setError('Please enter valid JSON workflow data');
        return;
      }
      
      const workflow: WorkflowData = JSON.parse(jsonText);
      
      if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
        setError('Invalid workflow format: missing or invalid nodes array');
        return;
      }
      
      // Import the workflow
      importWorkflow(workflow);
      
      // Close dialog and show success message
      closeImportDialog();
      toast({
        title: "Workflow Imported",
        description: `Successfully imported workflow with ${workflow.nodes.length} nodes`
      });
      
    } catch (err) {
      console.error("Error importing workflow:", err);
      setError(`Failed to parse JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJsonText(text);
    } catch (err) {
      toast({
        title: "Clipboard Error",
        description: "Failed to paste from clipboard. Please paste manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={showImportDialog} onOpenChange={open => !open && closeImportDialog()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Workflow</DialogTitle>
          <DialogDescription>
            Paste your n8n workflow JSON to import it into the builder.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePaste}
              className="mb-2"
            >
              Paste from Clipboard
            </Button>
          </div>
          
          <Textarea 
            value={jsonText} 
            onChange={(e) => setJsonText(e.target.value)}
            rows={15}
            className="font-mono text-sm"
            placeholder='Paste JSON workflow here...'
          />
          
          {error && (
            <div className="text-sm text-red-500 mt-2">{error}</div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={closeImportDialog}>
            Cancel
          </Button>
          <Button onClick={handleImport}>Import Workflow</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportWorkflowDialog;
