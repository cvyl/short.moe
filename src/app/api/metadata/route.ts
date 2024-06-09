import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const alias = url.searchParams.get('q');

        if (!alias) {
            return NextResponse.json({ error: 'Alias parameter is required' }, { status: 400 });
        }

        // Find the short URL using the alias
        const short = await prisma.shortURL.findUnique({
            where: { alias },
        });

        if (!short) {
            return NextResponse.json({ error: 'Not Found' }, { status: 404 });
        }

        // Redirect to the long URL
        return NextResponse.json(short.longURL);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}