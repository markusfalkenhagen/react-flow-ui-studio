import React, { useState, useEffect } from "react";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useWorkflowStore } from "./workflowStore";
import { useToast } from "@/hooks/use-toast";
import { Save, X } from "lucide-react";

const NodeSettingsDrawer = () => {
  const { showNodeSettings, selectedNodeId, nodes, closeNodeSettings, updateNodeData } = useWorkflowStore();
  const [nodeData, setNodeData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();

  useEffect(() => {
    if (selectedNodeId) {
      const node = nodes.find(n => n.id === selectedNodeId);
      if (node) {
        setNodeData({ ...node.data });
      }
    }
  }, [selectedNodeId, nodes, showNodeSettings]);

  const handleSave = () => {
    if (!selectedNodeId || !nodeData) return;
    
    updateNodeData(selectedNodeId, nodeData);
    closeNodeSettings();
    
    toast({
      title: "Node Updated",
      description: "Node settings have been saved successfully"
    });
  };

  const handleChange = (field: string, value: any) => {
    setNodeData(prev => ({ ...prev, [field]: value }));
  };

  const handleParameterChange = (index: number, field: string, value: any) => {
    if (!nodeData.parameters) return;
    
    const updatedParams = [...(nodeData.parameters || [])];
    updatedParams[index] = { ...updatedParams[index], [field]: value };
    
    setNodeData(prev => ({
      ...prev,
      parameters: updatedParams,
    }));
  };

  if (!showNodeSettings || !nodeData) return null;

  return (
    <Drawer open={showNodeSettings} onOpenChange={open => !open && closeNodeSettings()}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b">
          <DrawerTitle className="flex items-center gap-2">
            <span className="font-bold">Node Settings:</span> 
            <span className="font-normal">{nodeData.label}</span>
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 py-3">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="parameters">Parameters</TabsTrigger>
              <TabsTrigger value="credentials">Credentials</TabsTrigger>
              {nodeData.nodeType === "trigger" && (
                <TabsTrigger value="webhook">Webhook</TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="details">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="label">Node Name</Label>
                  <Input
                    id="label"
                    value={nodeData.label || ""}
                    onChange={e => handleChange("label", e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={nodeData.description || ""}
                    onChange={e => handleChange("description", e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="disabled"
                    checked={!!nodeData.disabled}
                    onCheckedChange={checked => handleChange("disabled", checked)}
                  />
                  <Label htmlFor="disabled">Disable Node</Label>
                </div>
                
                {nodeData.type && (
                  <div className="grid gap-2">
                    <Label htmlFor="type">Node Type</Label>
                    <Input
                      id="type"
                      value={nodeData.type || ""}
                      readOnly
                      disabled
                    />
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="parameters">
              <div className="space-y-6">
                <h3 className="text-sm font-medium">Node Parameters</h3>
                
                {(!nodeData.parameters || nodeData.parameters.length === 0) ? (
                  <div className="text-muted-foreground text-sm">No parameters for this node.</div>
                ) : (
                  <div className="space-y-6">
                    {(nodeData.parameters || []).map((param: any, index: number) => (
                      <div key={index} className="p-4 border rounded-md space-y-3">
                        <div className="grid gap-2">
                          <Label htmlFor={`param-${index}-name`}>{param.name}</Label>
                          {param.type === "text" ? (
                            <Textarea
                              id={`param-${index}-value`}
                              value={param.value !== undefined ? param.value : param.defaultValue || ""}
                              onChange={e => handleParameterChange(index, "value", e.target.value)}
                              placeholder={`Enter ${param.name}...`}
                              className="min-h-[100px]"
                            />
                          ) : (
                            <Input
                              id={`param-${index}-value`}
                              value={param.value !== undefined ? param.value : param.defaultValue || ""}
                              onChange={e => handleParameterChange(index, "value", e.target.value)}
                              placeholder={`Enter ${param.name}...`}
                              type={param.type === "number" ? "number" : "text"}
                            />
                          )}
                          <p className="text-xs text-muted-foreground">Type: {param.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="credentials">
              {nodeData.credentials ? (
                <div className="space-y-4">
                  {Object.entries(nodeData.credentials).map(([key, value]: [string, any]) => (
                    <div key={key} className="border p-4 rounded-md">
                      <Label className="mb-2 block">{key}</Label>
                      <div className="flex items-center justify-between gap-2">
                        <Input value={value.name} disabled />
                        <Button variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">No credentials for this node.</div>
              )}
              
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  Add Credential
                </Button>
              </div>
            </TabsContent>
            
            {nodeData.nodeType === "trigger" && (
              <TabsContent value="webhook">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="webhookPath">Webhook Path</Label>
                    <Input
                      id="webhookPath"
                      value={nodeData.webhookPath || ""}
                      onChange={e => handleChange("webhookPath", e.target.value)}
                      placeholder="e.g., my-webhook"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label>Webhook URL</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={`${window.location.origin}/webhook/${nodeData.webhookPath || ""}`}
                        readOnly
                      />
                      <Button 
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/webhook/${nodeData.webhookPath || ""}`);
                          toast({ title: "Copied to clipboard" });
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">This URL can be used to trigger the workflow.</p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted rounded-md">
                    <h4 className="font-medium mb-2">Test Webhook</h4>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        const testUrl = `${window.location.origin}/webhook/${nodeData.webhookPath || ""}`;
                        const testData = { test: true, timestamp: new Date().toISOString() };
                        
                        // Call the webhook
                        useWorkflowStore.getState().callWebhook(testUrl, testData)
                          .then(response => {
                            toast({
                              title: "Webhook Test Successful",
                              description: "The webhook was called successfully."
                            });
                          })
                          .catch(error => {
                            toast({
                              title: "Webhook Test Failed",
                              description: "Failed to call webhook. Check console for details.",
                              variant: "destructive"
                            });
                          });
                      }}
                    >
                      Test Webhook
                    </Button>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
        
        <DrawerFooter className="border-t">
          <div className="flex justify-between w-full">
            <DrawerClose asChild>
              <Button variant="outline" className="gap-1">
                <X className="h-4 w-4" /> Cancel
              </Button>
            </DrawerClose>
            <Button className="gap-1" onClick={handleSave}>
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NodeSettingsDrawer;
