'use client';
import '../app/globals.css';
import React from 'react';

export default function GetDestination() {
    const [alias, setAlias] = React.useState('');
    const [longURL, setLongURL] = React.useState('');

    async function getDestination(query: string) {
        const response = await fetch('/api/metadata?q=' + query, {
            method: 'GET',
        });
        
        if (!response.ok) {
            console.error(response);
        }
        const result = await response.json();
        setLongURL(result.longURL);
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
                {longURL && (
                    <div className='mt-4 text-center text-gray-800 dark:text-gray-200'>
                        <p className='font-medium'>Destination URL:</p>
                        <p className='break-words'>{longURL}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
