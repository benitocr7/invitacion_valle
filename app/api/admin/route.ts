import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: "postgres://8b6e13705a475f5d3df4ecee2ae4d99d1c591b9643afee0adce0fa3efefd3958:sk_LO-ZDcgHNNKUQQWUZT7d3@db.prisma.io:5432/postgres?sslmode=require"
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
  } catch (error: any) {
    console.error('Error fetching guests:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error?.message || String(error) }, { status: 500 });
  }
}
