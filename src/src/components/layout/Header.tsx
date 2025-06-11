
"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bot } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Bot className="h-7 w-7 text-primary" />
        <h1 className="text-xl font-semibold">FlowHero Chat</h1>
      </div>
    </header>
  );
}
