'use client';
import '../app/globals.css';
import React from 'react';
import anonUrl from '@/schemas/urlNonAlias';

export default function GetDestination() {
    const [alias, setAlias] = React.useState('');
    const [longURL, setLongURL] = React.useState('');
    const [error, setError] = React.useState('');

    async function splitURL(url: string) {
        try {
            anonUrl.parse({ url });
            const split = url.split('/');
            return split[split.length - 1];
        } catch (error) {
            setError('Invalid URL');
            return '';
        }

        
    }

    async function getDestination(query: string) {
        const querySplit = await splitURL(query);
        if (querySplit === '') {
            return;
        }
        const response = await fetch('/api/metadata?q=' + querySplit, {
            method: 'GET',
        });
        
        const result = await response.json();
        if (response.ok) {
            setLongURL(result);
            setError('');
        } else {
            setLongURL('');
            setError(result.error);
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen py-8'>
            <div className='max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg'>
                <h1 className='text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center'>
                    Get Destination
                </h1>
                <input
                    type='text'
                    placeholder='Alias'
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className='w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500'
                />
                <button
                    onClick={() => getDestination(alias)}
                    className='w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500'
                >
                    Get Destination
                </button>
                {error && <p className='text-center mt-4 text-pink-600 break-all'>{error}</p>}
                {longURL && <p className='text-center mt-4 text-pink-600 break-all'>{longURL}</p>}
            </div>
        </div>
    );
}
