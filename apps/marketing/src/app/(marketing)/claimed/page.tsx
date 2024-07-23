import { Caveat } from 'next/font/google';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { ArrowRight } from 'lucide-react';

import { NEXT_PUBLIC_WEBAPP_URL } from '@documenso/lib/constants/app';
import { redis } from '@documenso/lib/server-only/redis';
import { stripe } from '@documenso/lib/server-only/stripe';
import { prisma } from '@documenso/prisma';
import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';

import { PasswordReveal } from '~/components/(marketing)/password-reveal';

export const dynamic = 'force-dynamic';

const fontCaveat = Caveat({
  weight: ['500'],
  subsets: ['latin'],
  display: 'swap',
});

export type ClaimedPlanPageProps = {
  searchParams?: {
    sessionId?: string;
  };
};

export default async function ClaimedPlanPage({ searchParams = {} }: ClaimedPlanPageProps) {
  const { sessionId } = searchParams;

  if (typeof sessionId !== 'string') {
    redirect('/');
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;

  if (!customerId) {
    redirect('/');
  }

  const customer = await stripe.customers.retrieve(customerId);

  if (!customer || customer.deleted) {
    redirect('/');
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(customer.metadata.userId),
    },
  });

  if (!user) {
    redirect('/');
  }

  const signatureText = session.metadata?.signatureText || user.name;
  let signatureDataUrl = '';

  if (session.metadata?.signatureDataUrl) {
    const result = await redis.get<string>(`signature:${session.metadata.signatureDataUrl}`);

    if (result) {
      signatureDataUrl = result;
    }
  }

  const password = await redis.get<string>(`user:${user.id}:temp-password`);

  return (
    <div className="mt-12">
      <h1 className="text-foreground text-3xl font-bold md:text-4xl">
        Bienvenido a <span className="text-primary">FirmO</span> <u>{user.name}</u>
      </h1>

      {/* <p className="text-muted-foreground mt-4 max-w-prose text-base md:text-lg">
        It's not every day you get to be part of a revolution.
      </p> */}

      {/* <p className="text-muted-foreground mt-4 max-w-prose text-base md:text-lg">
        But today is that day, by signing up to Documenso, you're joining a movement of people who
        want to make the world a better place.
      </p> */}

      {/* <p className="text-muted-foreground mt-4 max-w-prose text-base md:text-lg">
        We're going to change the way people sign documents. We're going to make it easier, faster,
        and more secure. And we're going to do it together.
      </p> */}

      <div className="mt-12">
        {/* <h2 className="text-foreground text-2xl font-bold">Let's do it together</h2> */}

        <div className="-mx-4 mt-8 flex md:-mx-8">
          <div className="flex flex-1 flex-col justify-end gap-y-4 border-r px-4 last:border-r-0 md:px-8 lg:flex-none">
            <p
              className={cn(
                'text-foreground text-4xl font-semibold md:text-5xl',
                fontCaveat.className,
              )}
            >
              FirmO
            </p>

            <p className="text-muted-foreground text-sm md:text-lg">
              FirmO
              <span className="block lg:hidden" />
              <span className="hidden lg:inline"> - </span>
              FirmO
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-y-4 border-r px-4 last:border-r-0 md:px-8 lg:flex-none">
            <p
              className={cn(
                'text-foreground text-4xl font-semibold md:text-5xl',
                fontCaveat.className,
              )}
            >
              FirmO
            </p>

            <p className="text-muted-foreground text-sm md:text-lg">
              FirmO
              <span className="block lg:hidden" />
              <span className="hidden lg:inline"> - </span>
              FirmO
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-end gap-y-4 border-r px-4 last:border-r-0 md:px-8 lg:flex-none">
            {signatureDataUrl && (
              <img
                src={signatureDataUrl}
                alt="your-signature"
                className="max-w-[172px] dark:invert"
              />
            )}
            {!signatureDataUrl && (
              <p
                className={cn(
                  'text-foreground text-4xl font-semibold md:text-5xl',
                  fontCaveat.className,
                )}
              >
                {signatureText}
              </p>
            )}

            <p className="text-muted-foreground text-sm md:text-lg">
              {user.name}
              <span className="block lg:hidden" />
              <span className="hidden lg:inline"> - </span>
              FirmO
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-foreground text-2xl font-bold">Tus detalles de inicio de sesión</h2>

        <div className="mt-4">
          <p className="text-muted-foreground text-lg">
            <span className="font-bold">Correo:</span> {user.email}
          </p>

          <p className="text-muted-foreground mt-2 text-lg">
            <span className="font-bold">Contraseña:</span>{' '}
            <PasswordReveal password={password ?? 'password'} />
          </p>
        </div>

        <p className="text-muted-foreground mt-4 text-sm italic">
          Esta es una contraseña temporal. Por favor cámbielo lo antes posible.
        </p>

        <Link href={`${NEXT_PUBLIC_WEBAPP_URL()}/signin`} target="_blank" className="mt-4 block">
          <Button size="lg" className="text-base">
            ¡Empecemos!
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
