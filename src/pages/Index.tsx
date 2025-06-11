
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
                <div className="h-full flex flex-col">
                  {/* Mode Switcher */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border-b bg-gradient-to-r from-background to-background/95 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex rounded-lg border bg-muted p-1">
                        <Button
                          variant={rightPanelMode === 'workflow' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setRightPanelMode('workflow')}
                          className={rightPanelMode === 'workflow' ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' : ''}
                        >
                          <Bot className="h-4 w-4 mr-2" />
                          Workflow
                        </Button>
                        <Button
                          variant={rightPanelMode === 'canvas' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setRightPanelMode('canvas')}
                          className={rightPanelMode === 'canvas' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : ''}
                        >
                          <Layers className="h-4 w-4 mr-2" />
                          Canvas
                        </Button>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700">
                      {rightPanelMode === 'workflow' ? 'AI Agents Active' : 'Creative Mode'}
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
