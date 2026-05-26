import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ◇ AI synthesis API route.
// Privacy: only receives structural context prompt + contextHash.
// No journal text, no reflections, no Rückschau entries are ever processed here.
// The orientation text is returned to the client and stored in localStorage only.
// Supabase logs only contextHash + created_at.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { prompt?: string; contextHash?: string };
    if (!body.prompt || !body.contextHash) {
      return NextResponse.json({ error: 'missing fields' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'synthesis not configured' }, { status: 503 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        messages: [{ role: 'user', content: body.prompt }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'upstream error' }, { status: 502 });
    }

    const data = await response.json() as {
      content?: Array<{ type: string; text?: string }>;
    };

    const text = (data.content ?? [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text ?? '')
      .join('');

    if (!text) return NextResponse.json({ error: 'empty response' }, { status: 500 });

    // Log context hash only — no personal text reaches the server
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const sb = createClient(supabaseUrl, supabaseKey);
        await sb.from('ai_synthesis_log').insert({
          context_hash: body.contextHash,
          created_at: new Date().toISOString(),
        });
      } catch {}
    }

    return NextResponse.json({ text });
  } catch (e) {
    if (process.env.NODE_ENV === 'development') console.error('synthesis:', e);
    return NextResponse.json({ error: 'synthesis failed' }, { status: 500 });
  }
}
