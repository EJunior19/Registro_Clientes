const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { jsPDF } = require('jspdf');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir archivos estáticos (por ejemplo, el formulario HTML)
app.use(express.static('public'));

// Endpoint para recibir los datos del formulario
app.post('/formulario', async (req, res) => {
    const formData = req.body;

    // Obtener el nombre del titular
    const nombreTitular = formData.nombre || 'registro_cliente';
    // Generar un nombre de archivo único y seguro
    const filename = `${nombreTitular.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}_${Date.now()}.pdf`;

    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Definir márgenes
    const margin = 15;
    let y = margin;

    // Función para agregar texto con formato
    function addText(text, options = {}) {
        const fontSize = options.fontSize || 12;
        const fontWeight = options.fontWeight || 'normal';
        doc.setFontSize(fontSize);
        doc.setFont(undefined, fontWeight);
        doc.text(text, margin, y);
        y += fontSize / 2 + 4;
    }

    // Título del PDF
    addText('Registro de Visita a Cliente', { fontSize: 18, fontWeight: 'bold' });
    y += 10;

    // Datos del cliente
    addText('Datos del Cliente:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre y Apellido: ${formData.nombre}`);
    addText(`Cédula: ${formData.cedula}`);
    addText(`Teléfono: ${formData.telefono}`);
    addText(`Ciudad: ${formData.ciudad}, Barrio: ${formData.barrio}`);
    addText(`Estado Civil: ${formData.estado_civil}`);
    addText(`¿Vive con su pareja?: ${formData.vive_pareja}`);
    y += 5;

    // Datos del cónyuge
    if (formData.estado_civil === 'casada') {
        addText('Datos del Cónyuge:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${formData.nombre_conyuge}`);
        addText(`Lugar de Trabajo: ${formData.lugar_trabajo_conyuge}`);
        addText(`Ingreso Mensual: ${formData.ingreso_conyuge}`);
        y += 5;
    }

    // Información Laboral del Titular
    addText('Información Laboral del Titular:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Lugar de Trabajo: ${formData.lugar_trabajo_titular}`);
    addText(`Tiempo en el Trabajo: ${formData.tiempo_trabajo}`);
    addText(`Ingreso Mensual: ${formData.ingreso_mensual_titular}`);
    addText(`Contacto Laboral: ${formData.contacto_laboral}`);
    y += 5;

    // Producto solicitado
    addText('Producto Solicitado:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre del Producto: ${formData.nombre_producto}`);
    addText(`Código: ${formData.codigo_producto}`);
    addText(`Cuotas: ${formData.cuotas}`);
    addText(`Monto de Cuota: ${formData.monto_cuota}`);
    addText(`¿Hay entrega inicial?: ${formData.entrega_inicial}`);
    y += 5;

    // Referencias personales
    addText('Referencias Personales:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Referencia 1 - Nombre: ${formData.nombre_ref1}, Relación: ${formData.relacion_ref1}, Teléfono: ${formData.telefono_ref1}`);
    addText(`Referencia 2 - Nombre: ${formData.nombre_ref2}, Relación: ${formData.relacion_ref2}, Teléfono: ${formData.telefono_ref2}`);
    addText(`Referencia 3 - Nombre: ${formData.nombre_ref3}, Relación: ${formData.relacion_ref3}, Teléfono: ${formData.telefono_ref3}`);
    y += 5;

    // Otros
    addText('Otros:', { fontSize: 14, fontWeight: 'bold' });
    addText(`¿Quién usará el producto?: ${formData.quien_usa}`);
    addText(`¿Tiene garante?: ${formData.tiene_garante}`);
    addText(`Observaciones Generales: ${formData.observaciones}`);

    // Guardar el PDF
    const pdfBuffer = doc.output('arraybuffer');

    // Configurar Nodemailer
    let transporter = nodemailer.createTransport({
        host: "https://dashboard.mailerlite.com/dashboard",
        port: 2525,
        auth: {
            user: "jcorporativo357@gmail.com",
            pass: "Jr09042003."
        }
    });

    // Configurar el correo electrónico
    let mailOptions = {
        from: '"Junior Enciso" <jcorporativo357@gmail.com>', // Reemplaza con tu correo
        to: 'jcorporativo357@gmail.com', // Reemplaza con el correo al que quieres enviar el formulario
        subject: `Nuevo Registro de Cliente - ${formData.nombre}`,
        text: 'Adjunto encontrarás el registro del cliente.',
        attachments: [{
            filename: filename,
            content: Buffer.from(pdfBuffer),
            contentType: 'application/pdf'
        }]
    };

    try {
        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions);

        console.log('Correo electrónico enviado correctamente');
        res.status(200).send('Formulario enviado correctamente por correo electrónico');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).send('Error al enviar el formulario por correo electrónico');
    }
});

// Servir archivos estáticos (por ejemplo, el formulario HTML)
app.use(express.static('public'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});