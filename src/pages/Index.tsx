
import WorkflowBuilder from "@/components/workflow/WorkflowBuilder";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-left">n8n Workflow Builder</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4">
        <div className="h-[calc(100vh-10rem)]">
          <WorkflowBuilder />
        </div>
      </main>
    </div>
  );
};

export default Index;
