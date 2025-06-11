
import React from 'react';
import { ChatArea } from '@/src/components/chat/ChatArea';
import { ChatSidebar } from '@/src/components/chat/ChatSidebar';
import { Header } from '@/src/components/layout/Header';
import { SidebarProvider } from '@/components/ui/sidebar';

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ChatSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <ChatArea />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
