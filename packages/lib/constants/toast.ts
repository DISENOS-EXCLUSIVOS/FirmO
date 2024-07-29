import { Toast } from '@documenso/ui/primitives/use-toast';

export const TOAST_DOCUMENT_SHARE_SUCCESS: Toast = {
  title: 'Copied to clipboard',
  description: 'The sharing link has been copied to your clipboard.',
} as const;

export const TOAST_DOCUMENT_SHARE_ERROR: Toast = {
  variant: 'destructive',
  title: 'Algo salió mal',
  description: 'El enlace para compartir no se pudo crear en este momento. Inténtalo de nuevo.',
  duration: 5000,
};
