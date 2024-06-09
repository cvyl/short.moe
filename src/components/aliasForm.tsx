'use client';
import '../app/globals.css';
import React from 'react';

export default function AliasForm() {
    const [longURL, setLongURL] = React.useState('');
    const [alias, setAlias] = React.useState('');
    const [shortURL, setShortURL] = React.useState('');
    const [error, setError] = React.useState('');

    async function shorten() {
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                longURL,
                alias,
            }),
        });

        const result = await response.json();

        if (response.ok) {
            setShortURL(result.shortURL);
            localStorage.setItem('shortURL', result.shortURL);
            setError('');
        } else {
            setShortURL('');
            setError(result.error);
            localStorage.removeItem('shortURL');
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen py-8'>
            <div className='max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center'>
                    Create a Short URL with Alias
                </h1>
                <input
                    type='text'
                    placeholder='Long URL'
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                    className='w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500'
                />
                <input
                    type='text'
                    placeholder='Alias'
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className='w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500'
                />
                <button
                    onClick={shorten}
                    className='w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500'
                >
                    Shorten
                </button>
                {shortURL && (
                    <div className='mt-4 text-center text-gray-800 dark:text-gray-200'>
                        <p className='font-medium'>Short URL:</p>
                        <p className='break-words'>{shortURL}</p>
                    </div>
                )}
                {error && (
                    <div className='mt-4 text-center text-red-600 dark:text-red-400'>
                        <p className='font-medium'>Error:</p>
                        <p className='break-words'>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
