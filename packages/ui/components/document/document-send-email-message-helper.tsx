'use client';

import React from 'react';

export const DocumentSendEmailMessageHelper = () => {
  return (
    <div>
      <p className="text-muted-foreground text-sm">
        Puede utilizar las siguientes variables en su mensaje:
      </p>

      <ul className="mt-2 flex list-inside list-disc flex-col gap-y-2 text-sm">
        <li className="text-muted-foreground">
          <code className="text-muted-foreground bg-muted-foreground/20 rounded p-1 text-sm">
            {'{signer.name}'}
          </code>{' '}
          - el nombre del firmante
        </li>
        <li className="text-muted-foreground">
          <code className="text-muted-foreground bg-muted-foreground/20 rounded p-1 text-sm">
            {'{signer.email}'}
          </code>{' '}
          - El correo electrónico del firmante
        </li>
        <li className="text-muted-foreground">
          <code className="text-muted-foreground bg-muted-foreground/20 rounded p-1 text-sm">
            {'{document.name}'}
          </code>{' '}
          - El nombre del documento.
        </li>
      </ul>
    </div>
  );
};
