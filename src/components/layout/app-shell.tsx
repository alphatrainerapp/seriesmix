'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { ThemeToggle } from '../theme-toggle';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background min-h-screen relative">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          {children}
          <ThemeToggle />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
