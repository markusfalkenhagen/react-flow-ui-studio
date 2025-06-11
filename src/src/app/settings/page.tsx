
"use client";

import React, { useState, useEffect, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Info, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [greetingMessage, setGreetingMessage] = useState('');
  const [userGoogleApiKey, setUserGoogleApiKey] = useState('');
  const [isEnvKeySet, setIsEnvKeySet] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        const data = await response.json();
        setGreetingMessage(data.greetingMessage || '');
        setUserGoogleApiKey(data.userGoogleApiKey || '');
        setIsEnvKeySet(data.isEnvKeySet || false);
      } catch (error) {
        console.error('Error fetching settings:', error);
        toast({
          title: 'Error',
          description: 'Could not load settings. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [toast]);

  const handleSaveSettings = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ greetingMessage, userGoogleApiKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save settings');
      }
      
      const updatedSettings = await response.json();
      setGreetingMessage(updatedSettings.greetingMessage);
      setUserGoogleApiKey(updatedSettings.userGoogleApiKey);
      setIsEnvKeySet(updatedSettings.isEnvKeySet);

      toast({
        title: 'Success',
        description: 'Settings saved successfully.',
      });
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: error.message || 'Could not save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Home</span>
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>
      <main className="flex flex-1 justify-center p-4 md:p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>Manage your application preferences here.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveSettings}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="greetingMessage">Greeting Message</Label>
                <Input
                  id="greetingMessage"
                  placeholder="Enter the greeting message for new chats"
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-sm text-muted-foreground">
                  This message will be displayed as the first message when a new chat session starts (if using the chat interface).
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="userGoogleApiKey">Google API Key</Label>
                <Input
                  id="userGoogleApiKey"
                  type="password"
                  placeholder="Enter your Google API Key (e.g., for Gemini)"
                  value={userGoogleApiKey}
                  onChange={(e) => setUserGoogleApiKey(e.target.value)}
                  disabled={isLoading}
                />
                 <p className="text-sm text-muted-foreground">
                  Store your Google API key here. If set, this will be used by Genkit.
                  A server restart may be required for changes to take full effect.
                </p>
                {isEnvKeySet && (
                  <Alert variant="default" className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      A `GOOGLE_API_KEY` is also set in your environment variables. The key set here will take precedence if provided.
                    </AlertDescription>
                  </Alert>
                )}
                 {!userGoogleApiKey && !isEnvKeySet && (
                    <Alert variant="destructive" className="mt-2">
                        <KeyRound className="h-4 w-4" />
                        <AlertDescription>
                        No Google API Key is currently configured (neither here nor in environment variables). AI features may not work.
                        </AlertDescription>
                    </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Settings'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
