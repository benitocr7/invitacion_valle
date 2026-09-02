import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: 'file:./dev.db',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    await libsql.execute({
      sql: 'INSERT INTO Guest (name, createdAt) VALUES (?, ?)',
      args: [name, now]
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving guest:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
