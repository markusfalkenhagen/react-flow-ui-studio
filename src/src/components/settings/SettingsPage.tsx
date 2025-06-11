
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
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
  Shield,
  Palette,
  Layers,
  Sparkles,
  Moon,
  Sun,
  Bell,
  Users,
  FileText,
  Download,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface APISettings {
  openaiApiKey: string;
  anthropicApiKey: string;
  geminiApiKey: string;
  model: string;
  temperature: string;
  maxTokens: string;
}

interface AgentSettings {
  plannerEnabled: boolean;
  designerEnabled: boolean;
  implementerEnabled: boolean;
  qaEnabled: boolean;
  maxSteps: string;
  parallelExecution: boolean;
}

interface UISettings {
  darkMode: boolean;
  animations: boolean;
  notifications: boolean;
  autoSave: boolean;
  compactMode: boolean;
  showTips: boolean;
  canvaMode: boolean;
  collaborativeMode: boolean;
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
      temperature: '0.7',
      maxTokens: '2048'
    }
  });

  const agentForm = useForm<AgentSettings>({
    defaultValues: {
      plannerEnabled: true,
      designerEnabled: true,
      implementerEnabled: true,
      qaEnabled: true,
      maxSteps: '10',
      parallelExecution: false
    }
  });

  const uiForm = useForm<UISettings>({
    defaultValues: {
      darkMode: false,
      animations: true,
      notifications: true,
      autoSave: true,
      compactMode: false,
      showTips: true,
      canvaMode: true,
      collaborativeMode: false
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
      
      toast({
        title: isValid ? "Connection Successful" : "Connection Failed",
        description: isValid ? `${provider} API connected successfully` : `Failed to connect to ${provider} API`,
        variant: isValid ? "default" : "destructive"
      });
    }, 2000);
  };

  const onSaveApiSettings = async (data: APISettings) => {
    setIsLoading(true);
    
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "🚀 Settings Saved",
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
        title: "🤖 Agent Settings Updated",
        description: "Multi-agent workflow configuration has been saved.",
      });
    }, 1000);
  };

  const onSaveUISettings = async (data: UISettings) => {
    setIsLoading(true);
    
    // Simulate save
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "✨ UI Settings Updated",
        description: "Interface preferences have been saved.",
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
      className="min-h-screen bg-gradient-to-br from-background via-background/95 to-purple-50/20 p-6"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
                className="relative p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500"
              >
                <Settings className="h-8 w-8 text-white" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  FlowHero Settings
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Configure your AI-powered creative workspace
                </p>
              </div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </motion.div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-muted/50 to-muted backdrop-blur-sm h-14">
              <TabsTrigger 
                value="api" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 h-10"
              >
                <Key className="h-4 w-4" />
                API Keys
              </TabsTrigger>
              <TabsTrigger 
                value="agents" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 h-10"
              >
                <Bot className="h-4 w-4" />
                AI Agents
              </TabsTrigger>
              <TabsTrigger 
                value="interface" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 h-10"
              >
                <Palette className="h-4 w-4" />
                Interface
              </TabsTrigger>
              <TabsTrigger 
                value="canva" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-blue-500/20 h-10"
              >
                <Layers className="h-4 w-4" />
                Canvas
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {/* API Configuration Tab */}
          <TabsContent value="api" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <Key className="h-5 w-5 text-white" />
                    </div>
                    API Keys & Model Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...apiForm}>
                    <form onSubmit={apiForm.handleSubmit(onSaveApiSettings)} className="space-y-8">
                      {[
                        { name: 'openaiApiKey', label: 'OpenAI API Key', provider: 'openai', color: 'green' },
                        { name: 'anthropicApiKey', label: 'Anthropic API Key', provider: 'anthropic', color: 'orange' },
                        { name: 'geminiApiKey', label: 'Google Gemini API Key', provider: 'gemini', color: 'blue' }
                      ].map((field) => (
                        <motion.div
                          key={field.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <FormField
                            control={apiForm.control}
                            name={field.name as keyof APISettings}
                            render={({ field: formField }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="flex items-center justify-between text-base font-medium">
                                  <span className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full bg-${field.color}-500`} />
                                    {field.label}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    {getStatusIcon(connectionStatus[field.provider] || '')}
                                    <Badge variant="outline" className="text-xs font-medium">
                                      {connectionStatus[field.provider] || 'not tested'}
                                    </Badge>
                                  </div>
                                </FormLabel>
                                <div className="flex gap-3">
                                  <FormControl>
                                    <Input
                                      type={showApiKeys[field.name] ? 'text' : 'password'}
                                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                                      {...formField}
                                      className="flex-1 h-12 bg-background/50 border-2"
                                    />
                                  </FormControl>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-12 w-12 shrink-0"
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
                                    className="h-12 px-4"
                                    onClick={() => testConnection(field.provider, formField.value)}
                                    disabled={!formField.value || connectionStatus[field.provider] === 'testing'}
                                  >
                                    <TestTube className="h-4 w-4 mr-2" />
                                    Test
                                  </Button>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>
                      ))}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                        <FormField
                          control={apiForm.control}
                          name="model"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Default Model</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-background/50 border-2">
                                    <SelectValue placeholder="Select model" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="gpt-4">GPT-4 Turbo</SelectItem>
                                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                                  <SelectItem value="claude-3">Claude 3 Opus</SelectItem>
                                  <SelectItem value="gemini-pro">Gemini 1.5 Pro</SelectItem>
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
                              <FormLabel className="text-base font-medium">Temperature</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="2"
                                  className="h-12 bg-background/50 border-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Controls creativity (0.0 = focused, 2.0 = creative)
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
                              <FormLabel className="text-base font-medium">Max Tokens</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  max="8000"
                                  className="h-12 bg-background/50 border-2"
                                  {...field}
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
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium">
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
                      </motion.div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Agent Settings Tab */}
          <TabsContent value="agents" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-teal-500">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    Multi-Agent Workflow Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...agentForm}>
                    <form onSubmit={agentForm.handleSubmit(onSaveAgentSettings)} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { name: 'plannerEnabled', label: 'Planner Agent', description: 'Analyzes requests and creates execution plans', icon: FileText },
                          { name: 'designerEnabled', label: 'UI Designer Agent', description: 'Designs interfaces and user experience', icon: Palette },
                          { name: 'implementerEnabled', label: 'Implementation Agent', description: 'Writes code and implements features', icon: Zap },
                          { name: 'qaEnabled', label: 'Quality Assurance Agent', description: 'Reviews and optimizes code quality', icon: Shield }
                        ].map((agent, index) => (
                          <motion.div
                            key={agent.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <FormField
                              control={agentForm.control}
                              name={agent.name as keyof AgentSettings}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 p-6 bg-gradient-to-r from-background/50 to-background/30">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                                        <agent.icon className="h-4 w-4 text-white" />
                                      </div>
                                      <FormLabel className="text-base font-semibold">
                                        {agent.label}
                                      </FormLabel>
                                    </div>
                                    <FormDescription className="text-sm text-muted-foreground">
                                      {agent.description}
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value as boolean}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <FormField
                          control={agentForm.control}
                          name="maxSteps"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">Maximum Workflow Steps</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  max="20"
                                  className="h-12 bg-background/50 border-2"
                                  {...field}
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
                            <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 p-6 bg-gradient-to-r from-background/50 to-background/30">
                              <div className="space-y-1">
                                <FormLabel className="text-base font-semibold">
                                  Parallel Execution
                                </FormLabel>
                                <FormDescription className="text-sm">
                                  Allow agents to work simultaneously
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value as boolean}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-blue-500"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium">
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
                      </motion.div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Interface Settings Tab */}
          <TabsContent value="interface" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
                      <Palette className="h-5 w-5 text-white" />
                    </div>
                    Interface & Experience Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...uiForm}>
                    <form onSubmit={uiForm.handleSubmit(onSaveUISettings)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { name: 'darkMode', label: 'Dark Mode', description: 'Switch to dark theme', icon: Moon },
                          { name: 'animations', label: 'Animations', description: 'Enable smooth transitions and effects', icon: Sparkles },
                          { name: 'notifications', label: 'Notifications', description: 'Show system notifications', icon: Bell },
                          { name: 'autoSave', label: 'Auto Save', description: 'Automatically save your work', icon: Save },
                          { name: 'compactMode', label: 'Compact Mode', description: 'Reduce spacing for more content', icon: Layers },
                          { name: 'showTips', label: 'Show Tips', description: 'Display helpful tips and tutorials', icon: Users },
                          { name: 'canvaMode', label: 'Canvas Mode', description: 'Enable advanced canvas features', icon: Palette },
                          { name: 'collaborativeMode', label: 'Collaborative Mode', description: 'Enable team collaboration features', icon: Users }
                        ].map((setting, index) => (
                          <motion.div
                            key={setting.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                          >
                            <FormField
                              control={uiForm.control}
                              name={setting.name as keyof UISettings}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 p-6 bg-gradient-to-r from-background/50 to-background/30 hover:from-background/70 hover:to-background/50 transition-all duration-300">
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                        <setting.icon className="h-4 w-4 text-white" />
                                      </div>
                                      <FormLabel className="text-base font-semibold">
                                        {setting.label}
                                      </FormLabel>
                                    </div>
                                    <FormDescription className="text-sm text-muted-foreground">
                                      {setting.description}
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value as boolean}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button type="submit" disabled={isLoading} className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium">
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
                          Save Interface Settings
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Canvas Settings Tab */}
          <TabsContent value="canva" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                      <Layers className="h-5 w-5 text-white" />
                    </div>
                    Canvas & Creative Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-xl border-2 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                            <Upload className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold">Import Assets</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Import images, vectors, and other creative assets
                        </p>
                        <Button variant="outline" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Import Files
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-xl border-2 bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                            <Download className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold">Export Projects</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Export your creations in various formats
                        </p>
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Export Options
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-xl border-2 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold">AI Templates</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Access AI-generated design templates
                        </p>
                        <Button variant="outline" className="w-full">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Browse Templates
                        </Button>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-xl border-2 bg-gradient-to-br from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-teal-500">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold">Collaboration</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Real-time collaboration with team members
                        </p>
                        <Button variant="outline" className="w-full">
                          <Users className="h-4 w-4 mr-2" />
                          Invite Team
                        </Button>
                      </motion.div>
                    </div>

                    <div className="text-center py-8">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 2, -2, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="mx-auto mb-4 p-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"
                      >
                        <Layers className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">Canvas Features Coming Soon</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Advanced canvas tools, layer management, and creative AI assistance will be available in the next update.
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
