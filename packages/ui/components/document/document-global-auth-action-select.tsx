'use client';

import React, { forwardRef } from 'react';

import type { SelectProps } from '@radix-ui/react-select';
import { InfoIcon } from 'lucide-react';

import { DOCUMENT_AUTH_TYPES } from '@documenso/lib/constants/document-auth';
import { DocumentActionAuth, DocumentAuth } from '@documenso/lib/types/document-auth';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@documenso/ui/primitives/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@documenso/ui/primitives/tooltip';

export const DocumentGlobalAuthActionSelect = forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => (
    <Select {...props}>
      <SelectTrigger className="bg-background text-muted-foreground">
        <SelectValue ref={ref} data-testid="documentActionSelectValue" placeholder="None" />
      </SelectTrigger>

      <SelectContent position="popper">
        {Object.values(DocumentActionAuth)
          .filter((auth) => auth !== DocumentAuth.ACCOUNT)
          .map((authType) => (
            <SelectItem key={authType} value={authType}>
              {DOCUMENT_AUTH_TYPES[authType].value}
            </SelectItem>
          ))}

        {/* Note: -1 is remapped in the Zod schema to the required value. */}
        <SelectItem value={'-1'}>Ninguno</SelectItem>
      </SelectContent>
    </Select>
  ),
);

DocumentGlobalAuthActionSelect.displayName = 'DocumentGlobalAuthActionSelect';

export const DocumentGlobalAuthActionTooltip = () => (
  <Tooltip>
    <TooltipTrigger>
      <InfoIcon className="mx-2 h-4 w-4" />
    </TooltipTrigger>

    <TooltipContent className="text-foreground max-w-md space-y-2 p-4">
      <h2>
        <strong>Autenticación de acción de destinatario global</strong>
      </h2>

      <p>La autenticación requerida para que los destinatarios firmen el campo de firma.</p>

      <p>
        Esto se puede anular configurando los requisitos de autenticación directamente en cada
        destinatario. en el siguiente paso.
      </p>

      <ul className="ml-3.5 list-outside list-disc space-y-0.5 py-2">
        {/* <li>
          <strong>Require account</strong> - The recipient must be signed in
        </li> */}
        <li>
          <strong>Requeriere clave de acceso</strong> - El destinatario debe tener una cuenta y
          clave de acceso configurada a través de su configuración
        </li>
        <li>
          <strong>Requiere 2FA</strong> - El destinatario debe tener una cuenta y 2FA habilitado a
          través de sus configuraciones
        </li>
        <li>
          <strong>Ninguno</strong> - Sin autenticación requerida
        </li>
      </ul>
    </TooltipContent>
  </Tooltip>
);
