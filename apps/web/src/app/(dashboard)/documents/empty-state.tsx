import { Cat, CheckCircle2 } from 'lucide-react';
import { match } from 'ts-pattern';

import { ExtendedDocumentStatus } from '@documenso/prisma/types/extended-document-status';

export type EmptyDocumentProps = { status: ExtendedDocumentStatus };

export const EmptyDocumentState = ({ status }: EmptyDocumentProps) => {
  const {
    title,
    message,
  } = match(status)
    .with(ExtendedDocumentStatus.COMPLETED, () => ({
      title: 'Nada por hacer',
      message:
        'Aún no hay documentos completados. Los documentos que hayas creado o recibido aparecerán aquí una vez completados.',
      icon: CheckCircle2,
    }))
    .with(ExtendedDocumentStatus.DRAFT, () => ({
      title: 'No hay borradores activos',
      message:
        'No hay borradores activos en este momento. Puedes subir un documento para comenzar a redactar.',
      icon: CheckCircle2,
    }))
    .with(ExtendedDocumentStatus.ALL, () => ({
      title: 'No hay documentos creados',
      message:
        'Aún no has creado ni recibido ningún documento. Para crear un documento, por favor, sube uno.',
     
    }))
    .otherwise(() => ({
      title: 'Nada por hacer',
      message:
        'Todos los documentos han sido procesados. Cualquier nuevo documento que se envíe o reciba se mostrará aquí.',
      icon: CheckCircle2,
    }));

  return (
    <div
      className="text-muted-foreground/60 flex h-60 flex-col items-center justify-center gap-y-4"
      data-testid="empty-document-state"
    >

      <div className="text-center">
        <h3 className="text-lg font-semibold">{title}</h3>

        <p className="mt-2 max-w-[60ch]">{message}</p>
      </div>
    </div>
  );
};
