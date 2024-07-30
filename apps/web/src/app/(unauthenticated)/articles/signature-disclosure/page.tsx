import Link from 'next/link';

import { Button } from '@documenso/ui/primitives/button';

export default function SignatureDisclosure() {
  return (
    <div>
      <article className="prose dark:prose-invert">
        <h1>Firma electrónica</h1>
      </article>

      <div className="mt-8">
        <Button asChild>
          <Link href="/documents">Volver</Link>
        </Button>
      </div>
    </div>
  );
}
