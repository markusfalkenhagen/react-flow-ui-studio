
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the path to the settings file within the src directory
const settingsFilePath = path.resolve(process.cwd(), 'src/data/settings.json');

interface AppSettings {
  greetingMessage: string;
  userGoogleApiKey?: string; // Added for user-provided API key
}

async function getSettings(): Promise<AppSettings> {
  try {
    const data = await fs.readFile(settingsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    // If file doesn't exist or other error, return default
    return { 
      greetingMessage: "Hello! I'm ReplicateAI. Default fallback greeting.",
      userGoogleApiKey: "" 
    };
  }
}

async function saveSettings(settings: AppSettings): Promise<void> {
  try {
    await fs.mkdir(path.dirname(settingsFilePath), { recursive: true });
    await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (error: any) {
    console.error('Error writing settings file:', error.message);
    throw new Error('Could not save settings.');
  }
}

export async function GET() {
  try {
    const settings = await getSettings();
    const isEnvKeySet = !!process.env.GOOGLE_API_KEY;
    return NextResponse.json({ ...settings, isEnvKeySet });
  } catch (error: any) {
    console.error('GET /api/settings error:', error.message);
    return NextResponse.json({ error: 'Failed to retrieve settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentSettings = await getSettings();

    const newSettings: AppSettings = {
      ...currentSettings,
    };

    if (body.hasOwnProperty('greetingMessage')) {
      if (typeof body.greetingMessage !== 'string') {
        return NextResponse.json({ error: 'greetingMessage must be a string' }, { status: 400 });
      }
      newSettings.greetingMessage = body.greetingMessage;
    }

    if (body.hasOwnProperty('userGoogleApiKey')) {
      if (typeof body.userGoogleApiKey !== 'string') {
        return NextResponse.json({ error: 'userGoogleApiKey must be a string' }, { status: 400 });
      }
      newSettings.userGoogleApiKey = body.userGoogleApiKey;
    }
    
    await saveSettings(newSettings);
    const isEnvKeySet = !!process.env.GOOGLE_API_KEY;
    return NextResponse.json({ ...newSettings, isEnvKeySet });
  } catch (error: any) {
    console.error('POST /api/settings error:', error.message);
    if (error instanceof SyntaxError) { 
        return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
