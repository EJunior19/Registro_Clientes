function toggleGarante() {
    const tieneGarante = document.getElementById('tiene_garante').value;
    const garanteSection = document.getElementById('garanteSection');
    garanteSection.style.display = (tieneGarante === 'si') ? 'block' : 'none';
}

function toggleConyuge() {
    const estadoCivil = document.getElementById('estado_civil').value;
    const conyugeSection = document.getElementById('conyugeSection');
    conyugeSection.style.display = (estadoCivil === 'casada') ? 'block' : 'none';
}

function updateBarrios() {
 const barrioSelect = document.getElementById('barrio');
    const barrios = [
        'Jardín del Norte', 'Renacer', 'Nuevo Horizonte', 'San José', 'María Auxiliadora',
        'Karen Luana', 'Santa Teresa', 'Adela Speratti', 'San Blas', 'Villa Florida',
        'Stella Marys', 'Donde Nace El Sol', 'Santa Rosa', 'San Miguel', 'Primavera',
        'Residencial Acuario', 'Rayito de Sol Kilómetro 2', 'San Francisco', 'San Jorge',
        "Ko'e Rory", "San Juan", "8 de diciembre", "Cafetal guaraní", "15 de agosto",
        "Las palmeras", "Barrio Morán", "Otro"
    ];
    // Limpiar opciones anteriores
    barrioSelect.innerHTML = "<option value=''>Seleccione un barrio</option>";

    // Agregar las opciones
  for (const barrio of barrios) {
     const option = document.createElement("option");
      option.value = barrio;
        option.text = barrio;
        barrioSelect.add(option);
     

    }
};

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

    function setupCamera(target) {
   const video = document.getElementById(`video${target}`);
 const canvas = document.getElementById(`canvas${target}`);
const photo = document.getElementById(`photo${target}`);
    const takePhotoBtn = document.getElementById(`takePhoto${target}`);
        const fotoBase64Input = document.getElementById(`fotoBase64${target}`);
     navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })

            .then(function(stream) {
                video.srcObject = stream;
    photo.srcObject = stream;
             video.style.display = 'block';
 console.log('video.srcObject'+video.srcObject);
            })
            .catch(function(err) {
                console.log("Ocurrió un error al acceder a la cámara : " + err);
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
 // Inicia todos los elementos
    const listaVideos = ["TitularFrente","TitularDorso","ConyugeFrente","ConyugeDorso","GaranteFrente","GaranteDorso"]
        listaVideos.forEach(videoAct =>{
    const videoTitularFrente = document.getElementById(`video${videoAct}`);
  try{
           setupCamera(videoAct)
  
          }
      catch(error){
              console.log("Error"+error)

          }
        })

    // Acceder a la cámara al cargar la página
       
     updateBarrios();
  
});

document.getElementById('generarPdf').addEventListener('click', function() {
    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let pageHeight = doc.internal.pageSize.getHeight();
    let margin = 15;
    let y = margin;

const nombreTitular = document.getElementById('nombre').value || 'registro_cliente';
    const filename = `${nombreTitular.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')}_${Date.now()}.pdf`;

const fotoBase64TitularFrente = document.getElementById('fotoBase64TitularFrente').value;
    const fotoBase64TitularDorso = document.getElementById('fotoBase64TitularDorso').value;
    const nombre = document.getElementById('nombre').value;
const cedula = document.getElementById('cedula').value;
 const telefono = document.getElementById('telefono').value;
  const ciudad = document.getElementById('ciudad').value;
const barrio = document.getElementById('barrio').value;
 const estadoCivil = document.getElementById('estado_civil').value;
    const vivePareja = document.getElementById('vive_pareja').value;
     let nombreConyuge="" ,lugarTrabajoConyuge="" ,ingresoConyuge=""
          if (document.getElementById('estado_civil').value === 'casada') {
       nombreConyuge = document.getElementById('nombre_conyuge').value;
    lugarTrabajoConyuge = document.getElementById('lugar_trabajo_conyuge').value;
         ingresoConyuge = document.getElementById('ingreso_conyuge').value;

        }

 const fotoBase64ConyugeFrente = document.getElementById('fotoBase64ConyugeFrente').value;
  const fotoBase64ConyugeDorso = document.getElementById('fotoBase64ConyugeDorso').value;
  let fotoBase64GaranteFrente = "",fotoBase64GaranteDorso= "";
      try{
          
 if (document.getElementById('tiene_garante').value === 'si') {
     const nombreGarante = document.getElementById('nombre_garante').value;
         const cedulaGarante = document.getElementById('cedula_garante').value;
       const telefonoGarante = document.getElementById('telefono_garante').value;
    const direccionGarante = document.getElementById('direccion_garante').value;
   const lugarTrabajoGarante = document.getElementById('lugar_trabajo_garante').value;
      const ingresoMensualGarante = document.getElementById('ingreso_mensual_garante').value;
           fotoBase64GaranteFrente = document.getElementById('fotoBase64GaranteFrente').value;
         fotoBase64GaranteDorso = document.getElementById('fotoBase64GaranteDorso').value;
         }}
       catch(error){
              fotoBase64GaranteFrente ="No Disponible";
               fotoBase64GaranteDorso = "No Disponible";
  
            }
 // defino
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
           doc.addImage(fotoBase64TitularFrente, 'JPEG', margin, y, 80, 60);
        
    }
      ensureSpace(70)
     if (fotoBase64TitularDorso) {
        doc.addImage(fotoBase64TitularDorso, 'JPEG', margin, y, 80, 60);
     }
        ensureSpace(70)
    y += 5;
 
  
    // Datos del cónyuge (si aplica)
    if (document.getElementById('estado_civil').value === 'casada') {
        addText('Datos del Cónyuge:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${nombreConyuge}`);
        addText(`Lugar de Trabajo: ${lugarTrabajoConyuge}`);
        addText(`Ingreso Mensual: ${ingresoConyuge}`);
         // Agregar la imagen al PDF (CONYUGE)
 if (fotoBase64ConyugeFrente) {
            doc.addImage(fotoBase64ConyugeFrente, 'JPEG', margin, y, 80, 60);
   
        }
        ensureSpace(100)
     if (fotoBase64ConyugeDorso) {
         
doc.addImage(fotoBase64ConyugeDorso, 'JPEG', margin, y, 80, 60);
        }
        y += 5;
              
           ensureSpace(100)
    }
      if (document.getElementById('tiene_garante').value === 'si') {
   addText('Datos del Garante:', { fontSize: 14, fontWeight: 'bold' });
        addText(`Nombre Completo: ${nombreGarante}`);
   addText(`Cedula: ${cedulaGarante}`);
         addText(`Teléfono: ${telefonoGarante}`);
            addText(`Dirección: ${direccionGarante}`);
  addText(`Lugar de Trabajo: ${lugarTrabajoGarante}`);
     addText(`Ingreso Mensual: ${ingresoMensualGarante}`);

            

     // Agregar la imagen al PDF (GARANTE)
       ensureSpace(70);
     if (fotoBase64GaranteFrente) {
       
       doc.addImage(fotoBase64GaranteFrente, 'JPEG', margin, y, 80, 60);
            
        }
        
            ensureSpace(100)
     if (fotoBase64GaranteDorso) {
  doc.addImage(fotoBase64GaranteDorso, 'JPEG', margin, y, 80, 60);
     
         
    }

        y += 5;
     
}
        ensureSpace(100)

 // Información Laboral del Titular
  ensureSpace(50)
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
    addText(`Observaciones Generales: ${observaciones}`);
    y += 5;
   ensureSpace(100)
    // Guardar el PDF
    doc.save(filename);
});
   