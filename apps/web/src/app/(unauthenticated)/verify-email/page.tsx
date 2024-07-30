import type { Metadata } from 'next';
import Link from 'next/link';

import { XCircle } from 'lucide-react';

import { Button } from '@documenso/ui/primitives/button';

export const metadata: Metadata = {
  title: 'Verificar correo electrónico',
};

export default function EmailVerificationWithoutTokenPage() {
  return (
    <div className="w-screen max-w-lg px-4">
      <div className="flex w-full items-start">
        <div className="mr-4 mt-1 hidden md:block">
          <XCircle className="text-destructive h-10 w-10" strokeWidth={2} />
        </div>

        <div>
          <h2 className="text-2xl font-bold md:text-4xl">¡UH oh! Parece que te falta una ficha</h2>

          <p className="text-muted-foreground mt-4">
            Parece que no se ha proporcionado ningún token. Si estás intentando verificar tu correo
            electrónico, por favor sigue el enlace en tu correo electrónico.
          </p>

          <Button className="mt-4" asChild>
            <Link href="/">Inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
