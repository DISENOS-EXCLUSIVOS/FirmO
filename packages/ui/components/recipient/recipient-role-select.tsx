'use client';

import React, { forwardRef } from 'react';

import type { SelectProps } from '@radix-ui/react-select';
import { InfoIcon } from 'lucide-react';

import { RecipientRole } from '@documenso/prisma/client';
import { ROLE_ICONS } from '@documenso/ui/primitives/recipient-role-icons';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@documenso/ui/primitives/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@documenso/ui/primitives/tooltip';

export type RecipientRoleSelectProps = SelectProps & {
  hideCCRecipients?: boolean;
};

export const RecipientRoleSelect = forwardRef<HTMLButtonElement, RecipientRoleSelectProps>(
  ({ hideCCRecipients, ...props }, ref) => (
    <Select {...props}>
      <SelectTrigger ref={ref} className="bg-background w-[60px]" style={{ color: "white" }}>
        {ROLE_ICONS[props.value as RecipientRole]}
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value={RecipientRole.SIGNER}>
          <div className="flex items-center">
            <div className="flex w-[150px] items-center">
              <span className="mr-2">{ROLE_ICONS[RecipientRole.SIGNER]}</span>
              Necesita firmar
            </div>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="text-foreground z-9999 max-w-md p-4">
                <p>El destinatario debe firmar el documento para que se complete.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </SelectItem>

        <SelectItem value={RecipientRole.APPROVER} >
          <div className="flex items-center">
            <div className="flex w-[150px] items-center">
              <span className="mr-2">{ROLE_ICONS[RecipientRole.APPROVER]}</span>
              Necesita aprobar
            </div>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="text-foreground z-9999 max-w-md p-4">
                <p>El destinatario debe aprobar el documento para que se complete.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </SelectItem>

        <SelectItem value={RecipientRole.VIEWER} >
          <div className="flex items-center">
            <div className="flex w-[150px] items-center">
              <span className="mr-2">{ROLE_ICONS[RecipientRole.VIEWER]}</span>
              Necesita ver
            </div>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="text-foreground z-9999 max-w-md p-4">
                <p>El destinatario debe ver el documento para completarlo.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </SelectItem>

        {!hideCCRecipients && (
          <SelectItem value={RecipientRole.CC} >
            <div className="flex items-center">
              <div className="flex w-[150px] items-center">
                <span className="mr-2">{ROLE_ICONS[RecipientRole.CC]}</span>
                Recibe copia
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent className="text-foreground z-9999 max-w-md p-4">
                  <p>
                    El destinatario no está obligado a realizar ninguna acción y recibe una copia de
                    la documento una vez finalizado.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </SelectItem>
        )}
      </SelectContent>

    </Select>
  ),
);

RecipientRoleSelect.displayName = 'RecipientRoleSelect';
