
import React from "react";
import WorkflowBuilder from "@/components/workflow/WorkflowBuilder";
import { ChatBot } from "@/components/chatbot/ChatBot";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronDown, Plus, Save, Settings } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Index = () => {
  const [showIntroModal, setShowIntroModal] = React.useState(true);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b p-4 bg-background z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">FlowHeroBot</h1>
            <div className="bg-green-500/10 text-green-600 px-2 py-0.5 rounded text-xs font-medium">Beta</div>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Workflows</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Create New Workflow
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Start building your own custom automation workflow from scratch.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">Templates</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Browse pre-built workflow templates for common tasks
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">My Workflows</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Access and manage your saved workflows
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">Web Hooks</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Connect to external services via webhooks
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">Data Processing</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Process and transform data between services
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">AI Workflows</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Integrate AI services into your automation
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">Email Marketing</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Automate your email marketing campaigns
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Documentation
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Learn how to build powerful workflows with our comprehensive documentation.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">Tutorials</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Step-by-step tutorials for building workflows
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none">API Reference</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Technical details for advanced workflow creation
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Workflow
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto p-4">
        <Tabs defaultValue="builder" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="builder">Workflow Builder</TabsTrigger>
              <TabsTrigger value="executions">Executions</TabsTrigger>
              <TabsTrigger value="settings">Workflow Settings</TabsTrigger>
            </TabsList>
            
            <TooltipProvider>
              <div className="flex gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Credential
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Add API keys and connection details
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Test run this workflow
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
          
          <TabsContent value="builder" className="mt-2">
            <div className="h-[calc(100vh-12rem)]">
              <WorkflowBuilder />
            </div>
          </TabsContent>
          
          <TabsContent value="executions" className="mt-2">
            <div className="rounded-lg border p-8 text-center">
              <h3 className="text-xl font-medium mb-2">Execution History</h3>
              <p className="text-muted-foreground">
                View the history of workflow executions and their results here.
              </p>
              <div className="mt-6 text-sm text-muted-foreground">
                No executions found for this workflow. Run your workflow to see results here.
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-2">
            <div className="rounded-lg border p-8">
              <h3 className="text-xl font-medium mb-4">Workflow Settings</h3>
              
              <div className="grid gap-6 max-w-2xl">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Workflow Name</label>
                  <input
                    type="text"
                    placeholder="My Workflow"
                    className="border rounded-md px-3 py-2"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    placeholder="Describe what this workflow does"
                    className="border rounded-md px-3 py-2 min-h-[100px] resize-y"
                  ></textarea>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Schedule</label>
                  <select className="border rounded-md px-3 py-2">
                    <option value="manual">Manual Trigger Only</option>
                    <option value="hourly">Every Hour</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom Schedule</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <Button>
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Chatbot component */}
      <ChatBot />
      
      {/* Welcome modal for first-time users */}
      {showIntroModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Welcome to FlowHeroBot!</h2>
            <p className="mb-4">
              Build powerful automation workflows by connecting triggers, actions, and helpers.
              Drag nodes from the left panel to the canvas and connect them together.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Start with a <span className="text-workflow-node-trigger">trigger node</span> (purple)</li>
              <li>Add <span className="text-workflow-node-action">action nodes</span> (blue) to perform tasks</li>
              <li>Use <span className="text-workflow-node-helper">helper nodes</span> (yellow) to transform data</li>
            </ul>
            <p className="mb-6">
              Need help? Click the chat button at the bottom right to talk with our workflow assistant.
            </p>
            <div className="flex justify-end">
              <Button onClick={() => setShowIntroModal(false)}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
