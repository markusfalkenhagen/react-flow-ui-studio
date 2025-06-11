import {NextRequest, NextResponse} from 'next/server';
import {intelligentWebhook, IntelligentWebhookInput} from '@/ai/flows/intelligent-webhooks';

export async function POST(req: NextRequest) {
  try {
    const {message}: IntelligentWebhookInput = await req.json();

    if (!message) {
      return NextResponse.json({error: 'Message is required'}, {status: 400});
    }

    const result = await intelligentWebhook({message});
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({error: error.message || 'Internal Server Error'}, {status: 500});
  }
}