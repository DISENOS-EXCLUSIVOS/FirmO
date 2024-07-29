import type { Metadata } from 'next';
import Link from 'next/link';

import { getRequiredServerComponentSession } from '@documenso/lib/next-auth/get-server-component-session';
import { getServerComponentFlag } from '@documenso/lib/server-only/feature-flags/get-server-component-feature-flag';
import { Alert, AlertDescription, AlertTitle } from '@documenso/ui/primitives/alert';
import { Button } from '@documenso/ui/primitives/button';

import { SettingsHeader } from '~/components/(dashboard)/settings/layout/header';
import { DisableAuthenticatorAppDialog } from '~/components/forms/2fa/disable-authenticator-app-dialog';
import { EnableAuthenticatorAppDialog } from '~/components/forms/2fa/enable-authenticator-app-dialog';
import { ViewRecoveryCodesDialog } from '~/components/forms/2fa/view-recovery-codes-dialog';
import { PasswordForm } from '~/components/forms/password';

export const metadata: Metadata = {
  title: 'Security',
};

export default async function SecuritySettingsPage() {
  const { user } = await getRequiredServerComponentSession();

  const isPasskeyEnabled = await getServerComponentFlag('app_passkey');

  return (
    <div>
      <SettingsHeader
        title="Seguridad"
        subtitle="quí puede administrar su contraseña y configuración de seguridad."
      />

      {user.identityProvider === 'DOCUMENSO' && (
        <>
          <PasswordForm user={user} />

          <hr className="border-border/50 mt-6" />
        </>
      )}

      <Alert
        className="mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center"
        variant="neutral"
      >
        <div className="mb-4 sm:mb-0">
          <AlertTitle>Autenticación de dos factores</AlertTitle>

          <AlertDescription className="mr-4">
            Agregue un autenticador para que sirva como método de autenticación secundario{' '}
            {user.identityProvider === 'DOCUMENSO'
              ? 'al iniciar sesión o al firmar documentos..'
              : 'para firmar documentos.'}
          </AlertDescription>
        </div>

        {user.twoFactorEnabled ? (
          <DisableAuthenticatorAppDialog />
        ) : (
          <EnableAuthenticatorAppDialog />
        )}
      </Alert>

      {user.twoFactorEnabled && (
        <Alert
          className="mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center"
          variant="neutral"
        >
          <div className="mb-4 sm:mb-0">
            <AlertTitle>Códigos de recuperación</AlertTitle>

            <AlertDescription className="mr-4">
              Los códigos de recuperación de autenticación de dos factores se utilizan para acceder
              a su cuenta en caso de que que pierda el acceso a su aplicación de autenticación.
            </AlertDescription>
          </div>

          <ViewRecoveryCodesDialog />
        </Alert>
      )}

      {isPasskeyEnabled && (
        <Alert
          className="mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center"
          variant="neutral"
        >
          <div className="mb-4 sm:mb-0">
            <AlertTitle>Claves de acceso</AlertTitle>

            <AlertDescription className="mr-4">
              Permite autenticarse mediante biometría, gestores de contraseñas, claves de hardware,
              etc.
            </AlertDescription>
          </div>

          <Button asChild variant="outline" className="bg-background">
            <Link href="/settings/security/passkeys">Administrar claves de acceso</Link>
          </Button>
        </Alert>
      )}

      <Alert
        className="mt-6 flex flex-col justify-between p-6 sm:flex-row sm:items-center"
        variant="neutral"
      >
        <div className="mb-4 mr-4 sm:mb-0">
          <AlertTitle>Actividad reciente</AlertTitle>

          <AlertDescription className="mr-2">
            Vea toda la actividad de seguridad reciente relacionada con su cuenta.
          </AlertDescription>
        </div>

        <Button asChild variant="outline" className="bg-background">
          <Link href="/settings/security/activity">Ver actividad</Link>
        </Button>
      </Alert>
    </div>
  );
}
