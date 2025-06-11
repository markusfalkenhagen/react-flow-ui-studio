
import React from 'react';
import { ChatArea } from '@/src/components/chat/ChatArea';
import { ChatSidebar } from '@/src/components/chat/ChatSidebar';
import { Header } from '@/src/components/layout/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { WorkflowView } from '@/src/components/workflow/WorkflowView';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ChatSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={50} minSize={30}>
                <ChatArea />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={30}>
                <WorkflowView />
              </ResizablePanel>
            </ResizablePanelGroup>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
