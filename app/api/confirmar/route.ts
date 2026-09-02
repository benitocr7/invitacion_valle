import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: "postgres://8b6e13705a475f5d3df4ecee2ae4d99d1c591b9643afee0adce0fa3efefd3958:sk_LO-ZDcgHNNKUQQWUZT7d3@db.prisma.io:5432/postgres?sslmode=require"
});
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    await prisma.guest.create({
      data: {
        name,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving guest:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
