
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
import { useWorkflowStore } from './workflowStore';
import { useToast } from "@/hooks/use-toast";
import { WebhookData } from './NodeTypes';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const WebhookDialog = () => {
  const { showWebhookSettings, closeWebhookSettings, webhooks, lastWebhookCall } = useWorkflowStore();
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookData | null>(null);
  const [testPayload, setTestPayload] = useState<string>('{\n  "test": true,\n  "timestamp": "' + new Date().toISOString() + '"\n}');
  const { toast } = useToast();

  useEffect(() => {
    if (webhooks.length > 0 && !selectedWebhook) {
      setSelectedWebhook(webhooks[0]);
    }
  }, [webhooks, selectedWebhook]);

  const handleTestWebhook = async (webhook: WebhookData) => {
    try {
      let payload = {};
      try {
        payload = JSON.parse(testPayload);
      } catch (e) {
        toast({
          title: "Invalid JSON",
          description: "Please ensure your test payload is valid JSON",
          variant: "destructive"
        });
        return;
      }
      
      const response = await fetch(webhook.url, {
        method: webhook.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      toast({
        title: "Webhook Test Successful",
        description: "The webhook responded successfully"
      });
      
      console.log("Webhook response:", data);
    } catch (error) {
      console.error("Webhook test error:", error);
      toast({
        title: "Webhook Test Failed",
        description: "There was an error testing the webhook",
        variant: "destructive"
      });
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied to Clipboard",
      description: "Webhook URL copied to clipboard"
    });
  };

  return (
    <Dialog open={showWebhookSettings} onOpenChange={open => !open && closeWebhookSettings()}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Webhook Manager</DialogTitle>
          <DialogDescription>
            View, test, and manage your workflow webhooks
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">Available Webhooks</h3>
          
          {webhooks.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No webhooks available. Add webhook nodes to your workflow!
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell>{webhook.name}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-1 py-0.5 rounded text-xs">
                        {webhook.path}
                      </code>
                    </TableCell>
                    <TableCell>{webhook.method}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleCopyUrl(webhook.url)}
                        >
                          Copy URL
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedWebhook(webhook);
                          }}
                        >
                          Test
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {selectedWebhook && (
            <div className="mt-8 border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Test Webhook: {selectedWebhook.name}</h3>
              
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input value={selectedWebhook.url} readOnly className="flex-1" />
                    <Button 
                      variant="outline" 
                      onClick={() => handleCopyUrl(selectedWebhook.url)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>Test Payload</Label>
                  <Textarea 
                    value={testPayload} 
                    onChange={(e) => setTestPayload(e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => handleTestWebhook(selectedWebhook)}
                  >
                    Send Test Request
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {lastWebhookCall && (
            <div className="mt-8 border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Last Webhook Call</h3>
              
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>URL</Label>
                  <Input value={lastWebhookCall.url} readOnly />
                </div>
                
                <div className="grid gap-2">
                  <Label>Payload</Label>
                  <Textarea 
                    value={JSON.stringify(lastWebhookCall.data, null, 2)} 
                    readOnly
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={closeWebhookSettings}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookDialog;
