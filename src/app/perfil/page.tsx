'use client';

import * as React from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Phone, 
  Fingerprint, 
  Lock, 
  ShieldCheck, 
  Camera,
  Check,
  X,
  Dumbbell,
  Users,
  LayoutGrid
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

// --- Dados dos Planos ---

const planFeatures = [
  { label: 'Alunos', values: ['5', '15', 'Ilimitado', 'Ilimitado'] },
  { label: 'Criação de treino', values: ['check', 'check', 'check', 'check'] },
  { label: 'Criação de exercícios', values: ['10', '20', 'Ilimitado', 'Ilimitado'] },
  { label: 'Editar biblioteca', values: ['x', 'check', 'check', 'check'] },
  { label: 'Criar Questionário', values: ['check', 'check', 'check', 'check'] },
  { label: 'Personalizar APP', values: ['check', 'check', 'check', 'check'] },
  { label: 'Modelos', values: ['x', '5', 'Ilimitado', 'Ilimitado'] },
  { label: 'Volume de treino', values: ['x', 'check', 'check', 'check'] },
  { label: 'Feedback', values: ['check', 'check', 'check', 'check'] },
  { label: 'Extra Bonus', values: ['', '', '33 Treinos Modelos Prontos', '33 Treinos Modelos Prontos'] },
];

const planHeaders = [
  { label: 'Grátis', color: 'bg-[#ff5b8e]', price: '' },
  { label: '19,90', color: 'bg-[#ffb35c]', price: '' },
  { label: '39,90', color: 'bg-[#4fc3f7]', price: '' },
  { label: '260,00', color: 'bg-[#9575cd]', price: '12X 26,00' },
];

// --- Sub-componentes ---

const ProfileField = ({ label, value, required = false, type = "text" }: { label: string, value: string, required?: boolean, type?: string }) => (
  <div className="space-y-1.5 w-full">
    <div className="flex items-center gap-1 pl-1">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      {required && <span className="text-red-500">*</span>}
    </div>
    <Input 
      type={type}
      defaultValue={value}
      className="h-12 bg-muted/30 border-none rounded-xl font-bold text-sm focus-visible:ring-primary/30"
    />
  </div>
);

const PlanValue = ({ val, color }: { val: string, color: string }) => {
  if (val === 'check') return <Check className="h-5 w-5 text-white mx-auto drop-shadow-sm" />;
  if (val === 'x') return <X className="h-5 w-5 text-white opacity-40 mx-auto" />;
  if (val === '') return null;
  return <span className="text-[12px] font-black text-white uppercase tracking-tight text-center leading-tight drop-shadow-sm">{val}</span>;
};

export default function PerfilPage() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="app-container max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LADO ESQUERDO: EDIÇÃO DE PERFIL */}
          <Card className="lg:col-span-4 bg-card border border-border/40 rounded-[32px] p-8 shadow-xl overflow-hidden">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-2xl">
                  <AvatarImage src={userAvatar?.imageUrl} />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="h-8 w-8 text-white" />
                </div>
              </div>
              <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-11 px-6 font-black uppercase text-[10px] tracking-[0.2em] gap-2 shadow-lg shadow-[#00bfa5]/20 border-none">
                <Camera className="h-4 w-4" />
                Escolha sua foto
              </Button>
            </div>

            <div className="space-y-5">
              <ProfileField label="Nome" value="Fabrica de Resultado" required />
              <ProfileField label="Email" value="fabricaderesultado@gmail.com" required />
              <ProfileField label="Sou um(a)" value="Personal" />
              <ProfileField label="Data de Nascimento" value="18/09/1990" />
              <ProfileField label="Telefone" value="43988250754" />
              <ProfileField label="Cpf" value="428.363.828-07" />
              <ProfileField label="Senha" value="****" type="password" />
              <ProfileField label="Tipo de conta" value="Personal" />

              <Button className="w-full mt-6 bg-primary h-14 rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                SALVAR ALTERAÇÕES
              </Button>
            </div>
          </Card>

          {/* LADO DIREITO: TABELA DE PLANOS */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <Card className="bg-card border border-border/40 rounded-[32px] overflow-hidden shadow-xl">
              <div className="p-6 border-b border-border/5 bg-muted/10">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-blue-400">Recebíveis</h3>
              </div>
              
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/5">
                      <th className="p-5 text-left bg-card z-10 sticky left-0 min-w-[180px]"></th>
                      {planHeaders.map((h, i) => (
                        <th key={i} className={cn("p-5 text-center min-w-[100px]", h.color)}>
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-lg font-black text-white uppercase italic tracking-tighter">{h.label}</span>
                            {h.price && <span className="text-[10px] font-bold text-white/80 leading-none">{h.price}</span>}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {planFeatures.map((feature, idx) => (
                      <tr key={idx} className="group hover:bg-muted/10 transition-colors">
                        <td className="p-4 border-b border-border/5 font-bold text-sm text-foreground/80 bg-card z-10 sticky left-0">
                          {feature.label}
                        </td>
                        {feature.values.map((val, vIdx) => (
                          <td key={vIdx} className={cn("p-4 text-center border-b border-white/5", planHeaders[vIdx].color)}>
                            <PlanValue val={val} color={planHeaders[vIdx].color} />
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-muted/5">
                      <td className="p-6 bg-card z-10 sticky left-0"></td>
                      <td className="p-6 bg-[#ff5b8e]"></td>
                      <td className="p-6 bg-[#ffb35c]">
                         <Button variant="outline" className="bg-white text-black border-none h-8 rounded-full font-black text-[9px] uppercase tracking-widest px-4 hover:bg-white/90">COMPRAR</Button>
                      </td>
                      <td className="p-6 bg-[#4fc3f7]">
                         <Button variant="outline" className="bg-white text-black border-none h-8 rounded-full font-black text-[9px] uppercase tracking-widest px-4 hover:bg-white/90">COMPRAR</Button>
                      </td>
                      <td className="p-6 bg-[#9575cd]">
                         <Button variant="outline" className="bg-white text-black border-none h-8 rounded-full font-black text-[9px] uppercase tracking-widest px-4 hover:bg-white/90">COMPRAR</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* SEÇÃO INFERIOR: PLANO ATUAL E MÉTRICAS */}
            <div className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground pl-1">MEU PLANO ATUAL</p>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-orange-500">Elite Pro</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                   { icon: Users, label: 'Alunos', count: 17 },
                   { icon: Dumbbell, label: 'Exercícios', count: 0 },
                   { icon: LayoutGrid, label: 'Modelos', count: 37 },
                 ].map((stat, i) => (
                   <Card key={i} className="bg-card border border-border/40 rounded-[24px] p-8 flex flex-col items-center justify-center gap-4 transition-transform hover:scale-[1.02] shadow-sm">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</span>
                      <span className="text-5xl font-black text-foreground italic">{stat.count}</span>
                   </Card>
                 ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
