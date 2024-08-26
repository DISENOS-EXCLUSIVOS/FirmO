import { RecipientRole } from '@documenso/prisma/client';

export const RECIPIENT_ROLES_DESCRIPTION = {
  [RecipientRole.APPROVER]: {
    actionVerb: 'Aprobar',
    actioned: 'Aprobado',
    progressiveVerb: 'Aprobando',
    roleName: 'Aprobador',
  },
  [RecipientRole.CC]: {
    actionVerb: 'CC',
    actioned: `CC'd`,
    progressiveVerb: 'CC',
    roleName: 'Cc',
  },
  [RecipientRole.SIGNER]: {
    actionVerb: 'Firmar',
    actioned: 'Firmado',
    progressiveVerb: 'Firmando',
    roleName: 'Firmante',
  },
  [RecipientRole.VIEWER]: {
    actionVerb: 'Visualizar',
    actioned: 'Visto',
    progressiveVerb: 'visualizando',
    roleName: 'Observador',
  },
} satisfies Record<keyof typeof RecipientRole, unknown>;

export const RECIPIENT_ROLE_TO_EMAIL_TYPE = {
  [RecipientRole.SIGNER]: 'SIGNING_REQUEST',
  [RecipientRole.VIEWER]: 'VIEW_REQUEST',
  [RecipientRole.APPROVER]: 'APPROVE_REQUEST',
} as const;

export const RECIPIENT_ROLE_SIGNING_REASONS = {
  [RecipientRole.SIGNER]: 'Soy firmante de este documento',
  [RecipientRole.APPROVER]: 'Soy un aprobador de este documento.',
  [RecipientRole.CC]: 'Debo recibir una copia de este documento',
  [RecipientRole.VIEWER]: 'Soy un espectador de este documento.',
} satisfies Record<keyof typeof RecipientRole, string>;
