import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import urlSchema from '@/schemas/urlSchema';




export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { longURL, alias} = await req.json();

  // Find or create user in the database
  const clerkUser = await prisma.user.upsert({
    where: { clerkId: user.id },
    update: {},
    create: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      ipAddress: req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip,
    },
    });

    //validate the URL
    const result = urlSchema.safeParse({ slug: alias, url: longURL });
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Create the short URL
    const short = await prisma.shortURL.create({
      data: {
        longURL,
        alias,
        User: { connect: { id: clerkUser.id } },
      },
    });

    return NextResponse.json(short, { status: 201 });
}

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const clerkUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { shortURLs: true, },
    });

    return NextResponse.json(clerkUser?.shortURLs ?? [], { status: 200 });
}

export async function DELETE(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = await req.json();

  const short = await prisma.shortURL.findFirst({
    where: { id, userId: user.id },
    });

    if (!short) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await prisma.shortURL.delete({ where: { id } });

    return NextResponse.json(short, { status: 200 });
}