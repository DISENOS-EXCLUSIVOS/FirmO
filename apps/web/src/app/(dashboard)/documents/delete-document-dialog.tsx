import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { match } from 'ts-pattern';

import { DocumentStatus } from '@documenso/prisma/client';
import { trpc as trpcReact } from '@documenso/trpc/react';
import { Alert, AlertDescription } from '@documenso/ui/primitives/alert';
import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@documenso/ui/primitives/dialog';
import { Input } from '@documenso/ui/primitives/input';
import { useToast } from '@documenso/ui/primitives/use-toast';

type DeleteDocumentDialogProps = {
  id: number;
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  status: DocumentStatus;
  documentTitle: string;
  teamId?: number;
  canManageDocument: boolean;
};

export const DeleteDocumentDialog = ({
  id,
  open,
  onOpenChange,
  status,
  documentTitle,
  teamId,
  canManageDocument,
}: DeleteDocumentDialogProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const [inputValue, setInputValue] = useState('');
  const [isDeleteEnabled, setIsDeleteEnabled] = useState(status === DocumentStatus.DRAFT);

  const { mutateAsync: deleteDocument, isLoading } = trpcReact.document.deleteDocument.useMutation({
    onSuccess: () => {
      router.refresh();

      toast({
        title: 'Documento eliminado',
        description: `"${documentTitle}" ha sido eliminado exitosamente`,
        duration: 5000,
      });

      onOpenChange(false);
    },
  });

  useEffect(() => {
    if (open) {
      setInputValue('');
      setIsDeleteEnabled(status === DocumentStatus.DRAFT);
    }
  }, [open, status]);

  const onDelete = async () => {
    try {
      await deleteDocument({ id, teamId });
    } catch {
      toast({
        title: 'Algo salió mal',
        description: 'Este documento no se pudo eliminar en este momento. Inténtalo de nuevo.',
        variant: 'destructive',
        duration: 7500,
      });
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsDeleteEnabled(event.target.value === 'eliminar');
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !isLoading && onOpenChange(value)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Está seguro?</DialogTitle>

          <DialogDescription>
            Estas a punto de {canManageDocument ? 'eliminar' : 'esconder'}{' '}
            <strong>"{documentTitle}"</strong>
          </DialogDescription>
        </DialogHeader>

        {canManageDocument ? (
          <Alert variant="warning" className="-mt-1">
            {match(status)
              .with(DocumentStatus.DRAFT, () => (
                <AlertDescription>
                  Tenga en cuenta que esta acción es <strong>irreversible</strong>. Una vez
                  confirmado, Este documento será eliminado permanentemente.
                </AlertDescription>
              ))
              .with(DocumentStatus.PENDING, () => (
                <AlertDescription>
                  <p>
                    Tenga en cuenta que esta acción es <strong>irreversible</strong>.
                  </p>

                  <p className="mt-1">Una vez confirmado, ocurrirá lo siguiente:</p>

                  <ul className="mt-0.5 list-inside list-disc">
                    <li>El documento se eliminará permanentemente.</li>
                    <li>Se cancelará el proceso de firma de documentos.</li>
                    <li>Todas las firmas insertadas serán anuladas.</li>
                    <li>Todos los destinatarios serán notificados.</li>
                  </ul>
                </AlertDescription>
              ))
              .with(DocumentStatus.COMPLETED, () => (
                <AlertDescription>
                  <p>Al eliminar este documento, ocurrirá lo siguiente:</p>

                  <ul className="mt-0.5 list-inside list-disc">
                    <li>El documento se ocultará de su cuenta.</li>
                    <li>Los destinatarios seguirán conservando su copia del documento.</li>
                  </ul>
                </AlertDescription>
              ))
              .exhaustive()}
          </Alert>
        ) : (
          <Alert variant="warning" className="-mt-1">
            <AlertDescription>
              Comuníquese con Desarrollo TI si desea revertir esta acción.
            </AlertDescription>
          </Alert>
        )}

        {status !== DocumentStatus.DRAFT && canManageDocument && (
          <Input
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder="Escribe 'eliminar' para confirmar"
          />
        )}

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>

          <Button
            type="button"
            loading={isLoading}
            onClick={onDelete}
            disabled={!isDeleteEnabled && canManageDocument}
            variant="destructive"
          >
            {canManageDocument ? 'Borrar' : 'Esconder'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
