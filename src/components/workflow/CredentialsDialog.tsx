
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkflowStore } from './workflowStore';
import { useToast } from "@/hooks/use-toast";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Credential } from './NodeTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CredentialsDialog = () => {
  const { showCredentialSettings, closeCredentialSettings, credentials, addCredential, removeCredential, updateCredential } = useWorkflowStore();
  const [activeTab, setActiveTab] = useState("list");
  const [newCredential, setNewCredential] = useState<Credential>({
    id: '',
    name: '',
    type: '',
    data: {}
  });
  const [credentialFields, setCredentialFields] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleAddCredential = () => {
    if (!newCredential.name || !newCredential.type) {
      toast({
        title: "Validation Error",
        description: "Name and type are required",
        variant: "destructive"
      });
      return;
    }

    // Generate unique ID if not provided
    const credWithId = {
      ...newCredential,
      id: newCredential.id || `cred-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      data: { ...credentialFields }
    };
    
    addCredential(credWithId);
    
    // Reset form
    setNewCredential({
      id: '',
      name: '',
      type: '',
      data: {}
    });
    setCredentialFields({});
    
    // Switch back to list tab
    setActiveTab("list");
    
    toast({
      title: "Credential Added",
      description: `Successfully added ${newCredential.name} credential`
    });
  };

  const handleDeleteCredential = (id: string) => {
    if (window.confirm("Are you sure you want to delete this credential?")) {
      removeCredential(id);
      
      toast({
        title: "Credential Deleted",
        description: "Successfully deleted credential"
      });
    }
  };

  const handleFieldChange = (key: string, value: string) => {
    setCredentialFields(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveToLocalStorage = () => {
    try {
      localStorage.setItem('workflow-credentials', JSON.stringify(credentials));
      toast({
        title: "Credentials Saved",
        description: "Successfully saved credentials to local storage"
      });
    } catch (error) {
      console.error("Error saving credentials to localStorage:", error);
      toast({
        title: "Save Failed",
        description: "Failed to save credentials to local storage",
        variant: "destructive"
      });
    }
  };

  const handleLoadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('workflow-credentials');
      if (saved) {
        const parsedCreds = JSON.parse(saved) as Credential[];
        // Replace all credentials
        parsedCreds.forEach(cred => {
          addCredential(cred);
        });
        
        toast({
          title: "Credentials Loaded",
          description: `Successfully loaded ${parsedCreds.length} credentials from local storage`
        });
      } else {
        toast({
          title: "No Saved Credentials",
          description: "No credentials found in local storage"
        });
      }
    } catch (error) {
      console.error("Error loading credentials from localStorage:", error);
      toast({
        title: "Load Failed",
        description: "Failed to load credentials from local storage",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={showCredentialSettings} onOpenChange={open => !open && closeCredentialSettings()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Credential Settings</DialogTitle>
          <DialogDescription>
            Manage your workflow credentials for API access
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="list">Credential List</TabsTrigger>
              <TabsTrigger value="add">Add New</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              {credentials.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No credentials found. Add some to get started!
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {credentials.map((cred) => (
                    <AccordionItem key={cred.id} value={cred.id}>
                      <AccordionTrigger>
                        <div className="flex items-center">
                          <span className="font-medium">{cred.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">({cred.type})</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          <div className="grid gap-2">
                            <Label>Credential ID</Label>
                            <Input value={cred.id} readOnly />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label>Type</Label>
                            <Input value={cred.type} readOnly />
                          </div>
                          
                          {Object.entries(cred.data).map(([key, value]) => (
                            <div key={key} className="grid gap-2">
                              <Label>{key}</Label>
                              <Input 
                                type={key.toLowerCase().includes('key') || key.toLowerCase().includes('token') || key.toLowerCase().includes('secret') || key.toLowerCase().includes('password') ? 'password' : 'text'} 
                                value={value} 
                                onChange={(e) => {
                                  const newData = { ...cred.data, [key]: e.target.value };
                                  updateCredential(cred.id, { data: newData });
                                }}
                              />
                            </div>
                          ))}
                          
                          <div className="flex justify-end">
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => handleDeleteCredential(cred.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handleLoadFromLocalStorage}
                >
                  Load from Local Storage
                </Button>
                <Button 
                  onClick={handleSaveToLocalStorage}
                >
                  Save to Local Storage
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="add">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={newCredential.name}
                    onChange={(e) => setNewCredential(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My API Credential"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Input 
                    id="type" 
                    value={newCredential.type}
                    onChange={(e) => setNewCredential(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="googleSheetsOAuth2Api"
                  />
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-3">Credential Fields</h4>
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <Input 
                        id="apiKey" 
                        type="password"
                        value={credentialFields.apiKey || ''}
                        onChange={(e) => handleFieldChange('apiKey', e.target.value)}
                        placeholder="Enter API key"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="apiSecret">API Secret</Label>
                      <Input 
                        id="apiSecret" 
                        type="password"
                        value={credentialFields.apiSecret || ''}
                        onChange={(e) => handleFieldChange('apiSecret', e.target.value)}
                        placeholder="Enter API secret"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="accessToken">Access Token</Label>
                      <Input 
                        id="accessToken" 
                        type="password"
                        value={credentialFields.accessToken || ''}
                        onChange={(e) => handleFieldChange('accessToken', e.target.value)}
                        placeholder="Enter access token"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        const fieldName = prompt("Enter field name");
                        if (fieldName) {
                          handleFieldChange(fieldName, '');
                        }
                      }}
                    >
                      Add Custom Field
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          {activeTab === "add" ? (
            <>
              <Button variant="outline" onClick={() => setActiveTab("list")}>
                Cancel
              </Button>
              <Button onClick={handleAddCredential}>
                Add Credential
              </Button>
            </>
          ) : (
            <Button onClick={closeCredentialSettings}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CredentialsDialog;
