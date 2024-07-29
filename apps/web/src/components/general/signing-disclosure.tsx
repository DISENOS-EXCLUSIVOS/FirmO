import type { HTMLAttributes } from 'react';

import Link from 'next/link';

import { cn } from '@documenso/ui/lib/utils';

export type SigningDisclosureProps = HTMLAttributes<HTMLParagraphElement>;

export const SigningDisclosure = ({ className, ...props }: SigningDisclosureProps) => {
  return (
    <p className={cn('text-muted-foreground text-xs', className)} {...props}>
      Al proceder con su firma electrónica, usted reconoce y consiente que se utilizará para firmar
      el documento dado y tiene la misma validez legal que una firma manuscrita. Al completar el
      proceso de firma electrónica, usted afirma su comprensión y aceptación de estas condiciones.
      <span className="mt-2 block">
        lea la{' '}
        <Link
          className="text-documenso-700 underline"
          href="/articles/signature-disclosure"
          target="_blank"
        >
          divulgación completa de la firma
        </Link>
        .
      </span>
    </p>
  );
};
