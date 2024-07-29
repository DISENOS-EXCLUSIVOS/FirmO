import { z } from 'zod';

export const ZAddSignatureFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electronico es requerido' })
    .email({ message: 'Dirección de correo electrónico no válida' }),
  name: z.string(),
  customText: z.string(),
  signature: z.string(),
});

export type TAddSignatureFormSchema = z.infer<typeof ZAddSignatureFormSchema>;
