import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@documenso/ui/primitives/button';

export const metadata: Metadata = {
  title: 'Olvidé mi clave',
};

export default function ForgotPasswordPage() {
  return (
    <div className="w-screen max-w-lg px-4">
      <div className="w-full">
        <h1 className="text-4xl font-semibold">Correo Enviado!</h1>

        <p className="text-muted-foreground mb-4 mt-2 text-sm">
          Se ha enviado un correo electrónico para restablecer la contraseña. Si tienes una cuenta,
          deberías verlo en tu Inbox en breve.
        </p>

        <Button asChild>
          <Link href="/signin">Volver para iniciar sesión</Link>
        </Button>
      </div>
    </div>
  );
}
