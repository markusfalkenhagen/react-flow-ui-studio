import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Message } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map Supabase data to your Message type if necessary
    const messages: Message[] = data.map((item: any) => ({
      id: item.id,
      text: item.text,
      sender: item.sender,
      timestamp: new Date(item.timestamp),
      file: item.file_data || undefined,
      reasoning: item.reasoning || undefined,
    }));

    return NextResponse.json(messages);
  } catch (error: any) {
    console.error('Error in GET /api/messages:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newMessage: Message = await req.json();

    const { data, error } = await supabase
      .from('messages')
      .insert({
        id: newMessage.id,
        text: newMessage.text,
        sender: newMessage.sender,
        timestamp: newMessage.timestamp.toISOString(), // Store as ISO string
        file_data: newMessage.file || null,
        reasoning: newMessage.reasoning || null,
      })
      .select();

    if (error) {
      console.error('Error inserting message:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/messages:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}