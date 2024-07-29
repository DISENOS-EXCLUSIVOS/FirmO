'use client';

import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@documenso/ui/primitives/dialog';

export type MissingSignatureFieldDialogProps = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

export const MissingSignatureFieldDialog = ({
  isOpen,
  onOpenChange,
}: MissingSignatureFieldDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg" position="center">
        <DialogHeader>
          <DialogTitle>No se encontró ningún campo de firma</DialogTitle>
          <DialogDescription>
            <p className="mt-2">
              A algunos firmantes no se les ha asignado un campo de firma. Por favor asigne al menos
              1 campo de firma a cada firmante antes de continuar.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
