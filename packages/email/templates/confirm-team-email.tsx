import { formatTeamUrl } from '@documenso/lib/utils/teams';
import config from '@documenso/tailwind-config';

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '../components';
import { TemplateFooter } from '../template-components/template-footer';
import TemplateImage from '../template-components/template-image';

export type ConfirmTeamEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  teamName: string;
  teamUrl: string;
  token: string;
};

export const ConfirmTeamEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://documenso.com',
  teamName = 'equipo',
  teamUrl = 'demo',
  token = '',
}: ConfirmTeamEmailProps) => {
  const previewText = `Aceptar la solicitud de correo electrónico del grupo para ${teamName} en FirmO.`;

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
        <Body className="mx-auto my-auto font-sans">
          <Section className="bg-white">
            <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-lg border border-solid border-slate-200 px-2 pt-2 backdrop-blur-sm">
              <TemplateImage
                assetBaseUrl={assetBaseUrl}
                className="mb-4 h-6 p-2"
                staticAsset="logo.png"
              />

              <Section>
                <TemplateImage
                  className="mx-auto"
                  assetBaseUrl={assetBaseUrl}
                  staticAsset="mail-open.png"
                />
              </Section>

              <Section className="p-2 text-slate-500">
                <Text className="text-center text-lg font-medium text-black">
                  Verifica la dirección de correo electrónico de tu equipo
                </Text>

                <Text className="text-center text-base">
                  <span className="font-bold">{teamName}</span> usted ha solicitado utilizar su
                  dirección de correo electrónico para su equipo en FirmO.
                </Text>

                <div className="mx-auto mt-6 w-fit rounded-lg bg-gray-50 px-4 py-2 text-base font-medium text-slate-600">
                  {formatTeamUrl(teamUrl, baseUrl)}
                </div>

                <Section className="mt-6">
                  <Text className="my-0 text-sm">
                    By accepting this request, you will be granting a <strong>{teamName}</strong>{' '}
                    acceso a:
                  </Text>

                  <ul className="mb-0 mt-2">
                    <li className="text-sm">
                      View all documents sent to and from this email address
                    </li>
                    <li className="mt-1 text-sm">
                      Permitir que los destinatarios del documento respondan directamente a esta
                      dirección de correo electrónico
                    </li>
                  </ul>

                  <Text className="mt-2 text-sm">
                    Puedes revocar el acceso en cualquier momento en la configuración de tu equipo
                    en FirmO <Link href={`${baseUrl}/settings/teams`}>Aquí.</Link>
                  </Text>
                </Section>

                <Section className="mb-6 mt-8 text-center">
                  <Button
                    className="bg-documenso-500 inline-flex items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-medium text-black no-underline"
                    href={`${baseUrl}/team/verify/email/${token}`}
                  >
                    Aceptar
                  </Button>
                </Section>
              </Section>

              <Text className="text-center text-xs text-slate-500">
                El enlace caduca en 1 hora.
              </Text>
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

export default ConfirmTeamEmailTemplate;
