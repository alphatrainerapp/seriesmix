'use client';

import * as React from 'react';
import { 
  Calendar, 
  Phone, 
  Camera,
  Check,
  X,
  Crown,
  Settings,
  MessageSquare,
  Save,
  Eye,
  IdCard,
  Pencil
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  { label: 'Extra Bonus', values: ['-', '-', '33 Treinos Modelos Prontos', '33 Treinos Modelos Prontos'] },
];

const planHeaders = [
  { label: 'START', price: 'Grátis', color: 'bg-gradient-to-b from-[#ff5b8e] to-[#ff2a68]', badge: null },
  { label: 'BASIC', price: 'R$ 19,90', color: 'bg-gradient-to-b from-[#ffb35c] to-[#ff8c00]', badge: null },
  { label: 'ELITE PRO', price: 'R$ 39,90', color: 'bg-gradient-to-b from-[#4fc3f7] to-[#00b0ff]', badge: 'Mais escolhido' },
  { label: 'PRO ANUAL', price: 'R$ 260,00', subPrice: '12x R$ 26,00', color: 'bg-gradient-to-b from-[#9575cd] to-[#673ab7]', badge: null },
];

// --- Sub-componentes ---

const ProfileField = ({ 
  label, 
  value, 
  required = false, 
  type = "text", 
  icon: Icon,
  placeholder 
}: { 
  label: string, 
  value?: string, 
  required?: boolean, 
  type?: string, 
  icon?: React.ElementType,
  placeholder?: string
}) => (
  <div className="space-y-1 w-full group">
    <div className="flex items-center gap-1 pl-1">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</label>
      {required && <span className="text-red-500">*</span>}
    </div>
    <div className="relative">
      <Input 
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        className="h-11 bg-muted/40 border-none rounded-xl font-bold text-sm focus-visible:ring-primary/30 pr-10"
      />
      {Icon && <Icon className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />}
    </div>
  </div>
);

const PlanValue = ({ val }: { val: string }) => {
  if (val === 'check') return <Check className="h-5 w-5 text-white mx-auto" />;
  if (val === 'x') return <X className="h-5 w-5 text-white/40 mx-auto" />;
  if (val === '-') return <span className="text-white/40">-</span>;
  if (val === 'Ilimitado') return <span className="text-[11px] font-black text-white uppercase italic">ilimitado</span>;
  return <span className="text-[12px] font-bold text-white">{val}</span>;
};

export default function PerfilPage() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto space-y-10">
        
        {/* TÍTULO DA PÁGINA */}
        <div className="space-y-1">
          <h1 className="text-4xl font-serif font-black text-foreground">Minha Conta</h1>
          <p className="text-muted-foreground text-sm font-medium">Gerencie seu plano, configurações e preferências do sistema.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: PERFIL */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="bg-card border-border/40 rounded-[28px] p-6 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="h-16 w-16 bg-muted/50 rounded-xl flex items-center justify-center border border-border/5">
                    <div className="h-8 w-8 border-2 border-primary/40 rounded-sm rotate-45 flex items-center justify-center">
                       <div className="h-4 w-4 bg-primary/20" />
                    </div>
                  </div>
                  <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-10 px-4 font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-[#00bfa5]/20 border-none">
                    <Camera className="h-4 w-4" />
                    Trocar Foto
                  </Button>
                </div>

                <div className="space-y-4">
                  <ProfileField label="Nome" value="ADM MASTER" required />
                  <ProfileField label="Email" value="master@alphatrainer.com.br" required />
                  
                  <div className="space-y-1 w-full">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Sou um(a)</label>
                    <Select defaultValue="academia">
                      <SelectTrigger className="h-11 bg-muted/40 border-none rounded-xl font-bold text-sm focus:ring-primary/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academia">Academia</SelectItem>
                        <SelectItem value="personal">Personal Trainer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <ProfileField label="Data de Nascimento" value="01/01/2000" icon={Calendar} />
                  <ProfileField label="Telefone" value="0000" icon={Phone} />
                  <ProfileField label="Cpf" value="-" icon={IdCard} />
                  <ProfileField label="Senha" value="********" type="password" icon={Eye} />

                  <div className="space-y-1 w-full">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Tipo de conta</label>
                    <Select defaultValue="admin">
                      <SelectTrigger className="h-11 bg-muted/40 border-none rounded-xl font-bold text-sm focus:ring-primary/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="usuario">Usuário Comum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1 w-full">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Texto para convite</label>
                    <Textarea 
                      defaultValue="Olá bem vindo(a) ao meu time, agora vamos buscar resultados reais e"
                      className="bg-muted/40 border-none rounded-xl font-bold text-xs focus-visible:ring-primary/30 min-h-[80px] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest gap-2">
                      <Save className="h-4 w-4" />
                      Salvar
                    </Button>
                    <Button variant="outline" className="rounded-xl h-12 font-black uppercase text-[10px] tracking-widest gap-2 text-destructive border-destructive/20 hover:bg-destructive/10">
                      <X className="h-4 w-4" />
                      Limpar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* COLUNA DIREITA: PLANOS E CONFIGURAÇÕES */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* TABELA DE PLANOS */}
            <Card className="bg-card border-border/40 rounded-[28px] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border/10">
                      <th className="p-6 text-left min-w-[200px]">
                        <div className="flex items-center gap-3">
                          <Crown className="h-6 w-6 text-yellow-500 fill-yellow-500/20" />
                          <span className="text-lg font-black uppercase italic tracking-tighter text-foreground">Planos e Recursos</span>
                        </div>
                      </th>
                      {planHeaders.map((h, i) => (
                        <th key={i} className={cn("p-0 text-center min-w-[120px] relative", h.color)}>
                          {h.badge && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black uppercase px-3 py-1 rounded-full whitespace-nowrap shadow-xl z-20">
                              {h.badge}
                            </div>
                          )}
                          <div className={cn("flex flex-col items-center py-6 px-4 gap-1", h.color)}>
                            <span className="text-[10px] font-black text-white/60 tracking-widest">{h.label}</span>
                            <span className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">{h.price}</span>
                            {h.subPrice && <span className="text-[9px] font-bold text-white/50">{h.subPrice}</span>}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {planFeatures.map((feature, idx) => (
                      <tr key={idx} className="group hover:bg-muted/30 transition-colors border-b border-border/10 last:border-none">
                        <td className="p-4 px-6 font-bold text-sm text-foreground/80">
                          {feature.label}
                        </td>
                        {feature.values.map((val, vIdx) => (
                          <td key={vIdx} className={cn("p-4 text-center border-l border-white/5", planHeaders[vIdx].color)}>
                            <PlanValue val={val} />
                            {idx === planFeatures.length - 1 && vIdx > 0 && (
                                <div className="mt-4">
                                  <Button variant="outline" className="bg-white text-black border-none h-8 rounded-full font-black text-[9px] uppercase tracking-widest px-4 hover:bg-white/90">COMPRAR</Button>
                                </div>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* CONFIGURAÇÕES DO SISTEMA */}
            <Card className="bg-card border-border/40 rounded-[28px] p-8 shadow-2xl space-y-10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Settings className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Configurações do Sistema</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vencimento */}
                <div className="bg-muted/30 rounded-2xl p-6 space-y-4 border border-border/5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-foreground">Vencimento dos alunos</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">Defina como será controlado o vencimento dos seus alunos.</p>
                    </div>
                  </div>
                  <RadioGroup defaultValue="periodizacao" className="grid grid-cols-1 gap-3 pt-2">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="periodizacao" id="r1" className="border-primary text-primary" />
                      <label htmlFor="r1" className="text-xs font-bold text-foreground/80 cursor-pointer">Pela data final da periodização</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="plano" id="r2" className="border-primary text-primary" />
                      <label htmlFor="r2" className="text-xs font-bold text-foreground/80 cursor-pointer">Pela data do plano contratado</label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Dias de Tolerância */}
                <div className="bg-muted/30 rounded-2xl p-6 space-y-4 border border-border/5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-foreground">Dias de tolerância</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">Mesmo após o vencimento, o aluno continuará com acesso durante esse período.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Input className="w-16 h-10 bg-background/50 border-border/40 rounded-lg text-center font-bold" defaultValue="7" />
                    <span className="text-xs font-bold text-muted-foreground">dias</span>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { label: "Ocultar treinos após vencimento", desc: "Ao vencer o plano, os treinos deixam de aparecer no aplicativo do aluno.", checked: true },
                  { label: "Permitir acesso durante a tolerância", desc: "O aluno continua com acesso aos treinos durante o período de tolerância.", checked: true },
                  { label: "Enviar aviso antes do vencimento", desc: "Notificar o aluno sobre o vencimento do plano.", checked: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Switch defaultChecked={item.checked} className="mt-1" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight">{item.desc}</p>
                      {i === 2 && (
                        <div className="flex items-center gap-3 mt-3">
                           <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg border border-border/10">
                             <Calendar className="h-3 w-3 text-muted-foreground" />
                             <span className="text-[10px] font-black uppercase text-muted-foreground">Dias para aviso:</span>
                             <Select defaultValue="5">
                                <SelectTrigger className="h-6 w-12 bg-transparent border-none p-0 focus:ring-0 font-bold">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                   <SelectItem value="3">3</SelectItem>
                                   <SelectItem value="5">5</SelectItem>
                                   <SelectItem value="7">7</SelectItem>
                                </SelectContent>
                             </Select>
                           </div>
                           <span className="text-xs font-bold text-muted-foreground">dias</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mensagem para o aluno */}
              <div className="space-y-3 bg-muted/40 p-6 rounded-2xl border border-border/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mensagem para o aluno</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea 
                  defaultValue="Seu plano foi encerrado. Entre em contato com seu treinador para renovar seu acompanhamento."
                  className="bg-transparent border-none p-0 text-xs font-bold text-foreground focus-visible:ring-0 min-h-[60px] resize-none leading-relaxed"
                />
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}