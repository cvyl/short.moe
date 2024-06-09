'use client';
import '../globals.css';
import React, { useEffect } from 'react';

export default function TestPage() {
    const [longURL, setLongURL] = React.useState('');
    const [shortURL, setShortURL] = React.useState('');
    const [error, setError] = React.useState('');
    const [alias, setAlias] = React.useState('');

    async function shorten() {
        const response = await fetch('/api/random', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                longURL,
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

    async function getDestination() {
        // fethc using the random api but add the alias to the url after the '?'
        //we cant use json here because we are not sending any data
        const response = await fetch(`/api/metadata?q=${alias}`, {
            method: 'GET',
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
        <div className="container mx-auto py-8">
            <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Create a Short URL</h1>
                <input
                    type="text"
                    placeholder="Long URL"
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded text-black"
                />
                <button
                    onClick={shorten}
                    className="w-full px-3 py-2 mb-4 bg-blue-500 text-white rounded"
                >
                    Shorten
                </button>
            </div>
            <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Get Destination of Short URL</h1>
                <input
                    type="text"
                    placeholder="Short URL"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded text-black"
                />
                <button
                    onClick={getDestination}
                    className="w-full px-3 py-2 mb-4 bg-blue-500 text-white rounded"
                >
                    Get Destination
                </button>
                </div>
        </div>
    );
}