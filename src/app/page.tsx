'use client';
import './globals.css';
import React, { useEffect } from 'react';
import { UrlQRCode } from '@/components/qrcode';

export default function Home() {
  const [longURL, setLongURL] = React.useState('');
  const [alias, setAlias] = React.useState('');
  const [shortURL, setShortURL] = React.useState('');
  const [error, setError] = React.useState('');

  useEffect(() => {
    const storedShortURL = localStorage.getItem('shortURL');
    if (storedShortURL) {
      setShortURL(storedShortURL);
    }
  }, []);

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
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create a Short URL</h1>
        <input
          type="text"
          placeholder="Long URL"
          value={longURL}
          onChange={(e) => setLongURL(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Alias (optional)"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="w-full px-3 py-2 mb-4 border border-gray-300 rounded"
        />
        <button
          onClick={shorten}
          className="w-full px-3 py-2 mb-4 bg-blue-500 text-white rounded"
        >
          Shorten
        </button>
      </div>
    </div>
  );
}
