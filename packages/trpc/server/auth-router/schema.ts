import { z } from 'zod';

import { ZBaseTableSearchParamsSchema } from '@documenso/lib/types/search-params';
import { ZRegistrationResponseJSONSchema } from '@documenso/lib/types/webauthn';

export const ZCurrentPasswordSchema = z
  .string()
  .min(6, { message: 'Must be at least 6 characters in length' })
  .max(72);

export const ZPasswordSchema = z
  .string()
  .regex(new RegExp('.*[A-Z].*'), { message: 'Al menos una mayúscula' })
  .regex(new RegExp('.*[a-z].*'), { message: 'Al menos una minúscula' })
  .regex(new RegExp('.*\\d.*'), { message: 'Al menos un número' })
  .regex(new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'), {
    message: 'Al menos un carácter especial',
  })
  .min(8, { message: 'Al menos 8 caractéres' })
  .max(72, { message: 'No más de 72 caractéres' });

export const ZSignUpMutationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: ZPasswordSchema,
  signature: z.string().nullish(),
  url: z
    .string()
    .trim()
    .toLowerCase()
    .min(1)
    .regex(/^[a-z0-9-]+$/, {
      message: 'El nombre de usuario solo debe tener letras minúsculas, números y guiones',
    })
    .optional(),
});

export const ZCreatePasskeyMutationSchema = z.object({
  passkeyName: z.string().trim().min(1),
  verificationResponse: ZRegistrationResponseJSONSchema,
});

export const ZCreatePasskeyAuthenticationOptionsMutationSchema = z
  .object({
    preferredPasskeyId: z.string().optional(),
  })
  .optional();

export const ZDeletePasskeyMutationSchema = z.object({
  passkeyId: z.string().trim().min(1),
});

export const ZUpdatePasskeyMutationSchema = z.object({
  passkeyId: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

export const ZFindPasskeysQuerySchema = ZBaseTableSearchParamsSchema.extend({
  orderBy: z
    .object({
      column: z.enum(['createdAt', 'updatedAt', 'name']),
      direction: z.enum(['asc', 'desc']),
    })
    .optional(),
});

export type TSignUpMutationSchema = z.infer<typeof ZSignUpMutationSchema>;

export const ZVerifyPasswordMutationSchema = ZSignUpMutationSchema.pick({ password: true });
