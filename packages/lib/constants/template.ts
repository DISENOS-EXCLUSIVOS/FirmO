export const TEMPLATE_RECIPIENT_EMAIL_PLACEHOLDER_REGEX = /recipient\.\d+@documenso\.com/i;
export const TEMPLATE_RECIPIENT_NAME_PLACEHOLDER_REGEX = /Recipient \d+/i;

export const DIRECT_TEMPLATE_DOCUMENTATION = [
  {
    title: 'Habilitar la firma de enlace directo',
    description:
      'Una vez habilitado, puede seleccionar cualquier destinatario activo para que sea un destinatario de firma de enlace directo o crear uno nuevo. Este tipo de destinatario no se puede editar ni eliminar.',
  },
  {
    title: 'Configurar destinatario directo',
    description:
      'Actualiza el rol  y añada campos requeridos para el destinatario directo La persona que utilice el enlace firmará el documento como destinatario directo.',
  },
  {
    title: 'Comparte el enlace',
    description:
      'Una vez que su plantilla esté configurada, comparta el enlace donde desee. La persona que abra el enlace podrá ingresar su información en el campo del destinatario del enlace directo y completar cualquier otro campo que se le asigne.',
  },
  {
    title: 'Creación de documento',
    description:
      'Después del envío, se generará automáticamente un documento y se agregará a su página de documentos. También recibirás una notificación por correo electrónico.',
  },
];

export const DIRECT_TEMPLATE_RECIPIENT_EMAIL = 'direct.link@documenso.com';
export const DIRECT_TEMPLATE_RECIPIENT_NAME = 'Direct link recipient';
