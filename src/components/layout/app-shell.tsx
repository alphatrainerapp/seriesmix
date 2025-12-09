'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background">
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </div>
  );
}
