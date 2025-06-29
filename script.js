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
   const barrioSelect = document.getElementById('barrio');
    const barrios = [
      'Jardín del Norte', 'Renacer', 'Nuevo Horizonte', 'San José', 'María Auxiliadora',
            'Karen Luana', 'Santa Teresa', 'Adela Speratti', 'San Blas', 'Villa Florida',
            'Stella Marys', 'Donde Nace El Sol', 'Santa Rosa', 'San Miguel', 'Primavera',
            'Residencial Acuario', 'Rayito de Sol Kilómetro 2', 'San Francisco', 'San Jorge',
            "Ko'e Rory", "San Juan", "8 de diciembre", "Cafetal guaraní", "15 de agosto",
            "Las palmeras", "Barrio Morán"
        ];
  // Limpiar opciones anteriores
    barrioSelect.innerHTML = "";
    // Agregar las opciones
       let option = document.createElement("option");
        option.value = "";
        option.text = "Seleccione un barrio";
        barrioSelect.add(option);
    for (const barrio of barrios) {
     option = document.createElement("option");
      option.value = barrio;
        option.text = barrio;
        barrioSelect.add(option);
        selectElement.add(option);
       
     

    }}

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
 //Acceder a la cámara y tomar la foto
  
  const takePhotoButtons = document.querySelectorAll('.takePhoto');
         
 takePhotoButtons.forEach(button => {
  const target = button.dataset.target;
  let video,canvas,photo,fotoBase64Input;

  video = document.getElementById(`video${target}`);
  canvas = document.getElementById(`canvas${target}`);
  photo = document.getElementById(`photo${target}`);
  fotoBase64Input = document.getElementById(`fotoBase64${target}`);

    navigator.mediaDevices.getUserMedia({
        video: {
        facingMode: {
          exact: "environment"
        }
      
    }
  
})
    .then (stream => {
     video.srcObject = stream;
    })
    .catch ( e =>
{ console. log ("Error de la Camara");
})

takePhotoBtnFrente.addEventListener('click', function() {
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        let image_data_url = canvas.toDataURL('image/jpeg');

    });
  
 });
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
 // Obtener la imagen en Base64 del titular
    const fotoBase64TitularFrente = document.getElementById('fotoBase64TitularFrente').value;
    const fotoBase64TitularDorso = document.getElementById('fotoBase64TitularDorso').value;
 // OBTENER GARANTE
     const fotoBase64GaranteFrente = document.getElementById('fotoBase64GaranteFrente').value;
    const fotoBase64GaranteDorso = document.getElementById('fotoBase64GaranteDorso').value;

// Obtener la imagen en Base64 del conyuge

 const fotoBase64ConyugeFrente = document.getElementById('fotoBase64ConyugeFrente').value;
    const fotoBase64ConyugeDorso = document.getElementById('fotoBase64ConyugeDorso').value;
  ensureSpace(30);
  
    //Defino una variable para el estado del 

    
    const nombre = document.getElementById('nombre').value;
    const cedula = document.getElementById('cedula').value;
        const telefono = document.getElementById('telefono').value;
        const ciudad = document.getElementById('ciudad').value;
        const barrio = document.getElementById('barrio').value;
        const estadoCivil = document.getElementById('estado_civil').value;
        const vivePareja = document.getElementById('vive_pareja').value;
  const nombreConyuge = document.getElementById('nombre_conyuge').value;
        const lugarTrabajoConyuge = document.getElementById('lugar_trabajo_conyuge').value;
        const ingresoConyuge = document.getElementById('ingreso_conyuge').value;
        const lugarTrabajoTitular = document.getElementById('lugar_trabajo_titular').value;
        const tiempoTrabajo = document.getElementById('tiempo_trabajo').value;
        const ingresoMensualTitular = document.getElementById('ingreso_mensual_titular').value;
        const contactoLaboral = document.getElementById('contacto_laboral').value;
 const nombreProducto = document.getElementById('nombre_producto').value;
        const codigoProducto = document.getElementById('codigo_producto').value;
        const cuotas = document.getElementById('cuotas').value;
        const montoCuota = document.getElementById('monto_cuota').value;
        const entregaInicial = document.getElementById('entrega_inicial').value;
 const nombreRef1 = document.getElementById('nombre_ref1').value;
        const relacionRef1 = document.getElementById('relacion_ref1').value;
        const telefonoRef1 = document.getElementById('telefono_ref1').value;
 const nombreRef2 = document.getElementById('nombre_ref2').value;
        const relacionRef2 = document.getElementById('relacion_ref2').value;
        const telefonoRef2 = document.getElementById('telefono_ref2').value;

        const nombreRef3 = document.getElementById('nombre_ref3').value;
        const relacionRef3 = document.getElementById('relacion_ref3').value;
        const telefonoRef3 = document.getElementById('telefono_ref3').value;
        
        const quienUsa = document.getElementById('quien_usa').value;
        const tieneGarante = document.getElementById('tiene_garante').value;
        const observaciones = document.getElementById('observaciones').value;
 

    // Título del PDF
    addText('Registro de Visita a Cliente', { fontSize: 18, fontWeight: 'bold' });
    y += 10;
    ensureSpace(50)
    // Datos del cliente
    addText('Datos del Cliente:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre y Apellido: ${nombre}`);
    addText(`Cédula: ${cedula}`);
    addText(`Teléfono: ${telefono}`);
    addText(`Ciudad: ${ciudad}, Barrio: ${barrio}`);
    addText(`Estado Civil: ${estadoCivil}`);
    addText(`¿Vive con su pareja?: ${vivePareja === 'si' ? 'Sí' : 'No'}`);
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
    
    // Datos del cónyuge (si aplica)
    if (document.getElementById('estado_civil').value === 'casada') {
        addText('Datos del Cónyuge:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${nombreConyuge}`);
        addText(`Lugar de Trabajo: ${lugarTrabajoConyuge}`);
        addText(`Ingreso Mensual: ${ingresoConyuge}`);
         // Agregar la imagen al PDF (CONYUGE)
        if (fotoBase64ConyugeFrente) {
        doc.addImage(fotoBase64ConyugeFrente, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
        ensureSpace(100)
    if (fotoBase64ConyugeDorso) {
        doc.addImage(fotoBase64ConyugeDorso, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
ensureSpace(50)
        y += 5;
     
    }
 // Agregar la imagen al PDF (GARANTE)
      if (fotoBase64GaranteFrente) {
        doc.addImage(fotoBase64GaranteFrente, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
       ensureSpace(100)
     if (fotoBase64GaranteDorso) {
        doc.addImage(fotoBase64GaranteDorso, 'JPEG', margin, y, 80, 60); // Ajusta la posición y el tamaño según sea necesario
        y += 70;
    }
       ensureSpace(50)
    // Información Laboral del Titular
    addText('Información Laboral del Titular:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Lugar de Trabajo: ${lugarTrabajoTitular}`);
    addText(`Tiempo en el Trabajo: ${tiempoTrabajo}`);
    addText(`Ingreso Mensual: ${ingresoMensualTitular}`);
    addText(`Contacto Laboral: ${contactoLaboral}`);
    y += 5;
   ensureSpace(50)
    // Producto solicitado
    addText('Producto Solicitado:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Nombre del Producto: ${nombreProducto}`);
    addText(`Código: ${codigoProducto}`);
    addText(`Cuotas: ${cuotas}`);
    addText(`Monto de Cuota: ${montoCuota}`);
    addText(`¿Hay entrega inicial?: ${entregaInicial === 'si' ? 'Sí' : 'No'}`);
    y += 5;
    ensureSpace(100)
    // Referencias personales
    addText('Referencias Personales:', { fontSize: 14, fontWeight: 'bold' });
    addText(`Referencia 1 - Nombre: ${nombreRef1}, Relación: ${relacionRef1}, Teléfono: ${telefonoRef1}`);
    addText(`Referencia 2 - Nombre: ${nombreRef2}, Relación: ${relacionRef2}, Teléfono: ${telefonoRef2}`);
    addText(`Referencia 3 - Nombre: ${nombreRef3}, Relación: ${relacionRef3}, Teléfono: ${telefonoRef3}`);
    y += 5;
    ensureSpace(100)
    // Otros
    addText('Otros:', { fontSize: 14, fontWeight: 'bold' });
    addText(`¿Quién usará el producto?: ${quienUsa}`);
    addText(`¿Tiene garante?: ${tieneGarante === 'si' ? 'Sí' : 'No'}`);
 
        ensureSpace(50)
 // Guardar el PDF
    doc.save(filename);
});
 