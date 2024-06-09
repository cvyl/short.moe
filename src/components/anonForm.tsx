'use client';
import '../app/globals.css';
import React from 'react';

export default function AnonForm() {
    const [longURL, setLongURL] = React.useState('');

    async function postAnon() {
        const response = await fetch('/api/random', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                longURL,
            }),
        });
        if (!response.ok) {
            console.error(response);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen py-8'>
            <div className='max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center'>
                    Create a Short URL
                </h1>
                <input
                    type='text'
                    placeholder='Long URL'
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                    className='w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500'
                />
                <button
                    onClick={postAnon}
                    className='w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500'
                >
                    Shorten
                </button>
            </div>
        </div>
    );
}
