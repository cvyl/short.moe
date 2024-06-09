export const BASE_URL = 'http://short.moe';
export const SITE_NAME = 'short.moe';
export const SITE_DESCRIPTION = 'A simple and free URL shortener.';
export const SITE_TITLE = 'short.moe - A free URL Shortener';
export const SITE_IMAGE = 'https://repository-images.githubusercontent.com/812269186/2a8e675e-0e9c-40e6-ad57-8cc9f82e4053';
export const SITE_AUTHOR = 'Mikka (@cvyl)';
export const SITE_COLOR = '#ee9ca7';


export const siteConfig = {
    
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        siteName: SITE_TITLE,
        type: 'website',
        url: BASE_URL,
        images: [
        {
            url: SITE_IMAGE,
            width: 1280,
            height: 640,
            alt: SITE_TITLE,
        },
        ],
    },
    authors: [
        {
        name: SITE_AUTHOR,
        },
    ],
    twitter: {
        title: SITE_TITLE,
        site: SITE_NAME,
        card: 'summary_large_image',
        images: [
        {
            url: SITE_IMAGE,
            width: 1280,
            height: 640,
            alt: SITE_TITLE,
        },
        ],
    },
    };