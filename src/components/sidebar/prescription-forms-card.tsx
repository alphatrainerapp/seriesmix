'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PrescriptionFormsCard() {
  return (
    <Card className="bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Formulários de Prescrição</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Este cliente ainda não preencheu nenhum formulário.
        </p>
        <Button className="w-full">Liberar</Button>
      </CardContent>
    </Card>
  );
}
