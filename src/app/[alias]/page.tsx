import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function RedirectPage({
  params,
}: {
  params: { alias: string };
}) {
  const { alias } = params;

  const shortURL = await prisma.shortURL.findFirst({
    where: { alias },
  });

  if (!shortURL) { redirect('/'); }

  console.log(`Redirecting to: ${shortURL.longURL}`); // Debugging line
  redirect(shortURL.longURL);
}
