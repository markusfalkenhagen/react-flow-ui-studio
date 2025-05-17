
import { useEffect } from "react";
import WorkflowBuilder from "@/components/workflow/WorkflowBuilder";
import { Toaster } from "@/components/ui/toaster";
import { useWorkflowStore } from "@/components/workflow/workflowStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { openImportDialog } = useWorkflowStore();

  // Check for URL parameters that might contain a workflow JSON to import
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const workflowParam = urlParams.get('workflow');
    
    if (workflowParam) {
      try {
        // We found a workflow in the URL, attempt to parse it
        const workflow = JSON.parse(decodeURIComponent(workflowParam));
        
        // Open import dialog with the workflow data
        if (workflow.nodes) {
          localStorage.setItem('pending-workflow-import', JSON.stringify(workflow));
          openImportDialog();
          
          // Clear the URL parameter to avoid reimporting on refresh
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }
      } catch (error) {
        console.error("Failed to parse workflow from URL", error);
      }
    }
    
    // Also check local storage for saved workflows
    const savedWorkflow = localStorage.getItem('n8n-workflow');
    if (savedWorkflow && !workflowParam) {
      try {
        const workflow = JSON.parse(savedWorkflow);
        if (workflow.nodes && workflow.nodes.length > 0) {
          // We'll import this automatically if we have no URL parameter
          useWorkflowStore.getState().importWorkflow(workflow);
        }
      } catch (error) {
        console.error("Failed to parse saved workflow", error);
      }
    }
  }, [openImportDialog]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-left">n8n Workflow Builder</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={openImportDialog}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Import Workflow
              </button>
              <a 
                href="https://docs.n8n.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Documentation
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto p-4">
        <Tabs defaultValue="builder" className="mb-4">
          <TabsList>
            <TabsTrigger value="builder">Visual Builder</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="mt-2">
            <div className="h-[calc(100vh-12rem)]">
              <WorkflowBuilder />
            </div>
          </TabsContent>
          
          <TabsContent value="webhooks" className="mt-2">
            <div className="p-6 bg-white rounded-lg border h-[calc(100vh-12rem)] overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Webhook Management</h2>
              <p className="text-gray-600 mb-4">
                Manage your webhooks and test them directly from this interface.
                You can create webhook nodes in the workflow builder and configure them here.
              </p>
              
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => useWorkflowStore.getState().openWebhookSettings()}
              >
                Open Webhook Manager
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="credentials" className="mt-2">
            <div className="p-6 bg-white rounded-lg border h-[calc(100vh-12rem)] overflow-auto">
              <h2 className="text-xl font-semibold mb-4">Credential Management</h2>
              <p className="text-gray-600 mb-4">
                Securely manage your API keys and credentials for integration services.
                All credentials are stored locally on your device and never sent to our servers.
              </p>
              
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                onClick={() => useWorkflowStore.getState().openCredentialSettings()}
              >
                Open Credential Manager
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Toaster />
    </div>
  );
};

export default Index;
