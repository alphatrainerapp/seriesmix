'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
    // Check initial theme on mount
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 bg-card border-border hover:scale-110 transition-transform duration-200 hidden md:flex"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Moon className="h-6 w-6 text-foreground fill-foreground/10" />
      ) : (
        <Sun className="h-6 w-6 text-foreground" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
