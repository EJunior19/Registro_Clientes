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
    // Acceder a la cámara al cargar la página y configurar los event listeners para las fotos
    function setupCamera(videoElement, canvasElement, photoElement, takePhotoBtnElement, fotoBase64InputElement) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                videoElement.srcObject = stream;
            })
            .catch(function(err) {
                console.log("Ocurrió un error: " + err);
            });

        takePhotoBtnElement.addEventListener('click', function() {
            canvasElement.getContext('2d').drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            let image_data_url = canvasElement.toDataURL('image/jpeg');

            photoElement.setAttribute('src', image_data_url);
            fotoBase64InputElement.setAttribute('value', image_data_url);

            videoElement.style.display = 'none';
            canvasElement.style.display = 'none';
            photoElement.style.display = 'block';
        });
    }

    // TITULAR
    const videoTitularFrente = document.getElementById('videoTitularFrente');
    const canvasTitularFrente = document.getElementById('canvasTitularFrente');
    const photoTitularFrente = document.getElementById('photoTitularFrente');
    const takePhotoBtnTitularFrente = document.getElementById('takePhotoTitularFrente');
    const fotoBase64TitularFrenteInput = document.getElementById('fotoBase64TitularFrente');

    setupCamera(videoTitularFrente, canvasTitularFrente, photoTitularFrente, takePhotoBtnTitularFrente, fotoBase64TitularFrenteInput);

    const videoTitularDorso = document.getElementById('videoTitularDorso');
    const canvasTitularDorso = document.getElementById('canvasTitularDorso');
    const photoTitularDorso = document.getElementById('photoTitularDorso');
    const takePhotoBtnTitularDorso = document.getElementById('takePhotoTitularDorso');
    const fotoBase64TitularDorsoInput = document.getElementById('fotoBase64TitularDorso');

    setupCamera(videoTitularDorso, canvasTitularDorso, photoTitularDorso, takePhotoBtnTitularDorso, fotoBase64TitularDorsoInput);

    // CONYUGE
        try {
    const videoConyugeFrente = document.getElementById('videoConyugeFrente');
    const canvasConyugeFrente = document.getElementById('canvasConyugeFrente');
    const photoConyugeFrente = document.getElementById('photoConyugeFrente');
    const takePhotoBtnConyugeFrente = document.getElementById('takePhotoConyugeFrente');
    const fotoBase64ConyugeFrenteInput = document.getElementById('fotoBase64ConyugeFrente');

    setupCamera(videoConyugeFrente, canvasConyugeFrente, photoConyugeFrente, takePhotoBtnConyugeFrente, fotoBase64ConyugeFrenteInput);
    }
     catch(error){
            console.log("No existe o no esta acticada")
        }
    const videoConyugeDorso = document.getElementById('videoConyugeDorso');
    const canvasConyugeDorso = document.getElementById('canvasConyugeDorso');
    const photoConyugeDorso = document.getElementById('photoConyugeDorso');
    const takePhotoBtnConyugeDorso = document.getElementById('takePhotoConyugeDorso');
    const fotoBase64ConyugeDorsoInput = document.getElementById('fotoBase64ConyugeDorso');
  try {
        setupCamera(videoConyugeDorso, canvasConyugeDorso, photoConyugeDorso, takePhotoBtnConyugeDorso, fotoBase64ConyugeDorsoInput);
    }
     catch(error){
            console.log("No existe o no esta acticada")
        }


    // GARANTE
    const videoGaranteFrente = document.getElementById('videoGaranteFrente');
    const canvasGaranteFrente = document.getElementById('canvasGaranteFrente');
    const photoGaranteFrente = document.getElementById('photoGaranteFrente');
    const takePhotoBtnGaranteFrente = document.getElementById('takePhotoGaranteFrente');
    const fotoBase64GaranteFrenteInput = document.getElementById('fotoBase64GaranteFrente');

    setupCamera(videoGaranteFrente, canvasGaranteFrente, photoGaranteFrente, takePhotoBtnGaranteFrente, fotoBase64GaranteFrenteInput);

    const videoGaranteDorso = document.getElementById('videoGaranteDorso');
    const canvasGaranteDorso = document.getElementById('canvasGaranteDorso');
    const photoGaranteDorso = document.getElementById('photoGaranteDorso');
    const takePhotoBtnGaranteDorso = document.getElementById('takePhotoGaranteDorso');
    const fotoBase64GaranteDorsoInput = document.getElementById('fotoBase64GaranteDorso');
      try {
        setupCamera(videoGaranteDorso, canvasGaranteDorso, photoGaranteDorso, takePhotoBtnGaranteDorso, fotoBase64GaranteDorsoInput);
    }
     catch(error){
            console.log("No existe o no esta acticada")
        }

    // Inicializar lista de barrios al cargar la página
    updateBarrios();

    // Asegurarse de que los barrios se actualicen al cambiar la ciudad
    document.getElementById('ciudad').addEventListener('change', updateBarrios);
});

document.getElementById('generarPdf').addEventListener('click', function() {
    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Obtener el nombre del titular
    const nombreTitular = document.getElementById('nombre').value || 'registro_cliente';
    const filename = `${nombreTitular.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}_${Date.now()}.pdf`;

    // Obtener la imagen en Base64 del titular
    const fotoBase64TitularFrente = document.getElementById('fotoBase64TitularFrente').value;
    const fotoBase64TitularDorso = document.getElementById('fotoBase64TitularDorso').value;

    // Obtener la imagen en Base64 del conyuge
    const fotoBase64ConyugeFrente = document.getElementById('fotoBase64ConyugeFrente').value;
    const fotoBase64ConyugeDorso = document.getElementById('fotoBase64ConyugeDorso').value;

    // Obtener la imagen en Base64 del GARANTE
    const fotoBase64GaranteFrente = document.getElementById('fotoBase64GaranteFrente').value;
    const fotoBase64GaranteDorso = document.getElementById('fotoBase64GaranteDorso').value;

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

    // Agregar la imagen al PDF (TITULAR)
    if (fotoBase64TitularFrente) {
        doc.addImage(fotoBase64TitularFrente, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
    if (fotoBase64TitularDorso) {
        doc.addImage(fotoBase64TitularDorso, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }

    y += 5;

    // Datos del cónyuge (si aplica)
    if (document.getElementById('estado_civil').value === 'casada') {
        addText('Datos del Cónyuge:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${document.getElementById('nombre_conyuge').value}`);
        addText(`Lugar de Trabajo: ${document.getElementById('lugar_trabajo_conyuge').value}`);
        addText(`Ingreso Mensual: ${document.getElementById('ingreso_conyuge').value}`);
 // Agregar la imagen al PDF (CONYUGE)
     if (fotoBase64ConyugeFrente) {
        doc.addImage(fotoBase64ConyugeFrente, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
     if (fotoBase64ConyugeDorso) {
        doc.addImage(fotoBase64ConyugeDorso, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }

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

      // Agregar la imagen al PDF (GARANTE)
    if (fotoBase64GaranteFrente) {
        doc.addImage(fotoBase64GaranteFrente, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
      if (fotoBase64GaranteDorso) {
        doc.addImage(fotoBase64GaranteDorso, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }

    y += 5;
    addText(`Observaciones Generales: ${document.getElementById('observaciones').value}`);
   
     // Guardar el PDF
    doc.save(filename);
});