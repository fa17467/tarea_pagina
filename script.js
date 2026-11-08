const SUPABASE_URL = "https://gbolliagbzcrrjjlhtuw.supabase.co";
const APIKEY = "sb_publishable_d-PvAa0oWoEkaSQfZjy8kw_-Y3iZ1iK";
const supabaseClient = supabase.createClient(SUPABASE_URL, APIKEY); 

const cuerpoTabla = document.querySelector("#lista-trabajadores");
const estadoVacio = document.querySelector("#estado-vacio");
const mensaje = document.querySelector("#mensaje");
const botonRecargar = document.querySelector("#boton-recargar");

const formatoDinero = new Intl.NumberFormat("es-Mx", {
    style: "currency",
    currency: "MXN",
});

function mostrarMensaje(texto, tipo = "exito") {
    if(mensaje){
        mensaje.textContent = texto;
        mensaje.className = "mensaje " + tipo;
    }
}


function mostrarTrabajadores(trabajadores){
    cuerpoTabla.replaceChildren();

    if(!trabajadores) return;

    trabajadores.forEach(function(trabajador){
        const fila = document.createElement("tr");

        const id = Number (trabajador.id);
        const created_at = trabajador.created_at;
        const nombre = trabajador.nombre;
        const puesto = trabajador.puesto;
        const sueldo = Number (trabajador.sueldo);
    

        const valores = [
            id,
            created_at,
            nombre,
            puesto,
            formatoDinero.format(sueldo),
        ];
        
        valores.forEach(function (valor) {
            const celda = document.createElement("td");
            celda.textContent = valor;
            fila.appendChild(celda);
        });

        cuerpoTabla.appendChild(fila);
    });

    estadoVacio.hidden = trabajadores.length != 0;
}

async function obtenerTrabajadores() {
  let { data: Trabajadores, error } = await supabaseClient
  .from('Trabajadores')
  .select('*');  

    if (error) {
        console.error("Error de supabase: ", error);
        mostrarMensaje("Error: " + error.message, "error");
        return;
    }

    mostrarTrabajadores(Trabajadores);
    mostrarMensaje("Los datos fueron cargados correctamente: ");
}

if(botonRecargar){
    botonRecargar.addEventListener("click", obtenerTrabajadores);
}

obtenerTrabajadores();
