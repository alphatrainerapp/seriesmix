'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Mail, Copy, Check, Link as LinkIcon, MessageCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function InviteStudentDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [inviteText, setInviteText] = React.useState(
    'Olá! Bem-vindo(a) ao meu time. Vamos buscar resultados reais juntos! Para começar seu cadastro, acesse o link abaixo:'
  );
  const [inviteLink, setInviteLink] = React.useState('https://workoutai.app/convite/alan-luiz-4');
  const [copied, setCopied] = React.useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    const fullMessage = `${inviteText}\n\n${inviteLink}`;
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    toast({
      title: 'Copiado!',
      description: 'Texto e link copiados com sucesso.',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(`${inviteText}\n\n${inviteLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card rounded-[32px] border-none shadow-2xl p-0 overflow-hidden">
        <div className="p-8 pb-6 space-y-6">
          <DialogHeader className="text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground">
                  Convidar Novo Aluno
                </DialogTitle>
                <DialogDescription className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  Expanda sua base de alunos agora
                </DialogDescription>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex gap-3">
               <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0 animate-pulse" />
               <p className="text-[11px] font-bold text-foreground/80 leading-relaxed uppercase">
                 Crie uma mensagem impactante e configure o seu link de convite personalizado abaixo.
               </p>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Texto de Convite */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Texto do Convite
              </label>
              <Textarea
                value={inviteText}
                onChange={(e) => setInviteText(e.target.value)}
                placeholder="Ex: Olá! Venha treinar comigo..."
                className="min-h-[120px] bg-muted/40 border-none rounded-2xl p-5 font-bold text-sm focus-visible:ring-primary/30 resize-none leading-relaxed shadow-inner"
              />
            </div>

            {/* Link de Cadastro */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                Link de Cadastro Direto
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input
                    value={inviteLink}
                    onChange={(e) => setInviteLink(e.target.value)}
                    className="h-12 pl-11 bg-muted/40 border-none rounded-xl font-bold text-xs text-primary focus-visible:ring-primary/30"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className={cn(
                    "h-12 w-12 rounded-xl border-none bg-muted/40 transition-all active:scale-95",
                    copied ? "text-emerald-500" : "text-muted-foreground hover:text-primary"
                  )}
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-8 bg-muted/20 border-t border-border/10 flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-1 bg-[#25d366] hover:bg-[#128c7e] text-white rounded-2xl h-14 font-black uppercase text-[12px] tracking-widest gap-3 shadow-lg shadow-emerald-500/20 border-none active:scale-95 transition-transform"
            onClick={handleWhatsAppShare}
          >
            <MessageCircle className="h-5 w-5 fill-white" />
            Enviar WhatsApp
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black uppercase text-[12px] tracking-widest gap-3 shadow-lg shadow-primary/20 border-none active:scale-95 transition-transform"
            onClick={handleCopy}
          >
            <Copy className="h-5 w-5" />
            Copiar Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
