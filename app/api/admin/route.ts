import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

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
  } catch (error: unknown) {
    console.error('Error fetching guests:', error);
    const details = error instanceof Error ? error.message : String(error);
    const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : undefined;
    return NextResponse.json({ error: 'Internal Server Error', code, details }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { password, id } = body;

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const guestId = Number(id);
    if (!Number.isInteger(guestId)) {
      return NextResponse.json({ error: 'Invalid guest id' }, { status: 400 });
    }

    await prisma.guest.delete({ where: { id: guestId } });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error deleting guest:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
