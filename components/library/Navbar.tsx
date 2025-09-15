// components/Navbar.tsx  <- REWRITE THIS ENTIRE FILE

"use client";
import Link from 'next/link';
import React from 'react';

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /> </svg> );
const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /> </svg> );

interface NavbarProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-border/60 bg-background/80 backdrop-blur-md rounded-b-2xl px-6 shadow-sm">
          <div className="flex items-center">
            <Link href="/library" className="text-2xl font-bold text-primary tracking-tight">
              Palestine<span className="font-light text-muted-foreground">History</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/library/events" className="hidden md:block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Events</Link>
            <Link href="/library/actors" className="hidden md:block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Actors</Link>
            <Link href="/library/locations" className="hidden md:block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Locations</Link>
            
            {/* UPDATED: The href for the map is now correct */}
            <Link href="/library/map" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Map</Link>
            
             <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;