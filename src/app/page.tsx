'use client';
import './globals.css';
import React from 'react';

//simple welcome page with tailwindcss
export default function Home() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-4xl font-bold text-center">Welcome to Clerk.js</h1>
      <p className="text-lg text-center">This is a simple welcome page with Tailwind CSS</p>

    <button onClick={async () => {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longURL: 'https://clerk.dev',
          alias: 'clerk',
        }),
      });
        const data = await res.json();
        console.log(data);
        }}>Create Short URL</button>
    </div>
  )
}