'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Users,
  Send,
  CreditCard,
  Dumbbell,
  Smartphone,
  BarChart3,
  List,
  FileText,
  MessageCircle,
  Book,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const functionsItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/alunos', label: 'Alunos', icon: Users },
  { href: '/enviar-treino', label: 'Enviar Treino', icon: Send },
  { href: '/financeiro', label: 'Financeiro', icon: CreditCard, hasSubmenu: true },
  { href: '/', label: 'Treinos/Exercícios', icon: Dumbbell, hasSubmenu: true },
  { href: '/aplicativo', label: 'Aplicativo', icon: Smartphone },
  { href: '/periodizacao', label: 'Periodização', icon: BarChart3 },
  { href: '/planos', label: 'Planos', icon: List },
  { href: '/questionario', label: 'Questionário', icon: FileText },
];

const settingsItems = [
  { href: '/faq', label: 'FAQ Aluno', icon: MessageCircle },
  { href: '/tutoriais', label: 'Tutoriais', icon: Book },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, setOpen, isMobile } = useSidebar();
  const [isAutoExpanded, setIsAutoExpanded] = React.useState(false);
  
  const isCollapsed = state === 'collapsed';
  const userAvatar = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  const handleMouseEnter = () => {
    if (isCollapsed && !isMobile) {
      setOpen(true);
      setIsAutoExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (isAutoExpanded && !isMobile) {
      setOpen(false);
      setIsAutoExpanded(false);
    }
  };

  return (
    <Sidebar 
      className="border-r-0 bg-[#0a0a0a] text-white transition-all duration-300 ease-in-out z-50" 
      collapsible="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarHeader className={cn("p-6 transition-all duration-300", isCollapsed && "p-4 items-center")}>
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <div className="flex items-baseline gap-1">
            <span className={cn("text-2xl font-black italic tracking-tighter text-white whitespace-nowrap", isCollapsed && "text-xl")}>
              {isCollapsed ? 'AL' : 'ALAN LUIZ'}
            </span>
          </div>
          {!isCollapsed && (
            <span className="text-[9px] font-bold tracking-[0.3em] text-primary uppercase -mt-1 whitespace-nowrap">
              PERSONAL TRAINER
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-white/40 font-black text-[11px] tracking-[0.2em] px-4 mb-2 uppercase">
              FUNÇÕES
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {functionsItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="hover:bg-white/5 active:bg-white/10 h-11 px-4 text-white group"
                  >
                    <Link href={item.href} className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors shrink-0" />
                        <span className="font-bold text-[13px] tracking-tight group-data-[collapsible=icon]:hidden">{item.label}</span>
                      </div>
                      {item.hasSubmenu && !isCollapsed && (
                        <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          {!isCollapsed && (
            <SidebarGroupLabel className="text-white/40 font-black text-[11px] tracking-[0.2em] px-4 mb-2 uppercase">
              CONFIGURAÇÕES
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="hover:bg-white/5 active:bg-white/10 h-11 px-4 text-white group"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors shrink-0" />
                      <span className="font-bold text-[13px] tracking-tight group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto border-t border-white/5">
        <div className={cn("flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group overflow-hidden", isCollapsed && "justify-center p-1")}>
          <Avatar className="h-8 w-8 border border-white/10 shrink-0">
            {userAvatar && (
              <AvatarImage
                src={userAvatar.imageUrl}
                alt="Alan Luiz"
                data-ai-hint="personal trainer profile"
              />
            )}
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="font-bold text-xs truncate text-white">Alan Luiz</p>
            <p className="text-[10px] text-white/40 truncate">
              alan.luiz@personal.com
            </p>
          </div>
          {!isCollapsed && (
            <ChevronDown className="h-4 w-4 text-white/20 group-hover:text-white" />
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
