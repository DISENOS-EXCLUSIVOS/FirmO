import { formatTeamUrl } from '@documenso/lib/utils/teams';
import config from '@documenso/tailwind-config';

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '../components';
import { TemplateFooter } from '../template-components/template-footer';
import TemplateImage from '../template-components/template-image';

export type TeamInviteEmailProps = {
  assetBaseUrl: string;
  baseUrl: string;
  senderName: string;
  teamName: string;
  teamUrl: string;
  token: string;
};

export const TeamInviteEmailTemplate = ({
  assetBaseUrl = 'http://localhost:3002',
  baseUrl = 'https://disex.com.co',
  senderName = 'John Doe',
  teamName = 'Team Name',
  teamUrl = 'demo',
  token = '',
}: TeamInviteEmailProps) => {
  const previewText = `Aceptar invitación para unirte a un equipo en FirmO`;

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
          <Section className="bg-white text-slate-500">
            <Container className="mx-auto mb-2 mt-8 max-w-xl rounded-lg border border-solid border-slate-200 p-2 backdrop-blur-sm">
              <TemplateImage
                assetBaseUrl={assetBaseUrl}
                className="mb-4 h-6 p-2"
                staticAsset="logo.png"
              />

              <Section>
                <TemplateImage
                  className="mx-auto"
                  assetBaseUrl={assetBaseUrl}
                  staticAsset="add-user.png"
                />
              </Section>

              <Section className="p-2 text-slate-500">
                <Text className="text-center text-lg font-medium text-black">
                  Unete a {teamName} en FirmO
                </Text>

                <Text className="my-1 text-center text-base">
                  Has sido invitado a unirte al siguiente equipo en FirmO:
                </Text>

                <div className="mx-auto my-2 w-fit rounded-lg bg-gray-50 px-4 py-2 text-base font-medium text-slate-600">
                  {formatTeamUrl(teamUrl, baseUrl)}
                </div>

                <Text className="my-1 text-center text-base">
                  por <span className="text-slate-900">{senderName}</span>
                </Text>

                <Section className="mb-6 mt-6 text-center">
                  <Button
                    className="bg-documenso-500 inline-flex items-center justify-center rounded-lg px-6 py-3 text-center text-sm font-medium text-black no-underline"
                    href={`${baseUrl}/team/invite/${token}`}
                  >
                    Aceptar
                  </Button>
                </Section>
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

export default TeamInviteEmailTemplate;
