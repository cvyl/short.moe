import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import urlSchema from '@/schemas/urlSchema';

// Helper function to get the user's IP address
const getIpAddress = (req: NextRequest): string | null => {
  return req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip || null;
};

// Common function to handle unauthorized responses
const handleUnauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return handleUnauthorized();
  }

  try {
    const { longURL, alias } = await req.json();

    // Find or create user in the database
    const clerkUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {},
      create: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        ipAddress: getIpAddress(req),
      },
    });

    // Validate the URL
    const result = urlSchema.safeParse({ slug: alias, url: longURL });
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

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
        userId: clerkUser.id,
      },
    });

    return NextResponse.json(short, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error + 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return handleUnauthorized();
  }

  try {
    const clerkUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
      include: { shortURLs: true },
    });

    return NextResponse.json(clerkUser?.shortURLs ?? [], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
// Delete short URL functionality
export async function DELETE(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return handleUnauthorized();
  }

  try {
    const { alias } = await req.json();

    const short = await prisma.shortURL.findFirst({
      where: {
        alias,
        userId: user.id
       },
    });

    if (!short) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await prisma.shortURL.delete({ where: { alias } });

    return NextResponse.json(short, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
