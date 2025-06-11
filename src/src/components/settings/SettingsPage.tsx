
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/src/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Key, 
  Bot, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Save,
  TestTube,
  Globe,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface APISettings {
  openaiApiKey: string;
  anthropicApiKey: string;
  geminiApiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
}

interface AgentSettings {
  plannerEnabled: boolean;
  designerEnabled: boolean;
  implementerEnabled: boolean;
  qaEnabled: boolean;
  maxSteps: number;
  parallelExecution: boolean;
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('api');
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<Record<string, 'connected' | 'error' | 'testing'>>({});
  const { toast } = useToast();

  const apiForm = useForm<APISettings>({
    defaultValues: {
      openaiApiKey: '',
      anthropicApiKey: '',
      geminiApiKey: '',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2048
    }
  });

  const agentForm = useForm<AgentSettings>({
    defaultValues: {
      plannerEnabled: true,
      designerEnabled: true,
      implementerEnabled: true,
      qaEnabled: true,
      maxSteps: 10,
      parallelExecution: false
    }
  });

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const testConnection = async (provider: string, apiKey: string) => {
    setConnectionStatus(prev => ({ ...prev, [provider]: 'testing' }));
    
    // Simulate API test
    setTimeout(() => {
      const isValid = apiKey.length > 10; // Simple validation
      setConnectionStatus(prev => ({ 
        ...prev, 
        [provider]: isValid ? 'connected' : 'error' 
      }));
    }, 2000);
  };

  const onSaveApiSettings = async (data: APISettings) => {
    setIsLoading(true);
    
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: "API configuration has been updated successfully.",
      });
    }, 1000);
  };

  const onSaveAgentSettings = async (data: AgentSettings) => {
    setIsLoading(true);
    
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Agent Settings Updated",
        description: "Multi-agent workflow configuration has been saved.",
      });
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'testing':
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <TestTube className="h-4 w-4 text-blue-500" />
          </motion.div>
        );
      default:
        return <Globe className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-background to-background/95 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Settings className="h-8 w-8 text-primary" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
              />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                FlowHero Settings
              </h1>
              <p className="text-muted-foreground">
                Configure your AI agents and API connections
              </p>
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-muted/50 to-muted backdrop-blur-sm">
              <TabsTrigger 
                value="api" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-primary/5"
              >
                <Key className="h-4 w-4" />
                API Configuration
              </TabsTrigger>
              <TabsTrigger 
                value="agents" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-primary/5"
              >
                <Bot className="h-4 w-4" />
                Agent Settings
              </TabsTrigger>
              <TabsTrigger 
                value="advanced" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/10 data-[state=active]:to-primary/5"
              >
                <Shield className="h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="api" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Keys & Model Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...apiForm}>
                    <form onSubmit={apiForm.handleSubmit(onSaveApiSettings)} className="space-y-6">
                      {[
                        { name: 'openaiApiKey', label: 'OpenAI API Key', provider: 'openai' },
                        { name: 'anthropicApiKey', label: 'Anthropic API Key', provider: 'anthropic' },
                        { name: 'geminiApiKey', label: 'Google Gemini API Key', provider: 'gemini' }
                      ].map((field) => (
                        <FormField
                          key={field.name}
                          control={apiForm.control}
                          name={field.name as keyof APISettings}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel className="flex items-center justify-between">
                                {field.label}
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(connectionStatus[field.provider] || '')}
                                  <Badge variant="outline" className="text-xs">
                                    {connectionStatus[field.provider] || 'not tested'}
                                  </Badge>
                                </div>
                              </FormLabel>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input
                                    type={showApiKeys[field.name] ? 'text' : 'password'}
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    {...formField}
                                    className="flex-1"
                                  />
                                </FormControl>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => toggleApiKeyVisibility(field.name)}
                                >
                                  {showApiKeys[field.name] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => testConnection(field.provider, formField.value)}
                                  disabled={!formField.value || connectionStatus[field.provider] === 'testing'}
                                >
                                  <TestTube className="h-4 w-4" />
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={apiForm.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Default Model</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select model" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                                  <SelectItem value="claude-3">Claude 3</SelectItem>
                                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={apiForm.control}
                          name="temperature"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Temperature</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="2"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Controls randomness (0.0 = focused, 2.0 = creative)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={apiForm.control}
                          name="maxTokens"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Tokens</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  max="8000"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Maximum response length
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Zap className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Save API Settings
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    Multi-Agent Workflow Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...agentForm}>
                    <form onSubmit={agentForm.handleSubmit(onSaveAgentSettings)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { name: 'plannerEnabled', label: 'Planner Agent', description: 'Analyzes requests and creates execution plans' },
                          { name: 'designerEnabled', label: 'UI Designer Agent', description: 'Designs interfaces and user experience' },
                          { name: 'implementerEnabled', label: 'Implementation Agent', description: 'Writes code and implements features' },
                          { name: 'qaEnabled', label: 'Quality Assurance Agent', description: 'Reviews and optimizes code quality' }
                        ].map((agent) => (
                          <FormField
                            key={agent.name}
                            control={agentForm.control}
                            name={agent.name as keyof AgentSettings}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base font-medium">
                                    {agent.label}
                                  </FormLabel>
                                  <FormDescription className="text-sm">
                                    {agent.description}
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={field.value as boolean}
                                      onChange={field.onChange}
                                      className="h-4 w-4"
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={agentForm.control}
                          name="maxSteps"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Workflow Steps</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  max="20"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Limits the number of steps in agent workflows
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={agentForm.control}
                          name="parallelExecution"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base font-medium">
                                  Parallel Execution
                                </FormLabel>
                                <FormDescription className="text-sm">
                                  Allow agents to work simultaneously
                                </FormDescription>
                              </div>
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value as boolean}
                                  onChange={field.onChange}
                                  className="h-4 w-4"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="mr-2"
                          >
                            <Zap className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <Save className="h-4 w-4 mr-2" />
                        )}
                        Save Agent Settings
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 bg-gradient-to-br from-card/80 to-card backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Advanced Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Advanced Settings</h3>
                      <p className="text-muted-foreground">
                        Additional configuration options will be available here
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
