document.addEventListener("DOMContentLoaded", events=>{
    const mnx = document.getElementById('mnxImpuestos');
    if(mnx){
        mnx.addEventListener('click',e=>{
            e.preventDefault();
            let form = e.target.dataset.form;
            if(form) cargarForm(form);
        });
    }
});

function cargarForm(form, callback){
    if( $(`#${form} > form`).length<=0 ){
        fetch(`/vistas?form=${form}`)
        .then(response => response.text())
        .then(ventana => {
            $(`#${form}`).html(ventana).draggable();
            cerrarVentana();
            if(form === 'usuarios') {
                configurarEnvioUsuarios();
            }
            if(callback) callback();
        })
        .catch(error => console.error('Error al cargar el formulario:', error));
    }else{
        $(`#${form}`).show();
        if(form === 'usuarios') {
            configurarEnvioUsuarios(); // Esto asegura que funcione aunque ya estuviera abierto
        }
    }
}
function cerrarVentana(){
    $('.btn-close').off('click').on('click',e=>{
        e.preventDefault();
        let form = e.target.dataset.form;
        console.log(form);
        $(`#${form}`).hide();
    });
}

function configurarEnvioUsuarios() {
    const formUsuarios = document.getElementById("formUsuarios");
    if(formUsuarios) {
        formUsuarios.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            const datos = {
                modulo: document.getElementById("modulo").value,
                accion: document.getElementById("accion").value,
                idUsuario: document.getElementById("idUsuario").value,
                usuario: document.getElementById("usuario").value,
                clave: document.getElementById("clave").value,
                nombre: document.getElementById("nombre").value,
                direccion: document.getElementById("direccion").value,
                telefono: document.getElementById("telefono").value
            };

            try {
                const respuesta = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();
                alert(resultado.msg);
                formUsuarios.reset();
            } catch (error) {
                console.error("Error al guardar el usuario:", error);
            }
        });
    }
}