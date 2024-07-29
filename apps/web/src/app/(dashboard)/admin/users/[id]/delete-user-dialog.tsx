'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import type { User } from '@documenso/prisma/client';
import { TRPCClientError } from '@documenso/trpc/client';
import { trpc } from '@documenso/trpc/react';
import { Alert, AlertDescription, AlertTitle } from '@documenso/ui/primitives/alert';
import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@documenso/ui/primitives/dialog';
import { Input } from '@documenso/ui/primitives/input';
import { useToast } from '@documenso/ui/primitives/use-toast';

export type DeleteUserDialogProps = {
  className?: string;
  user: User;
};

export const DeleteUserDialog = ({ className, user }: DeleteUserDialogProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');

  const { mutateAsync: deleteUser, isLoading: isDeletingUser } =
    trpc.admin.deleteUser.useMutation();

  const onDeleteAccount = async () => {
    try {
      await deleteUser({
        id: user.id,
        email,
      });

      toast({
        title: 'Cuenta borrada',
        description: 'La cuenta ha sido eliminada exitosamente.',
        duration: 5000,
      });

      router.push('/admin/users');
    } catch (err) {
      if (err instanceof TRPCClientError && err.data?.code === 'BAD_REQUEST') {
        toast({
          title: 'Ocurrió un error',
          description: err.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Un error desconocido ocurrió',
          variant: 'destructive',
          description:
            err.message ??
            'Encontramos un error desconocido al intentar eliminar su cuenta. Por favor, inténtelo de nuevo más tarde.',
        });
      }
    }
  };

  return (
    <div className={className}>
      <Alert
        className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row "
        variant="neutral"
      >
        <div>
          <AlertTitle>Eliminar cuenta</AlertTitle>
          <AlertDescription className="mr-2">
            Eliminar la cuenta del usuario y todo su contenido. Esta acción es irreversible y
            cancelar su suscripción, así que proceda con precaución.
          </AlertDescription>
        </div>

        <div className="flex-shrink-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Eliminar cuenta</Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader className="space-y-4">
                <DialogTitle>Eliminar cuenta</DialogTitle>

                <Alert variant="destructive">
                  <AlertDescription className="selection:bg-red-100">
                    Esta acción no es reversible. Por favor esté seguro.
                  </AlertDescription>
                </Alert>
              </DialogHeader>

              <div>
                <DialogDescription>
                  Para confirmar, ingrese la dirección de correo electrónico de la cuenta.
                  <br />({user.email}).
                </DialogDescription>

                <Input
                  className="mt-2"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button
                  onClick={onDeleteAccount}
                  loading={isDeletingUser}
                  variant="destructive"
                  disabled={email !== user.email}
                >
                  {isDeletingUser ? 'Eliminando cuenta...' : 'Eliminar cuenta'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Alert>
    </div>
  );
};
