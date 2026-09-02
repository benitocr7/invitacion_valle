import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../prisma/generated/client';

const prisma = new PrismaClient();

const ADMIN_PASSWORD = "admin"; // Basic password

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const guests = await prisma.guest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ success: true, guests });
  } catch (error: any) {
    console.error('Error fetching guests:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error?.message || String(error) }, { status: 500 });
  }
}
