'use client';

import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

import { Button } from '@documenso/ui/primitives/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80vh] w-full items-center justify-center py-32">
      <div>
        <p className="text-muted-foreground font-semibold">404 Equipo no encontrado</p>

        <h1 className="mt-3 text-2xl font-bold md:text-3xl">¡Ups! Algo salió mal.</h1>

        <p className="text-muted-foreground mt-4 text-sm">
          Es posible que el equipo que está buscando haya sido eliminado, haya cambiado de nombre o
          que nunca haya existido.
        </p>

        <div className="mt-6 flex gap-x-2.5 gap-y-4 md:items-center">
          <Button asChild className="w-32">
            <Link href="/settings/teams">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Regresar
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
