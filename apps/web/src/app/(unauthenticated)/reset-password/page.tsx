import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@documenso/ui/primitives/button';

export const metadata: Metadata = {
  title: 'Restablecer',
};

export default function ResetPasswordPage() {
  return (
    <div className="w-screen max-w-lg px-4">
      <div className="w-full">
        <h1 className="text-3xl font-semibold">No se puede restablecer la contraseña</h1>

        <p className="text-muted-foreground mt-2 text-sm">
          El token que has utilizado para restablecer tu contraseña está vencido o nunca existió. Si aún has olvidado tu contraseña, por favor solicita un nuevo enlace de restablecimiento.
        </p>

        <Button className="mt-4" asChild>
          <Link href="/signin">Volver a iniciar sesión</Link>
        </Button>
      </div>
    </div>
  );
}
