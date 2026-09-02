import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: 'file:./dev.db',
});

const ADMIN_PASSWORD = "admin"; // Basic password

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { rows } = await libsql.execute('SELECT * FROM Guest ORDER BY createdAt DESC');
    const guests = rows.map(row => ({
      id: row.id,
      name: row.name,
      createdAt: row.createdAt,
    }));

    return NextResponse.json({ success: true, guests });
  } catch (error: any) {
    console.error('Error fetching guests:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error?.message || String(error) }, { status: 500 });
  }
}
