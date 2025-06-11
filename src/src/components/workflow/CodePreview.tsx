
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, FileText, Code2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeFile {
  id: string;
  name: string;
  type: 'tsx' | 'ts' | 'css' | 'json';
  content: string;
  status: 'generated' | 'modified' | 'new';
}

const mockCodeFiles: CodeFile[] = [
  {
    id: '1',
    name: 'WorkflowView.tsx',
    type: 'tsx',
    status: 'new',
    content: `import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WorkflowView() {
  return (
    <div className="h-full flex flex-col border-l bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Multi-Agent Workflow</h2>
      </div>
      {/* Component content */}
    </div>
  );
}`
  },
  {
    id: '2',
    name: 'AgentSteps.tsx',
    type: 'tsx',
    status: 'new',
    content: `import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AgentSteps() {
  return (
    <ScrollArea className="h-full">
      {/* Agent steps visualization */}
    </ScrollArea>
  );
}`
  },
  {
    id: '3',
    name: 'types/index.ts',
    type: 'ts',
    status: 'modified',
    content: `export interface AgentStep {
  id: string;
  agent: string;
  task: string;
  status: 'completed' | 'in-progress' | 'pending' | 'error';
  progress: number;
}`
  }
];

export function CodePreview() {
  const [selectedFile, setSelectedFile] = useState(mockCodeFiles[0]);
  const { toast } = useToast();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([selectedFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "File downloaded",
      description: `${selectedFile.name} has been downloaded.`,
    });
  };

  const getStatusColor = (status: CodeFile['status']) => {
    switch (status) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'modified':
        return 'bg-blue-100 text-blue-800';
      case 'generated':
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getFileIcon = (type: CodeFile['type']) => {
    switch (type) {
      case 'tsx':
      case 'ts':
        return <Code2 className="h-4 w-4" />;
      case 'css':
        return <FileText className="h-4 w-4" />;
      case 'json':
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Generated Code
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleCopyCode}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs orientation="vertical" className="flex h-96">
            <div className="w-48 border-r">
              <ScrollArea className="h-full">
                <div className="p-2 space-y-1">
                  {mockCodeFiles.map((file) => (
                    <button
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`w-full p-2 text-left text-xs rounded hover:bg-accent transition-colors ${
                        selectedFile.id === file.id ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {getFileIcon(file.type)}
                        <span className="font-medium truncate">{file.name}</span>
                      </div>
                      <Badge variant="secondary" className={`${getStatusColor(file.status)} text-xs`}>
                        {file.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            <div className="flex-1">
              <ScrollArea className="h-full">
                <pre className="p-4 text-xs font-mono leading-relaxed">
                  <code>{selectedFile.content}</code>
                </pre>
              </ScrollArea>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
