'use client';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export function ClientProfileCard() {
  const clientAvatar = PlaceHolderImages.find(
    (img) => img.id === 'client-avatar'
  );

  return (
    <Card className="p-4 flex flex-col items-center bg-card shadow-sm">
      <div className="w-24 h-24 rounded-full overflow-hidden">
        {clientAvatar && (
          <Image
            src={clientAvatar.imageUrl}
            alt={clientAvatar.description}
            width={96}
            height={96}
            className="object-cover"
            data-ai-hint={clientAvatar.imageHint}
          />
        )}
      </div>
      <p className="font-semibold mt-2">Anadelis de Oliveira</p>
      <Link
        href="#"
        className="text-sm text-primary hover:underline mt-1"
      >
        Ver Perfil
      </Link>
    </Card>
  );
}
