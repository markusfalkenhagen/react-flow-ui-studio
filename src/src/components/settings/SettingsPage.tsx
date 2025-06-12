
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Settings, 
  Key, 
  Bot, 
  Palette, 
  Shield, 
  Bell,
  Save,
  RefreshCw,
  Info,
  Crown,
  Zap
} from 'lucide-react';

interface SettingsForm {
  openaiApiKey: string;
  anthropicApiKey: string;
  perplexityApiKey: string;
  temperature: number;
  maxTokens: number;
  enableNotifications: boolean;
  enableAutoSave: boolean;
  enableDarkMode: boolean;
  enableAnimations: boolean;
  maxAgents: number;
  agentTimeout: number;
}

export function SettingsPage() {
  const { register, handleSubmit, watch, setValue } = useForm<SettingsForm>({
    defaultValues: {
      openaiApiKey: '',
      anthropicApiKey: '',
      perplexityApiKey: '',
      temperature: 0.7,
      maxTokens: 2000,
      enableNotifications: true,
      enableAutoSave: true,
      enableDarkMode: false,
      enableAnimations: true,
      maxAgents: 5,
      agentTimeout: 30
    }
  });

  const onSubmit = (data: SettingsForm) => {
    console.log('Settings saved:', data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background p-6"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Professional Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Settings className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Configure your AI workspace</p>
            </div>
          </div>
          <Badge variant="secondary" className="border">
            <Crown className="h-3 w-3 mr-1" />
            Professional
          </Badge>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Tabs defaultValue="api" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger value="api" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                API Keys
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Agents
              </TabsTrigger>
              <TabsTrigger value="interface" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Interface
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* API Configuration */}
            <TabsContent value="api" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      API Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        API keys are stored securely and used only for your AI requests.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="openai">OpenAI API Key</Label>
                        <Input
                          id="openai"
                          type="password"
                          placeholder="sk-..."
                          {...register('openaiApiKey')}
                          className="font-mono"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="anthropic">Anthropic API Key</Label>
                        <Input
                          id="anthropic"
                          type="password"
                          placeholder="sk-ant-..."
                          {...register('anthropicApiKey')}
                          className="font-mono"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="perplexity">Perplexity API Key</Label>
                        <Input
                          id="perplexity"
                          type="password"
                          placeholder="pplx-..."
                          {...register('perplexityApiKey')}
                          className="font-mono"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* AI Agents Configuration */}
            <TabsContent value="agents" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="grid gap-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      Model Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Temperature</Label>
                          <Badge variant="outline" className="text-xs">
                            {watch('temperature')}
                          </Badge>
                        </div>
                        <Slider
                          value={[watch('temperature')]}
                          onValueChange={(value) => setValue('temperature', value[0])}
                          max={2}
                          min={0}
                          step={0.1}
                          className="w-full"
                        />
                        <p className="text-xs text-muted-foreground">
                          Higher values make output more creative
                        </p>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <Label htmlFor="maxTokens">Max Tokens</Label>
                        <Input
                          id="maxTokens"
                          type="number"
                          {...register('maxTokens', { valueAsNumber: true })}
                          min={100}
                          max={4000}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Agent Behavior
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Maximum Concurrent Agents</Label>
                        <Badge variant="outline" className="text-xs">
                          {watch('maxAgents')}
                        </Badge>
                      </div>
                      <Slider
                        value={[watch('maxAgents')]}
                        onValueChange={(value) => setValue('maxAgents', value[0])}
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="agentTimeout">Agent Timeout (seconds)</Label>
                      <Input
                        id="agentTimeout"
                        type="number"
                        {...register('agentTimeout', { valueAsNumber: true })}
                        min={10}
                        max={300}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Interface Settings */}
            <TabsContent value="interface" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5" />
                      Appearance & Behavior
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dark Mode</Label>
                          <p className="text-xs text-muted-foreground">
                            Enable dark theme
                          </p>
                        </div>
                        <Switch
                          checked={watch('enableDarkMode')}
                          onCheckedChange={(checked) => setValue('enableDarkMode', checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Animations</Label>
                          <p className="text-xs text-muted-foreground">
                            Enable interface animations
                          </p>
                        </div>
                        <Switch
                          checked={watch('enableAnimations')}
                          onCheckedChange={(checked) => setValue('enableAnimations', checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto-save</Label>
                          <p className="text-xs text-muted-foreground">
                            Automatically save changes
                          </p>
                        </div>
                        <Switch
                          checked={watch('enableAutoSave')}
                          onCheckedChange={(checked) => setValue('enableAutoSave', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Notifications</Label>
                          <p className="text-xs text-muted-foreground">
                            Receive system notifications
                          </p>
                        </div>
                        <Switch
                          checked={watch('enableNotifications')}
                          onCheckedChange={(checked) => setValue('enableNotifications', checked)}
                        />
                      </div>
                      
                      <Separator />
                      
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          All data is encrypted and stored securely. API keys never leave your browser.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Professional Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between pt-6 border-t"
          >
            <Button variant="outline" type="button">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
