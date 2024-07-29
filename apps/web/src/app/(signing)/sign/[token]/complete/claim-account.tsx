'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAnalytics } from '@documenso/lib/client-only/hooks/use-analytics';
import { TRPCClientError } from '@documenso/trpc/client';
import { trpc } from '@documenso/trpc/react';
import { ZPasswordSchema } from '@documenso/trpc/server/auth-router/schema';
import { Button } from '@documenso/ui/primitives/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@documenso/ui/primitives/form/form';
import { Input } from '@documenso/ui/primitives/input';
import { PasswordInput } from '@documenso/ui/primitives/password-input';
import { useToast } from '@documenso/ui/primitives/use-toast';

export type ClaimAccountProps = {
  defaultName: string;
  defaultEmail: string;
  trigger?: React.ReactNode;
};

export const ZClaimAccountFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Por favor ingrese un nombre valido.' }),
    email: z.string().email().min(1),
    password: ZPasswordSchema,
  })
  .refine(
    (data) => {
      const { name, email, password } = data;
      return !password.includes(name) && !password.includes(email.split('@')[0]);
    },
    {
      message: 'La contraseña no debe ser común ni estar basada en información personal.',
      path: ['password'],
    },
  );

export type TClaimAccountFormSchema = z.infer<typeof ZClaimAccountFormSchema>;

export const ClaimAccount = ({ defaultName, defaultEmail }: ClaimAccountProps) => {
  const analytics = useAnalytics();
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync: signup } = trpc.auth.signup.useMutation();

  const form = useForm<TClaimAccountFormSchema>({
    values: {
      name: defaultName ?? '',
      email: defaultEmail,
      password: '',
    },
    resolver: zodResolver(ZClaimAccountFormSchema),
  });

  const onFormSubmit = async ({ name, email, password }: TClaimAccountFormSchema) => {
    try {
      await signup({ name, email, password });

      router.push(`/unverified-account`);

      toast({
        title: 'Registro exitoso',
        description:
          'Se ha registrado exitosamente. Verifique su cuenta haciendo clic en el enlace que recibió en el correo electrónico.',
        duration: 5000,
      });

      analytics.capture('App: User Claim Account', {
        email,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      if (error instanceof TRPCClientError && error.data?.code === 'BAD_REQUEST') {
        toast({
          title: 'A ocurrido un error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'A ocurrido un error un error desconocido',
          description:
            'Encontramos un error desconocido al intentar registrarte. Por favor, inténtelo de nuevo más tarde.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="mt-2 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)}>
          <fieldset disabled={form.formState.isSubmitting} className="mt-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ingresa tu correo electrónico" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Establecer una contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Elige una contraseña" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-6 w-full" loading={form.formState.isSubmitting}>
              Crear cuenta
            </Button>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};
