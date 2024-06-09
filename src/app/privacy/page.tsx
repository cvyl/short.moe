import React from 'react';
import '../globals.css';

export default function PrivacyPage() {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-full max-w-lg p-6 bg-white rounded-lg shadow-lg text-slate-800'>
        <h1 className='text-4xl font-bold mb-4'>Privacy Policy</h1>
        <p className='mb-4'>Your privacy is important to us.</p>
        <p className='mb-4'>
          Effective Date: 09/06/2024 (Last Updated: 09/06/2024)
        </p>
        <p className='mb-4'>
          Short.moe is committed to protecting the privacy of our users. This Privacy Policy outlines the types of information we collect, how we use it, and the choices you have regarding your information. By accessing or using Short.moe, you agree to the terms of this Privacy Policy.
        </p>
        <h2 className='text-2xl font-bold mt-4 mb-2'>Information We Collect</h2>
        <p className='mb-4'>
          <strong>Anonymous Users:</strong><br/>
          - <strong>IP Addresses:</strong> We collect IP addresses for anonymous users solely for legal inquiries and to analyze trends, administer the site, and gather broad demographic information for aggregate use. Legal inquiries may be made to comply with laws in the Netherlands.
        </p>
        <p className='mb-4'>
          <strong>Signed-In Users:</strong><br/>
          When you create an account and sign in to Short.moe, we collect the following information:
          <ul className='list-disc pl-6'>
            <li><strong>Clerk Data Collection:</strong> Short.moe utilizes Clerk for user authentication and management. When you sign in using Clerk, they may collect and process certain personal data in accordance with their own Privacy Policy. This may include but is not limited to:
              <ul className='list-disc pl-6'>
                <li>Name</li>
                <li>Email address</li>
                <li>Profile picture</li>
                <li>Other information you provide during the sign-up process or subsequently update in your account settings.</li>
              </ul>
            </li>
          </ul>
        </p>
        <p className='mb-4'>
          Short.moe is currently hosted on Vercel. You can find Vercel&apos;s privacy policy <a href='https://vercel.com/legal/privacy-policy' target='_blank' rel='noopener noreferrer' className='text-blue-500'>here</a>.
        </p>

        <h2 className='text-2xl font-bold mt-4 mb-2'>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at <a href='mailto:contact@short.moe' className='text-blue-500'>contact@short.moe</a>. If you&apos;re an EU resident, you can also request data removal through this email address.
        </p>
      </div>
    </div>
  );
}
