'use client';
import './globals.css';
import React from 'react';
import { UrlQRCode } from '@/components/qrcode';
import { useAuth } from '@clerk/nextjs'
import AnonForm from '@/components/anonForm';
import AliasForm from '@/components/aliasForm';
import GetDestination from '@/components/destinationForm';

export default function Home() {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded || !userId) {
    return (
      <div className='container mx-auto justify-center py-8 flex flex-col md:flex-row gap-8'>
        <AnonForm />
        <GetDestination />
      </div>
    );
  }
  return (
    <div className='container mx-auto justify-center py-8 flex flex-col md:flex-row gap-8'>
      <AliasForm />
      <GetDestination />
    </div>
  );
}
