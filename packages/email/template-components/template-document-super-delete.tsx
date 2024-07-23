import { Section, Text } from '../components';
import { TemplateDocumentImage } from './template-document-image';

export interface TemplateDocumentDeleteProps {
  reason: string;
  documentName: string;
  assetBaseUrl: string;
}

export const TemplateDocumentDelete = ({
  reason,
  documentName,
  assetBaseUrl,
}: TemplateDocumentDeleteProps) => {
  return (
    <>
      <TemplateDocumentImage className="mt-6" assetBaseUrl={assetBaseUrl} />

      <Section>
        <Text className="text-primary mb-0 mt-6 text-left text-lg font-semibold">
          ¡Tu documento ha sido eliminado por un administrador!
        </Text>

        <Text className="mx-auto mb-6 mt-1 text-left text-base text-slate-400">
          "{documentName}" ha sido eliminado.
        </Text>

        <Text className="mx-auto mb-6 mt-1 text-left text-base text-slate-400">
          Este documento no se puede recuperar, si desea saber el motivo de futuros documentos,
          comuníquese con Desarrollo TI.
        </Text>

        <Text className="mx-auto mt-1 text-left text-base text-slate-400">
          Motivo de eliminación:
        </Text>

        <Text className="mx-auto mb-6 mt-1 text-left text-base italic text-slate-400">
          {reason}
        </Text>
      </Section>
    </>
  );
};

export default TemplateDocumentDelete;
