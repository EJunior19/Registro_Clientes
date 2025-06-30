function toggleGarante() {
    const tieneGarante = document.getElementById('tiene_garante').value;
    const garanteSection = document.getElementById('garanteSection');

    // Mostrar u ocultar la sección del garante
    garanteSection.style.display = tieneGarante === 'si' ? 'block' : 'none';
}

function toggleConyuge() {
    const estadoCivil = document.getElementById('estado_civil').value;
    const conyugeSection = document.getElementById('conyugeSection');

    // Mostrar u ocultar la sección del cónyuge
    conyugeSection.style.display = estadoCivil === 'casada' ? 'block' : 'none';
}

function toggleOtroBarrio(campo) {
    const barrioSeleccionado = document.getElementById(`barrio_${campo === 'cliente' ? '' : campo}`).value;
    const otroBarrioInput = document.getElementById(`otroBarrioInput${campo.charAt(0).toUpperCase() + campo.slice(1)}`);

    // Mostrar u ocultar el campo de texto para ingresar un barrio no listado
    otroBarrioInput.style.display = barrioSeleccionado === 'otro' ? 'block' : 'none';
}

function toggleEntregaInicial() {
    const entregaInicial = document.getElementById('entrega_inicial').value;
    const montoEntregaInicial = document.getElementById('montoEntregaInicial');

    // Mostrar u ocultar el campo para ingresar el monto de entrega inicial
    montoEntregaInicial.style.display = entregaInicial === 'si' ? 'block' : 'none';
}

function formatearNumero(input) {
    let numero = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    numero = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Añadir puntos cada 3 dígitos
    input.value = numero;
}

function formatearTelefono(input) {
    let telefono = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    telefono = telefono.substring(0, 10); // Limitar a 10 dígitos

    if (telefono.length > 3) {
        telefono = telefono.substring(0, 4) + ' ' + telefono.substring(4); // Formato: XXXX XXX XXX
    }
    if (telefono.length > 7) {
        telefono = telefono.substring(0, 8) + ' ' + telefono.substring(8); // Formato: XXXX XXX XXX
    }
    input.value = telefono;
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los campos al cargar la página
    toggleGarante();
    toggleConyuge();
    toggleOtroBarrio('cliente'); // Inicializar el campo de barrio del cliente
    toggleEntregaInicial();
});

document.getElementById('generarPdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margin = 15;
    let y = margin;
    let pageHeight = doc.internal.pageSize.getHeight();

    // Función para añadir texto al PDF
    function addText(text, options = {}) {
        const fontSize = options.fontSize || 12;
        const fontWeight = options.fontWeight || 'normal';
        doc.setFontSize(fontSize);
        doc.setFont(undefined, fontWeight);

        const maxWidth = doc.internal.pageSize.getWidth() - 2 * margin;
        const lineHeight = fontSize / 2 + 4;

        let lines = doc.splitTextToSize(text, maxWidth);

        lines.forEach(line => {
            if (y + lineHeight > pageHeight - margin) {
                doc.addPage();
                y = margin;
            }
            doc.text(line, margin, y);
            y += lineHeight;
        });
    }

    // Función para asegurar espacio en la página
    function ensureSpace(height) {
        if (y + height > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    }

    // Recopilar datos del formulario
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const cedula = document.getElementById('cedula').value;
    const telefono = document.getElementById('telefono').value;
    const ciudad = document.getElementById('ciudad').value;

    // Obtener el valor del barrio del cliente, ya sea del select o del input "Otro"
    let barrio = document.getElementById('barrio').value;
    if (barrio === 'otro') {
        barrio = document.getElementById('otroBarrioInputCliente').value;
    }

    const estadoCivil = document.getElementById('estado_civil').value;
    const vivePareja = document.getElementById('vive_pareja').value;

    // Datos del cónyuge (si aplica)
    let nombreConyuge = '', direccionConyuge = '', barrioConyuge = '', lugarTrabajoConyuge = '', tiempoTrabajoConyuge = '', ingresoConyuge = '';
    if (document.getElementById('conyugeSection').style.display !== 'none') {
        nombreConyuge = document.getElementById('nombre_conyuge').value;
        direccionConyuge = document.getElementById('direccion_conyuge').value;

        // Obtener el valor del barrio del cónyuge, ya sea del select o del input "Otro"
        barrioConyuge = document.getElementById('barrio_conyuge').value;
        if (barrioConyuge === 'otro') {
            barrioConyuge = document.getElementById('otroBarrioInputConyuge').value;
        }

        lugarTrabajoConyuge = document.getElementById('lugar_trabajo_conyuge').value;
        tiempoTrabajoConyuge = document.getElementById('tiempo_trabajo_conyuge').value;
        ingresoConyuge = document.getElementById('ingreso_conyuge').value;
    }

    const lugarTrabajoTitular = document.getElementById('lugar_trabajo_titular').value;
    const tiempoTrabajo = document.getElementById('tiempo_trabajo').value;
    const ingresoMensualTitular = document.getElementById('ingreso_mensual_titular').value;
    const contactoLaboral = document.getElementById('contacto_laboral').value;

    const nombreProducto = document.getElementById('nombre_producto').value;
    const codigoProducto = document.getElementById('codigo_producto').value;
    const cuotas = document.getElementById('cuotas').value;
    const montoCuota = document.getElementById('monto_cuota').value;
    const entregaInicial = document.getElementById('entrega_inicial').value;
    const montoEntrega = document.getElementById('monto_entrega').value;

    const nombreRef1 = document.getElementById('nombre_ref1').value;
    const direccionRef1 = document.getElementById('direccion_ref1').value;

    // Obtener el valor del barrio de la referencia 1, ya sea del select o del input "Otro"
    let barrioRef1 = document.getElementById('barrio_ref1').value;
    if (barrioRef1 === 'otro') {
        barrioRef1 = document.getElementById('otroBarrioInputRef1').value;
    }

    const relacionRef1 = document.getElementById('relacion_ref1').value;
    const telefonoRef1 = document.getElementById('telefono_ref1').value;

    const nombreRef2 = document.getElementById('nombre_ref2').value;
    const direccionRef2 = document.getElementById('direccion_ref2').value;

    // Obtener el valor del barrio de la referencia 2, ya sea del select o del input "Otro"
    let barrioRef2 = document.getElementById('barrio_ref2').value;
    if (barrioRef2 === 'otro') {
        barrioRef2 = document.getElementById('otroBarrioInputRef2').value;
    }

    const relacionRef2 = document.getElementById('relacion_ref2').value;
    const telefonoRef2 = document.getElementById('telefono_ref2').value;

    const nombreRef3 = document.getElementById('nombre_ref3').value;
    const direccionRef3 = document.getElementById('direccion_ref3').value;

    // Obtener el valor del barrio de la referencia 3, ya sea del select o del input "Otro"
    let barrioRef3 = document.getElementById('barrio_ref3').value;
    if (barrioRef3 === 'otro') {
        barrioRef3 = document.getElementById('otroBarrioInputRef3').value;
    }

    const relacionRef3 = document.getElementById('relacion_ref3').value;
    const telefonoRef3 = document.getElementById('telefono_ref3').value;

    const quienUsa = document.getElementById('quien_usa').value;
    const observaciones = document.getElementById('observaciones').value;

    // Datos del garante (si aplica)
    let nombreGarante = '', direccionGarante = '', barrioGarante = '', cedulaGarante = '', telefonoGarante = '', lugarTrabajoGarante = '', tiempoTrabajoGarante = '', ingresoMensualGarante = '';
    if (document.getElementById('garanteSection').style.display !== 'none') {
        nombreGarante = document.getElementById('nombre_garante').value;
        direccionGarante = document.getElementById('direccion_garante').value;

        // Obtener el valor del barrio del garante, ya sea del select o del input "Otro"
        barrioGarante = document.getElementById('barrio_garante').value;
        if (barrioGarante === 'otro') {
            barrioGarante = document.getElementById('otroBarrioInputGarante').value;
        }

        cedulaGarante = document.getElementById('cedula_garante').value;
        telefonoGarante = document.getElementById('telefono_garante').value;
        lugarTrabajoGarante = document.getElementById('lugar_trabajo_garante').value;
        tiempoTrabajoGarante = document.getElementById('tiempo_trabajo_garante').value;
        ingresoMensualGarante = document.getElementById('ingreso_mensual_garante').value;
    }

    // Comienzo de la información en el PDF
    addText('Registro de Visita a Cliente', { fontSize: 18, fontWeight: 'bold' });
    y += 10;

    ensureSpace(50);

    // Datos del Cliente:
    addText('Datos del Cliente:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre y Apellido: ${nombre}`);
    addText(`Dirección: ${direccion}`);
    addText(`Cédula: ${cedula}`);
    addText(`Teléfono: ${telefono}`);
    addText(`Ciudad: ${ciudad}, Barrio: ${barrio}`);
    addText(`Estado Civil: ${estadoCivil}`);
    addText(`¿Vive con su pareja?: ${vivePareja === 'si' ? 'Sí' : 'No'}`);

    // Datos del cónyuge (si aplica)
    if (document.getElementById('conyugeSection').style.display !== 'none') {
        addText('Datos del Cónyuge:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${nombreConyuge}`);
        addText(`Dirección: ${direccionConyuge}`);
        addText(`Barrio: ${barrioConyuge}`);
        addText(`Lugar de Trabajo: ${lugarTrabajoConyuge}`);
        addText(`Tiempo en el Trabajo: ${tiempoTrabajoConyuge}`);
        addText(`Ingreso Mensual: ${ingresoConyuge}`);
    }

    ensureSpace(50);

    // Información Laboral del Titular
    addText('Información Laboral del Titular:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Lugar de Trabajo: ${lugarTrabajoTitular}`);
    addText(`Tiempo en el Trabajo: ${tiempoTrabajo}`);
    addText(`Ingreso Mensual: ${ingresoMensualTitular}`);
    addText(`Contacto Laboral: ${contactoLaboral}`);

    ensureSpace(50);

    // Producto solicitado
    addText('Producto Solicitado:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre del Producto: ${nombreProducto}`);
    addText(`Código: ${codigoProducto}`);
    addText(`Cuotas: ${cuotas}`);
    addText(`Monto de Cuota: ${montoCuota}`);
    addText(`¿Hay entrega inicial?: ${entregaInicial === 'si' ? 'Sí' : 'No'}`);
    if (entregaInicial === 'si') {
        addText(`Monto de Entrega Inicial: ${montoEntrega}`);
    }

    ensureSpace(50);

    // Referencias personales
    addText('Referencias Personales:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Referencia 1 - Nombre: ${nombreRef1}, Dirección: ${direccionRef1}, Barrio: ${barrioRef1}, Relación: ${relacionRef1}, Teléfono: ${telefonoRef1}`);
    addText(`Referencia 2 - Nombre: ${nombreRef2}, Dirección: ${direccionRef2}, Barrio: ${barrioRef2}, Relación: ${relacionRef2}, Teléfono: ${telefonoRef2}`);
    addText(`Referencia 3 - Nombre: ${nombreRef3}, Dirección: ${direccionRef3}, Barrio: ${barrioRef3}, Relación: ${relacionRef3}, Teléfono: ${telefonoRef3}`);

    ensureSpace(50);

    // Otros
    addText('Otros:', { fontSize: 14, fontWeight: 'bold' });
    addText(`¿Quién usará el producto?: ${quienUsa}`);
    addText(`Observaciones Generales: ${observaciones}`);

    // Datos del garante (si aplica)
    if (document.getElementById('garanteSection').style.display !== 'none') {
        addText('Datos del Garante:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${nombreGarante}`);
        addText(`Dirección: ${direccionGarante}`);
        addText(`Barrio: ${barrioGarante}`);
        addText(`Cédula: ${cedulaGarante}`);
        addText(`Teléfono: ${telefonoGarante}`);
        addText(`Lugar de Trabajo: ${lugarTrabajoGarante}`);
        addText(`Tiempo en el Trabajo: ${tiempoTrabajoGarante}`);
        addText(`Ingreso Mensual: ${ingresoMensualGarante}`);
    }

    // Guardar el PDF
    const nombreTitular = document.getElementById('nombre').value || 'registro_cliente';
    const filename = `${nombreTitular.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}_${Date.now()}.pdf`;
    doc.save(filename);
});