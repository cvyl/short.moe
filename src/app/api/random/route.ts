import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import anonUrl from '@/schemas/urlNonAlias';
import { nanoid } from 'nanoid';

const getIpAddress = (req: NextRequest): string | null => {
  return req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip || null;
};

export async function POST(req: NextRequest) {
  try {
    const { longURL } = await req.json();
    const alias = nanoid(7);

    // Validate the URL
    const result = anonUrl.safeParse({ url: longURL });
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    // create random user in the database
    const user = await prisma.user.upsert({
        where: { 
            clerkId: 'anon_' + getIpAddress(req)?.toString(),
         },
        update: {},
        create: {
            clerkId: 'anon_' + getIpAddress(req)?.toString() ?? 'anon',
            email: 'anon_' + getIpAddress(req)?.toString() ?? 'anon',
            ipAddress: getIpAddress(req),
        },
        });


    // Check if the alias is already taken
    const existingShort = await prisma.shortURL.findUnique({ where: { alias } });
    if (existingShort) {
      return NextResponse.json({ error: 'Alias already taken' }, { status: 400 });
    }

    // Create the short URL
    const short = await prisma.shortURL.create({
      data: {
        longURL,
        alias,
        userId: user.id,
      },
    });

    return NextResponse.json(short, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error + 'Internal Server Error' }, { status: 500 });
  }
}

