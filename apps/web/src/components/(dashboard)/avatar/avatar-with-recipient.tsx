'use client';

import React from 'react';

import { useCopyToClipboard } from '@documenso/lib/client-only/hooks/use-copy-to-clipboard';
import { getRecipientType } from '@documenso/lib/client-only/recipient-type';
import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { RECIPIENT_ROLES_DESCRIPTION } from '@documenso/lib/constants/recipient-roles';
import { recipientAbbreviation } from '@documenso/lib/utils/recipient-formatter';
import type { Recipient } from '@documenso/prisma/client';
import { DocumentStatus } from '@documenso/prisma/client';
import { cn } from '@documenso/ui/lib/utils';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { StackAvatar } from './stack-avatar';

export type AvatarWithRecipientProps = {
  recipient: Recipient;
  documentStatus: DocumentStatus;
};

export function AvatarWithRecipient({ recipient, documentStatus }: AvatarWithRecipientProps) {
  const [, copy] = useCopyToClipboard();
  const { toast } = useToast();

  const signingToken = documentStatus === DocumentStatus.PENDING ? recipient.token : null;

  const onRecipientClick = () => {
    if (!signingToken) {
      return;
    }

    void copy(`${NEXT_PUBLIC_WEBAPP_URL()}/sign/${signingToken}`).then(() => {
      toast({
        title: 'Copiado en el portapapeles',
        description: 'El enlace de firma se ha copiado en su portapapeles.',
      });
    });
  };

  return (
    <div
      className={cn('my-1 flex items-center gap-2', {
        'cursor-pointer hover:underline': signingToken,
      })}
      role={signingToken ? 'button' : undefined}
      title={
        signingToken
          ? 'Haga clic para copiar el enlace de firma para enviarlo al destinatario'
          : undefined
      }
      onClick={onRecipientClick}
    >
      <StackAvatar
        first={true}
        key={recipient.id}
        type={getRecipientType(recipient)}
        fallbackText={recipientAbbreviation(recipient)}
      />

      <div
        className="text-muted-foreground text-sm"
        title={
          signingToken
            ? 'Haga clic para copiar el enlace de firma para enviarlo al destinatario'
            : undefined
        }
      >
        <p>{recipient.email}</p>
        <p className="text-muted-foreground/70 text-xs">
          {RECIPIENT_ROLES_DESCRIPTION[recipient.role].roleName}
        </p>
      </div>
    </div>
  );
}
