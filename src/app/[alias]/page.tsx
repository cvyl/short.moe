import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export async function counter(alias: string) {
  const shortURL = await prisma.shortURL.findFirst({
    where: { alias },
  });

  if (!shortURL) return null;

  await prisma.shortURL.update({
    where: { id: shortURL.id },
    data: { userClicks: shortURL.userClicks + 1 },
  });

  return shortURL.longURL;
}

export default async function RedirectPage({
  params,
}: {
  params: { alias: string };
}) {
  const { alias } = params;
  const longURL = await counter(alias);

  if (!longURL) {
    redirect('/');
    return;
  }

  redirect(longURL);
}
