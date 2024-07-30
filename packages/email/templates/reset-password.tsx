import config from '@documenso/tailwind-config';

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '../components';
import { TemplateFooter } from '../template-components/template-footer';
import type { TemplateResetPasswordProps } from '../template-components/template-reset-password';
import { TemplateResetPassword } from '../template-components/template-reset-password';

export type ResetPasswordTemplateProps = Partial<TemplateResetPasswordProps>;

export const ResetPasswordTemplate = ({
  userName = 'Lucas Smith',
  userEmail = 'lucas@disex.com.co',
  assetBaseUrl = 'http://localhost:3002',
}: ResetPasswordTemplateProps) => {
  const previewText = `Restablecimiento de contraseña exitoso`;

  const getAssetUrl = (path: string) => {
    return new URL(path, assetBaseUrl).toString();
  };

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: config.theme.extend.colors,
            },
          },
        }}
      >
        <Body className="mx-auto my-auto bg-white font-sans">
          <Section>
            <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-lg border border-solid border-slate-200 p-4 backdrop-blur-sm">
              <Section>
                <Img src={'https://ibb.co/f0T5w3j'} alt="FirmO Logo" className="mb-4 h-6" />

                <TemplateResetPassword
                  userName={userName}
                  userEmail={userEmail}
                  assetBaseUrl={assetBaseUrl}
                />
              </Section>
            </Container>

            <Container className="mx-auto mt-12 max-w-xl">
              <Section>
                <Text className="my-4 text-base font-semibold">
                  Hola, {userName}{' '}
                  <Link className="font-normal text-slate-400" href={`mailto:${userEmail}`}>
                    ({userEmail})
                  </Link>
                </Text>

                <Text className="mt-2 text-base text-slate-400">
                  Cambio exitoso. Ahora puedes iniciar sesión con tu nueva contraseña.
                </Text>
                <Text className="mt-2 text-base text-slate-400">
                  ¿No solicitaste un cambio de contraseña? Estamos aquí para ayudarle a proteger su
                  cuenta{' '}
                  <Link
                    className="text-documenso-700 font-normal"
                    href="mailto:tecnologia@disex.com.co"
                  >
                    Contacta con Desarrollo TI
                  </Link>
                </Text>
              </Section>
            </Container>

            <Hr className="mx-auto mt-12 max-w-xl" />

            <Container className="mx-auto max-w-xl">
              <TemplateFooter isDocument={false} />
            </Container>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordTemplate;
