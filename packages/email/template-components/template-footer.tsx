import { Link, Section, Text } from '../components';

export type TemplateFooterProps = {
  isDocument?: boolean;
};

export const TemplateFooter = ({ isDocument = true }: TemplateFooterProps) => {
  return (
    <Section>
      {isDocument && (
        <Text className="my-4 text-base text-slate-400">
          Este documento fue enviado utilizando{' '}
          <Link className="text-[#7AC455]" href="https://documen.so/mail-footer">
            FirmO.
          </Link>
        </Text>
      )}

      <Text className="my-8 text-sm text-slate-400">
        FirmO, Inc.
        <br />
        Cll 17 #43f - 23, Barrio Colombia, Medellín, Colombia
      </Text>
    </Section>
  );
};

export default TemplateFooter;
