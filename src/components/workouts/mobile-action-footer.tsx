'use client';

import * as React from 'react';
import { 
  Save, 
  MoreHorizontal, 
  FolderPlus, 
  Printer, 
  Download, 
  Send, 
  Home as HomeIcon,
  Moon,
  Sun,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function MobileActionFooter() {
  const { toast } = useToast();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  React.useEffect(() => {
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

  const handleAction = (label: string) => {
    toast({
      title: label,
      description: "Ação realizada com sucesso.",
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/80 backdrop-blur-lg border-t border-border/40 p-4 px-6 pb-8">
      <div className="flex items-center gap-3 max-w-[480px] mx-auto">
        <Button 
          className="flex-1 bg-[#ffa726] hover:bg-[#fb8c00] text-white rounded-full h-12 font-black uppercase text-[11px] tracking-widest shadow-lg shadow-orange-500/20 gap-2 border-none"
          onClick={() => handleAction('Treino Salvo')}
        >
          <Save className="h-4 w-4" />
          Salvar Treino
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              className="flex-1 bg-[#90a4ae] hover:bg-[#78909c] text-white rounded-full h-12 font-black uppercase text-[11px] tracking-widest shadow-lg shadow-slate-400/20 gap-2 border-none"
            >
              <MoreHorizontal className="h-4 w-4" />
              Mais Ações
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 mb-2 shadow-2xl border-border/40">
            <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-tight" onClick={() => handleAction('Modelo Salvo')}>
              <FolderPlus className="h-4 w-4 mr-2 text-primary" />
              Salvar Modelo
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-tight" onClick={() => handleAction('Imprimindo...')}>
              <Printer className="h-4 w-4 mr-2 text-primary" />
              Imprimir
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-tight" onClick={() => handleAction('Baixando...')}>
              <Download className="h-4 w-4 mr-2 text-primary" />
              Baixar
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-tight" onClick={() => handleAction('Enviando...')}>
              <Send className="h-4 w-4 mr-2 text-primary" />
              Enviar
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl p-3 font-bold text-xs uppercase tracking-tight">
              <HomeIcon className="h-4 w-4 mr-2 text-primary" />
              Área do Aluno
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-2 bg-border/40" />
            
            <DropdownMenuItem 
              className="rounded-xl p-3 font-bold text-xs uppercase tracking-tight cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 mr-2 text-indigo-500" />
              ) : (
                <Sun className="h-4 w-4 mr-2 text-yellow-500" />
              )}
              Tema {theme === 'light' ? 'Escuro' : 'Claro'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
