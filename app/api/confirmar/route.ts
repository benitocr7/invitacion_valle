import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, tipo = 'individual', integrantes } = body;

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!['familia', 'individual'].includes(tipo)) {
      return NextResponse.json({ error: 'Invalid attendance type' }, { status: 400 });
    }

    const cantidadIntegrantes = tipo === 'familia' ? Number(integrantes) : null;
    if (tipo === 'familia' && (cantidadIntegrantes === null || !Number.isInteger(cantidadIntegrantes) || cantidadIntegrantes < 1)) {
      return NextResponse.json({ error: 'Family member count is required' }, { status: 400 });
    }

    await prisma.guest.create({
      data: {
        name: name.trim(),
        tipo,
        integrantes: cantidadIntegrantes,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error saving guest:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
