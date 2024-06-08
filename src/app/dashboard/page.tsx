import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

async function fetchUrls(userId: string) {
    const urls = await prisma.shortURL.findMany({
        where: { userId },
    });
    return urls ?? [];
}

export default async function dashboardPage() {
    const user = await currentUser();
    if (!user) {
        return { error: 'Unauthorized', status: 403 };
    }
    const urls = await fetchUrls(user.id);
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {urls.map((url) => (
                    <li key={url.id}>
                        <a href={`/${url.alias}`}>{url.alias}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}