
"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Bot, MessageSquarePlus, Settings, History, Home } from "lucide-react"; // Added Home
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export function ChatSidebar() {
  const { toast } = useToast();
  const router = useRouter();

  const handleNewChat = () => {
    toast({
      title: "New Chat",
      description: "Legacy chat functionality. FlowHero's main interface is task-based.",
    });
     // If you want to navigate to a new chat page, for example:
     // router.push('/chat/new'); 
     // For now, we assume the main page is the primary interaction.
  };

  const handleNavigateToSettings = () => {
    router.push('/settings');
  };

  const handleNavigateHome = () => {
    router.push('/');
  };
  
  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Bot className="h-7 w-7 text-primary" />
          <span className="text-lg font-semibold font-headline group-data-[collapsible=icon]:hidden">FlowHero</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleNavigateHome} className="w-full justify-start" tooltip="Home / New Task">
              <Home /> 
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton onClick={handleNewChat} className="w-full justify-start" tooltip="Legacy Chat (Example)">
              <MessageSquarePlus />
              <span>Old Chat UI</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 px-2">
          <h3 className="mb-2 text-xs font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
            Task History
          </h3>
          <div className="text-sm text-muted-foreground group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
             <History className="h-5 w-5 group-data-[collapsible=icon]:block hidden mb-2" />
            <span className="group-data-[collapsible=icon]:hidden">Your task history will appear here.</span>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleNavigateToSettings} className="w-full justify-start" tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
