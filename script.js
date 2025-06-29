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

function formatearTelefono(input) {
    let telefono = input.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    telefono = telefono.substring(0, 10); // Limitar a 10 dígitos (ejemplo)

    if (telefono.length > 4) {
        telefono = telefono.substring(0, 4) + ' ' + telefono.substring(4);
    }
     if (telefono.length > 8) {
        telefono = telefono.substring(0, 8) + ' ' + telefono.substring(8);
    }
    input.value = telefono;
}

document.addEventListener('DOMContentLoaded', function() {
    toggleGarante();
    toggleConyuge();

    // Acceder a la cámara al cargar la página y configurar los event listeners para las fotos
    function setupCamera(target) {
        const video = document.getElementById(`video${target}`);
        const canvas = document.getElementById(`canvas${target}`);
        const photo = document.getElementById(`photo${target}`);
        const takePhotoBtn = document.getElementById(`takePhoto${target}`);
        const fotoBase64Input = document.getElementById(`fotoBase64${target}`);

        navigator.mediaDevices.getUserMedia({
    video: { facingMode: { exact: "environment" } }
  })
            .then(function(stream) {
                video.srcObject = stream;
                video.style.display = 'block';
            })
            .catch(function(err) {
                console.log("Ocurrió un error al acceder a la cámara: " + err);
            });

        takePhotoBtn.addEventListener('click', function() {
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            let image_data_url = canvas.toDataURL('image/jpeg');

            photo.setAttribute('src', image_data_url);
            fotoBase64Input.setAttribute('value', image_data_url);

            video.style.display = 'none';
            canvas.style.display = 'none';
            photo.style.display = 'block';
        });
    }

    // Iterar sobre cada botón de tomar foto
    const takePhotoButtons = document.querySelectorAll('.takePhoto');
    takePhotoButtons.forEach(button => {
        setupCamera(button.dataset.target);
    
  });


        // Iniciar lista de barrios al cargar la página
        updateBarrios();
    });

document.getElementById('generarPdf').addEventListener('click', function() {
    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let pageHeight = doc.internal.pageSize.getHeight();
    let margin = 15;
    let y = margin;
    // Función para agregar texto con formato
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
       function ensureSpace(height) {
          if (y + height > pageHeight - margin) {
            doc.addPage();
            y = margin;
          }
        }
    // Obtener el nombre del titular
    const nombreTitular = document.getElementById('nombre').value || 'registro_cliente';
    const filename = `${nombreTitular.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}_${Date.now()}.pdf`;

    // Obtener la imagen en Base64
    const fotoBase64TitularFrente = document.getElementById('fotoBase64TitularFrente').value;
    const fotoBase64TitularDorso = document.getElementById('fotoBase64TitularDorso').value;

  const estadoCivil = document.getElementById('estado_civil').value;
   ensureSpace(30)
  if (estadoCivil === 'casada') {
     const fotoBase64ConyugeFrente = document.getElementById('fotoBase64ConyugeFrente').value;
    const fotoBase64ConyugeDorso = document.getElementById('fotoBase64ConyugeDorso').value;
     ensureSpace(30)
   }

  const tieneGarante = document.getElementById('tiene_garante').value;
        // Obtener la imagen en Base64 del GARANTE
        if (tieneGarante === 'si') {
     const fotoBase64GaranteFrente = document.getElementById('fotoBase64GaranteFrente').value;
    const fotoBase64GaranteDorso = document.getElementById('fotoBase64GaranteDorso').value;
    
        }
     ensureSpace(30)

    // Título del PDF
    addText('Registro de Visita a Cliente', { fontSize: 18, fontWeight: 'bold' });
    y += 10;
    ensureSpace(50)
    // Datos del cliente
    addText('Datos del Cliente:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre y Apellido: ${document.getElementById('nombre').value}`);
    addText(`Cédula: ${document.getElementById('cedula').value}`);
    addText(`Teléfono: ${document.getElementById('telefono').value}`);
    addText(`Ciudad: ${document.getElementById('ciudad').value}, Barrio: ${document.getElementById('barrio').value}`);
    addText(`Estado Civil: ${document.getElementById('estado_civil').value}`);
    addText(`¿Vive con su pareja?: ${document.getElementById('vive_pareja').value}`);
    if (fotoBase64TitularFrente) {
        doc.addImage(fotoBase64TitularFrente, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
      ensureSpace(100)
     if (fotoBase64TitularDorso) {
        doc.addImage(fotoBase64TitularDorso, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }

    y += 5;
     ensureSpace(50)
    // Datos del cónyuge (si aplica)
    if (document.getElementById('estado_civil').value === 'casada') {
        addText('Datos del Cónyuge:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${document.getElementById('nombre_conyuge').value}`);
        addText(`Lugar de Trabajo: ${document.getElementById('lugar_trabajo_conyuge').value}`);
        addText(`Ingreso Mensual: ${document.getElementById('ingreso_conyuge').value}`);
  
        if (fotoBase64ConyugeFrente) {
        doc.addImage(fotoBase64ConyugeFrente, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
       ensureSpace(100)
     if (fotoBase64ConyugeDorso) {
        doc.addImage(fotoBase64ConyugeDorso, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }

        y += 5;
        ensureSpace(50)
    }
 // Agregar la imagen al PDF (GARANTE)
      if (fotoBase64GaranteFrente) {
        doc.addImage(fotoBase64GaranteFrente, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
     if (fotoBase64GaranteDorso) {
        doc.addImage(fotoBase64GaranteDorso, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
    // Información Laboral del Titular
    addText('Información Laboral del Titular:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Lugar de Trabajo: ${document.getElementById('lugar_trabajo_titular').value}`);
    addText(`Tiempo en el Trabajo: ${document.getElementById('tiempo_trabajo').value}`);
    addText(`Ingreso Mensual: ${document.getElementById('ingreso_mensual_titular').value}`);
    addText(`Contacto Laboral: ${document.getElementById('contacto_laboral').value}`);
    y += 5;
   ensureSpace(50)
    // Producto solicitado
    addText('Producto Solicitado:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre del Producto: ${document.getElementById('nombre_producto').value}`);
    addText(`Código: ${document.getElementById('codigo_producto').value}`);
    addText(`Cuotas: ${document.getElementById('cuotas').value}`);
    addText(`Monto de Cuota: ${document.getElementById('monto_cuota').value}`);
    addText(`¿Hay entrega inicial?: ${document.getElementById('entrega_inicial').value}`);
    y += 5;
    ensureSpace(100)
    // Referencias personales
    addText('Referencias Personales:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Referencia 1 - Nombre: ${document.getElementById('nombre_ref1').value}, Relación: ${document.getElementById('relacion_ref1').value}, Teléfono: ${document.getElementById('telefono_ref1').value}`);
    addText(`Referencia 2 - Nombre: ${document.getElementById('nombre_ref2').value}, Relación: ${document.getElementById('relacion_ref2').value}, Teléfono: ${document.getElementById('telefono_ref2').value}`);
    addText(`Referencia 3 - Nombre: ${document.getElementById('nombre_ref3').value}, Relación: ${document.getElementById('relacion_ref3').value}, Teléfono: ${document.getElementById('telefono_ref3').value}`);
    y += 5;
    ensureSpace(100)
    // Otros
    addText('Otros:', { fontSize: 14, fontWeight: 'bold' });
    addText(`¿Quién usará el producto?: ${document.getElementById('quien_usa').value}`);
    addText(`¿Tiene garante?: ${document.getElementById('tiene_garante').value}`);
    
   y += 5;
    ensureSpace(50)
     addText(`Observaciones Generales: ${document.getElementById('observaciones').value}`);
         
    // Guardar el PDF
    doc.save(filename);
});