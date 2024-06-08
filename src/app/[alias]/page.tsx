import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function RedirectPage({
  params: { id: alias },
}: {
  params: { id: string };
}) {
  const shortURL = await prisma.shortURL.findFirst({
    where: { alias },
  });

  if (!shortURL) {
    redirect('/');
  }

  redirect(shortURL.longURL);
}
