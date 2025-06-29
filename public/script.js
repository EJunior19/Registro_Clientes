function toggleGarante() {
    const tieneGarante = document.getElementById('tiene_garante').value;
    const garanteSection = document.getElementById('garanteSection');

    if (tieneGarante === 'si') {
        garanteSection.style.display = 'block';
    } else {
        garanteSection.style.display = 'none';
    }
}

function toggleConyuge() {
    const estadoCivil = document.getElementById('estado_civil').value;
    const conyugeSection = document.getElementById('conyugeSection');

    if (estadoCivil === 'casada') {
        conyugeSection.style.display = 'block';
    } else {
        conyugeSection.style.display = 'none';
    }
}

function updateBarrios() {
    const ciudadSelect = document.getElementById('ciudad');
    const barrioSelect = document.getElementById('barrio');
    const ciudadSeleccionada = ciudadSelect.value;

    // Limpiar opciones anteriores
    barrioSelect.innerHTML = '';

    let barrios = [];

    if (ciudadSeleccionada === 'Salto del Guairá') {
        barrios = [
            'Jardín del Norte', 'Renacer', 'Nuevo Horizonte', 'San José', 'María Auxiliadora',
            'Karen Luana', 'Santa Teresa', 'Adela Speratti', 'San Blas', 'Villa Florida',
            'Stella Marys', 'Donde Nace El Sol', 'Santa Rosa', 'San Miguel', 'Primavera',
            'Residencial Acuario', 'Rayito de Sol Kilómetro 2', 'San Francisco', 'San Jorge',
            "Ko'e Rory", "San Juan", "8 de diciembre", "Cafetal guaraní", "15 de agosto",
            "Las palmeras", "Barrio Morán"
        ];
    } else if (ciudadSeleccionada === 'Km 5') {
        barrios = [];
    }

    // Agregar nuevas opciones
    barrios.forEach(barrio => {
        const option = document.createElement('option');
        option.value = barrio;
        option.textContent = barrio;
        barrioSelect.appendChild(option);
    });
}

function formatearNumero(input) {
    let numero = input.value.replace(/\D/g, '');
    numero = numero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    input.value = numero;
}

document.addEventListener('DOMContentLoaded', function() {
    toggleGarante();
    toggleConyuge();

    // Inicializar lista de barrios al cargar la página
    updateBarrios();

    // Asegurarse de que los barrios se actualicen al cambiar la ciudad
    document.getElementById('ciudad').addEventListener('change', updateBarrios);
});

 document.getElementById('generarPdf').addEventListener('click', function() {
    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
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
    addText(`Nombre y Apellido: ${document.getElementById('nombre').value}`);
    addText(`Cédula: ${document.getElementById('cedula').value}`);
    addText(`Teléfono: ${document.getElementById('telefono').value}`);
    addText(`Ciudad: ${document.getElementById('ciudad').value}, Barrio: ${document.getElementById('barrio').value}`);
    addText(`Estado Civil: ${document.getElementById('estado_civil').value}`);
    addText(`¿Vive con su pareja?: ${document.getElementById('vive_pareja').value}`);
    y += 5;

    // Datos del cónyuge (si aplica)
    if (document.getElementById('estado_civil').value === 'casada') {
        addText('Datos del Cónyuge:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${document.getElementById('nombre_conyuge').value}`);
        addText(`Lugar de Trabajo: ${document.getElementById('lugar_trabajo_conyuge').value}`);
        addText(`Ingreso Mensual: ${document.getElementById('ingreso_conyuge').value}`);
        y += 5;
    }

    // Información Laboral del Titular
    addText('Información Laboral del Titular:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Lugar de Trabajo: ${document.getElementById('lugar_trabajo_titular').value}`);
    addText(`Tiempo en el Trabajo: ${document.getElementById('tiempo_trabajo').value}`);
    addText(`Ingreso Mensual: ${document.getElementById('ingreso_mensual_titular').value}`);
    addText(`Contacto Laboral: ${document.getElementById('contacto_laboral').value}`);
    y += 5;

    // Producto solicitado
    addText('Producto Solicitado:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre del Producto: ${document.getElementById('nombre_producto').value}`);
    addText(`Código: ${document.getElementById('codigo_producto').value}`);
    addText(`Cuotas: ${document.getElementById('cuotas').value}`);
    addText(`Monto de Cuota: ${document.getElementById('monto_cuota').value}`);
    addText(`¿Hay entrega inicial?: ${document.getElementById('entrega_inicial').value}`);
    y += 5;

    // Referencias personales
    addText('Referencias Personales:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Referencia 1 - Nombre: ${document.getElementById('nombre_ref1').value}, Relación: ${document.getElementById('relacion_ref1').value}, Teléfono: ${document.getElementById('telefono_ref1').value}`);
    addText(`Referencia 2 - Nombre: ${document.getElementById('nombre_ref2').value}, Relación: ${document.getElementById('relacion_ref2').value}, Teléfono: ${document.getElementById('telefono_ref2').value}`);
    addText(`Referencia 3 - Nombre: ${document.getElementById('nombre_ref3').value}, Relación: ${document.getElementById('relacion_ref3').value}, Teléfono: ${document.getElementById('telefono_ref3').value}`);
    y += 5;

    // Otros
    addText('Otros:', { fontSize: 14, fontWeight: 'bold' });
    addText(`¿Quién usará el producto?: ${document.getElementById('quien_usa').value}`);
    addText(`¿Tiene garante?: ${document.getElementById('tiene_garante').value}`);
    addText(`Observaciones Generales: ${document.getElementById('observaciones').value}`);

    // Guardar el PDF
    doc.save('registro_cliente.pdf');
});