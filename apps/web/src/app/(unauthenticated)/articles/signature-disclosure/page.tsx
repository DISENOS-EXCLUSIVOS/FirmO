import Link from 'next/link';

import { Button } from '@documenso/ui/primitives/button';

export default function SignatureDisclosure() {
  return (
    <div>
      <article className="prose dark:prose-invert">
        <h1>Divulgación de Firma Electrónica</h1>

        <h2>Bienvenido</h2>
        <p>
          Gracias por usar FirmO para realizar la firma electrónica de sus documentos. El propósito
          de esta divulgación es informarle sobre el proceso, la legalidad y sus derechos respecto
          al uso de firmas electrónicas en nuestra plataforma. Al optar por usar una firma
          electrónica, usted acepta los términos y condiciones que se describen a continuación.
        </p>

        <h2>Aceptación y Consentimiento</h2>
        <p>
          Cuando usa nuestra plataforma para firmar electrónicamente documentos, está dando su
          consentimiento para hacerlo bajo la Ley de Firmas Electrónicas en el Comercio Global y
          Nacional (E-Sign Act) y otras leyes aplicables. Esta acción indica su acuerdo para usar
          medios electrónicos para firmar documentos y recibir notificaciones.
        </p>

        <h2>Legalidad de las Firmas Electrónicas</h2>
        <p>
          Una firma electrónica proporcionada por usted en nuestra plataforma, lograda al hacer clic
          en un documento e ingresar su nombre, u otro método de firma electrónica que proveamos, es
          legalmente vinculante. Tiene el mismo peso y aplicabilidad que una firma manual escrita
          con tinta en papel.
        </p>

        <h2>Requisitos del Sistema</h2>
        <p>Para usar nuestro servicio de firma electrónica, debe tener acceso a:</p>
        <ul>
          <li>Una conexión a Internet estable</li>
          <li>Una cuenta de correo electrónico</li>
          <li>Un dispositivo capaz de acceder, abrir y leer documentos</li>
          <li>Un medio para imprimir o descargar documentos para sus registros</li>
        </ul>

        <h2>Entrega Electrónica de Documentos</h2>
        <p>
          Todos los documentos relacionados con el proceso de firma electrónica se le proporcionarán
          electrónicamente a través de nuestra plataforma o por correo electrónico. Es su
          responsabilidad asegurarse de que su dirección de correo electrónico esté actualizada y
          que pueda recibir y abrir nuestros correos electrónicos.
        </p>

        <h2>Consentimiento para Transacciones Electrónicas</h2>
        <p>
          Al usar la función de firma electrónica, usted da su consentimiento para realizar
          transacciones y recibir divulgaciones electrónicamente. Usted reconoce que su firma
          electrónica en documentos es vinculante y que acepta los términos descritos en los
          documentos que está firmando.
        </p>

        <h2>Retiro del Consentimiento</h2>
        <p>
          Tiene derecho a retirar su consentimiento para usar firmas electrónicas en cualquier
          momento antes de completar el proceso de firma. Para retirar su consentimiento, por favor
          contacte al remitente del documento. En caso de no poder contactar al remitente, puede
          comunicarse con <a href="mailto:tecnologia@disex.com.co">tecnologia@disex.com.co</a> para
          asistencia. Tenga en cuenta que retirar el consentimiento puede retrasar o detener la
          finalización de la transacción o servicio relacionado.
        </p>

        <h2>Actualización de su Información</h2>
        <p>
          Es crucial mantener su información de contacto, especialmente su dirección de correo
          electrónico, actualizada con nosotros. Por favor notifíquenos inmediatamente sobre
          cualquier cambio para asegurar que continúe recibiendo todas las comunicaciones
          necesarias.
        </p>

        <h2>Retención de Documentos</h2>
        <p>
          Después de firmar un documento electrónicamente, se le proporcionará la oportunidad de
          ver, descargar e imprimir el documento para sus registros. Se recomienda encarecidamente
          que conserve una copia de todos los documentos firmados electrónicamente para sus
          registros personales. Nosotros también conservaremos una copia del documento firmado para
          nuestros registros; sin embargo, puede que no podamos proporcionarle una copia del
          documento firmado después de un cierto período de tiempo.
        </p>

        <h2>Reconocimiento</h2>
        <p>
          Al proceder a usar el servicio de firma electrónica proporcionado por FirmO, usted afirma
          que ha leído y entendido esta divulgación. Acepta todos los términos y condiciones
          relacionados con el uso de firmas electrónicas y transacciones electrónicas como se
          describe aquí.
        </p>

        <h2>Información de Contacto</h2>
        <p>
          Para cualquier pregunta sobre esta divulgación, firmas electrónicas o cualquier proceso
          relacionado, por favor contáctenos en:{' '}
          <a href="mailto:tecnologia@disex.com.co">tecnologia@disex.com.co</a>
        </p>
      </article>

      <div className="mt-8">
        <Button asChild>
          <Link href="/documents">Volver a Documentos</Link>
        </Button>
      </div>
    </div>
  );
}
