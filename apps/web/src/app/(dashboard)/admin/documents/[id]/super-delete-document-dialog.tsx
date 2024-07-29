'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import type { Document } from '@documenso/prisma/client';
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

export type SuperDeleteDocumentDialogProps = {
  document: Document;
};

export const SuperDeleteDocumentDialog = ({ document }: SuperDeleteDocumentDialogProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [reason, setReason] = useState('');

  const { mutateAsync: deleteDocument, isLoading: isDeletingDocument } =
    trpc.admin.deleteDocument.useMutation();

  const handleDeleteDocument = async () => {
    try {
      if (!reason) {
        return;
      }

      await deleteDocument({ id: document.id, reason });

      toast({
        title: 'Documento eliminado',
        description: 'El documento se ha eliminado correctamente.',
        duration: 5000,
      });

      router.push('/admin/documents');
    } catch (err) {
      if (err instanceof TRPCClientError && err.data?.code === 'BAD_REQUEST') {
        toast({
          title: 'A ocurrido un error',
          description: err.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'A ocurrido un error desconocido',
          variant: 'destructive',
          description:
            err.message ??
            'Encontramos un error desconocido al intentar eliminar su documento. Por favor, inténtelo de nuevo más tarde.',
        });
      }
    }
  };

  return (
    <div>
      <div>
        <Alert
          className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row "
          variant="neutral"
        >
          <div>
            <AlertTitle>Eliminar el Documento</AlertTitle>
            <AlertDescription className="mr-2">
              Eliminar el documento. Esta acción es irreversible así que proceda con precaución.
            </AlertDescription>
          </div>

          <div className="flex-shrink-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Eliminar el Documento</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader className="space-y-4">
                  <DialogTitle>Eliminar el Documento</DialogTitle>

                  <Alert variant="destructive">
                    <AlertDescription className="selection:bg-red-100">
                      Esta acción no es reversible. Por favor esté seguro.
                    </AlertDescription>
                  </Alert>
                </DialogHeader>

                <div>
                  <DialogDescription>
                    Para confirmar, por favor introduce el motivo.
                  </DialogDescription>

                  <Input
                    className="mt-2"
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>

                <DialogFooter>
                  <Button
                    onClick={handleDeleteDocument}
                    loading={isDeletingDocument}
                    variant="destructive"
                    disabled={!reason}
                  >
                    {isDeletingDocument ? 'Eliminando documento...' : 'Eliminar documento'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Alert>
      </div>
    </div>
  );
};
