"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/library/Navbar';

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. I create a state to manage the current theme ('dark' or 'light').
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // 2. I create the REAL function that will be passed to the Navbar.
  // It toggles the state between 'dark' and 'light'.
  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  // 3. I apply the current theme as a class to the root div.
  // This is the most important part. When the theme is 'dark', this div
  // will have the class "dark", which your CSS can use to change colors.
  return (
    <div className={theme}>
      {/* 4. We now pass the REAL state and function to the Navbar. */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      {/* This main element will now respond to the theme change. */}
      <main className="pt-16 bg-background text-foreground min-h-screen">
        {/* The page content (children) is rendered inside */}
        {children}
      </main>
    </div>
  );
}