
import React, { useState } from 'react';
import { ChatArea } from '@/src/components/chat/ChatArea';
import { ChatSidebar } from '@/src/components/chat/ChatSidebar';
import { Header } from '@/src/components/layout/Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { WorkflowView } from '@/src/components/workflow/WorkflowView';
import { CanvasView } from '@/src/components/canvas/CanvasView';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Layers, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [rightPanelMode, setRightPanelMode] = useState<'workflow' | 'canvas'>('workflow');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
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
                <div className="h-full flex flex-col">
                  {/* Professional Mode Switcher */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex rounded-lg border bg-background p-1 shadow-sm">
                        <Button
                          variant={rightPanelMode === 'workflow' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setRightPanelMode('workflow')}
                          className={`h-8 text-xs ${rightPanelMode === 'workflow' ? 'shadow-sm' : ''}`}
                        >
                          <Bot className="h-3 w-3 mr-2" />
                          Workflow
                        </Button>
                        <Button
                          variant={rightPanelMode === 'canvas' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setRightPanelMode('canvas')}
                          className={`h-8 text-xs ${rightPanelMode === 'canvas' ? 'shadow-sm' : ''}`}
                        >
                          <Layers className="h-3 w-3 mr-2" />
                          Canvas
                        </Button>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {rightPanelMode === 'workflow' ? 'AI Processing' : 'Design Mode'}
                    </Badge>
                  </motion.div>
                  
                  {/* Panel Content */}
                  <div className="flex-1">
                    {rightPanelMode === 'workflow' ? <WorkflowView /> : <CanvasView />}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
