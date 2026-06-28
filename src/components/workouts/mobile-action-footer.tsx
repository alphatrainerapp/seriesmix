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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export function MobileActionFooter() {
  const { toast } = useToast();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const [isOpen, setIsOpen] = React.useState(false);

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
    setIsOpen(false);
  };

  const ActionItem = ({ 
    icon: Icon, 
    label, 
    onClick, 
    colorClass = "text-primary"
  }: { 
    icon: React.ElementType, 
    label: string, 
    onClick: () => void,
    colorClass?: string
  }) => (
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full p-5 active:bg-muted/50 transition-colors rounded-2xl border border-transparent hover:border-border/40"
    >
      <div className="flex items-center gap-4">
        <div className={cn("p-2.5 rounded-xl bg-muted/30", colorClass)}>
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-black text-sm uppercase tracking-widest text-foreground">{label}</span>
      </div>
      <div className="h-8 w-8 rounded-full bg-muted/20 flex items-center justify-center">
        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
      </div>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/80 backdrop-blur-xl border-t border-border/40 p-4 px-6 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-3 max-w-[480px] mx-auto">
        <Button 
          className="flex-1 bg-[#ffa726] hover:bg-[#fb8c00] text-white rounded-full h-14 font-black uppercase text-[12px] tracking-[0.2em] shadow-lg shadow-orange-500/30 gap-2 border-none active:scale-95 transition-transform"
          onClick={() => handleAction('Treino Salvo')}
        >
          <Save className="h-5 w-5" />
          Salvar Treino
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              className="flex-1 bg-[#90a4ae] hover:bg-[#78909c] text-white rounded-full h-14 font-black uppercase text-[12px] tracking-[0.2em] shadow-lg shadow-slate-400/30 gap-2 border-none active:scale-95 transition-transform"
            >
              <MoreHorizontal className="h-5 w-5" />
              Mais Ações
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="bottom" 
            className="rounded-t-[32px] border-none bg-background p-0 h-[75vh] overflow-hidden shadow-2xl"
          >
            <div className="mx-auto w-12 h-1.5 bg-muted/40 rounded-full mt-3 mb-1" />
            
            <SheetHeader className="px-8 pt-6 pb-4 text-left border-b border-border/10">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-2xl font-black uppercase italic tracking-tighter">Ações do Treino</SheetTitle>
                
                <div className="flex items-center gap-2">
                  {/* Simplificated Theme Toggle at the Top */}
                  <button 
                    onClick={toggleTheme}
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-sm",
                      theme === 'light' ? "bg-indigo-500/10 text-indigo-600" : "bg-yellow-500/10 text-yellow-500"
                    )}
                  >
                    {theme === 'light' ? <Moon className="h-6 w-6" /> : <Sun className="h-6 w-6" />}
                  </button>

                  <button 
                    onClick={() => setIsOpen(false)}
                    className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center active:scale-90"
                  >
                    <X className="h-6 w-6 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </SheetHeader>

            <div className="px-4 pt-4 pb-20 space-y-2 h-full overflow-y-auto no-scrollbar">
              <ActionItem 
                icon={FolderPlus} 
                label="Salvar como Modelo" 
                onClick={() => handleAction('Modelo Salvo')}
              />
              <ActionItem 
                icon={Printer} 
                label="Imprimir Treino" 
                onClick={() => handleAction('Gerando impressão...')}
              />
              <ActionItem 
                icon={Download} 
                label="Baixar em PDF" 
                onClick={() => handleAction('Baixando...')}
              />
              <ActionItem 
                icon={Send} 
                label="Enviar para Aluno" 
                onClick={() => handleAction('Enviando via WhatsApp...')}
              />
              <ActionItem 
                icon={HomeIcon} 
                label="Ir para Área do Aluno" 
                onClick={() => handleAction('Direcionando...')}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
