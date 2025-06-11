
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
import { Bot, MessageSquarePlus, Settings, History, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ChatSidebar() {
  const { toast } = useToast();

  const handleNewChat = () => {
    // Clear the current chat or start a new one
    window.location.reload();
    toast({
      title: "New Chat Started",
      description: "Ready for a fresh conversation!",
    });
  };

  const handleClearHistory = () => {
    toast({
      title: "Clear History",
      description: "Chat history clearing functionality to be implemented.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings panel coming soon!",
    });
  };
  
  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Bot className="h-7 w-7 text-primary" />
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">FlowHero</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleNewChat} className="w-full justify-start" tooltip="New Chat">
              <MessageSquarePlus />
              <span>New Chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleClearHistory} className="w-full justify-start" tooltip="Clear History">
              <Trash2 />
              <span>Clear History</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-4 px-2">
          <h3 className="mb-2 text-xs font-medium text-muted-foreground group-data-[collapsible=icon]:hidden">
            Chat History
          </h3>
          <div className="text-sm text-muted-foreground group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
             <History className="h-5 w-5 group-data-[collapsible=icon]:block hidden mb-2" />
            <span className="group-data-[collapsible=icon]:hidden">Your conversations will appear here.</span>
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSettings} className="w-full justify-start" tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
