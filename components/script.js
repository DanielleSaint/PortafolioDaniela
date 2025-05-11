const text = "Desarrolladora Web Full Stack / Java - Frontend";
const velocidad = 50;
const borrar = 50;
const ciclo = 1000; //Espera antes de volver a empezar

let i = 0; //Contador de letra
let borrando = false;
const target = document.getElementById("tecleando");

function bucle() {
if (!borrando && i <= text.length) {
    target.innerHTML = text.substring(0, i);
    i++; //Agrega letra del text
    setTimeout(bucle, velocidad);
} else if (borrando && i >= 0) {
    target.innerHTML = text.substring(0, i);
    i--; //Quita letra del text de derecha a izquierda
    setTimeout(bucle, borrar);
} else {
    borrando = !borrando; //Este cambia el estado de borrando
    setTimeout(bucle, ciclo); //Repite bucle para escribir o borrar
}
}
window.onload = bucle; //Iniciar cuando se cargue la página
//--------------------------------------------------------------------------------------------------
//Boton menu
function desplegar() {
document.getElementById("menuContenido").classList.toggle("mostrar");
}
//Cierra el menú al hacer clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.menu img')) {
        const desplegable = document.getElementsByClassName("contenido-menu");
        for (let i = 0; i < desplegable.length; i++) {
        const abrirDesplegable = desplegable[i];
            if (abrirDesplegable.classList.contains('mostrar')) {
                abrirDesplegable.classList.remove('mostrar');
            }
        }
    }
}
//--------------------------------------------------------------------------------------------------
//Boton Neon Mode
let neonMode = false;
const originalStyles = new Map();
//eligir aleatoriamente un color de la lista
function randomNeonColor() {
    const neonColors = [
        '#39ff14', '#ff073a', '#f0f', '#0ff', '#ff6ec7', '#ffae00', '#9d00ff', '#00ffff', '#ff00ff', '#ffff00'
    ];
    return neonColors[Math.floor(Math.random() * neonColors.length)];
}
//Ejecutar el cambio de las propiedades
document.getElementById('neonToggle').addEventListener('click', () => {
    neonMode = !neonMode; //Cambiar el valor boolean
    //Selecionar el body, los elementos del HTML y la foto de perfil para cambiar las propiedades
    const body = document.body;
    const allElements = document.querySelectorAll('*');
    const fotoPerfil = document.getElementById('fotoPerfil');
    const sombras = document.querySelectorAll('.sombra-clara');

    if (neonMode) { //Si está activado
        // Cambiar la imagen de perfil en modo neón
        fotoPerfil.src = "./assets/img/Perfil-Neon.png";
        //Guardar estilos originales
        allElements.forEach(el => {
            originalStyles.set(el, { //Agregar estilos al Map
                color: el.style.color,
                backgroundColor: el.style.backgroundColor,
                borderColor: el.style.borderColor
            });
        });
        //Cambiar el fondo negro para el tema neon
        body.style.backgroundColor = "#000";
        allElements.forEach(el => {
            if (el.tagName.match(/H[1-6]|P|SPAN|A|STRONG|BUTTON|LI|LABEL|DIV/)) { //Cada etiqueta cambia sus propiedades
                const neon = randomNeonColor(); //Seleciona el color aleatorio
                el.style.color = neon;
                el.style.borderColor = neon;
                el.style.boxShadow = neon
            }
        });
        sombras.forEach(el => {
            const neon = randomNeonColor();
            el.style.boxShadow = `0 0 10px ${neon}, 0 0 20px ${neon}, 0 0 30px ${neon}`; //Cambiar sombras neon
        });
    } else {
        // Volver a la imagen de modo claro
        fotoPerfil.src = "./assets/img/Perfil-Claro.png";
        //Restaurar estilos originales
        allElements.forEach(el => {
            const styles = originalStyles.get(el); //Obtener estilos de Map
            if (styles) {
                el.style.color = styles.color;
                el.style.backgroundColor = styles.backgroundColor;
                el.style.borderColor = styles.borderColor;
            }
        });
        sombras.forEach(el => {
            el.style.boxShadow = "0 4px 8px rgba(148, 0, 230, 0.3)"; //Cambiar sombras claras
        });
        body.style.backgroundColor = ""; //Cambiar fondo claro
    }
});
//--------------------------------------------------------------------------------------------------
//Formulario
document.addEventListener("DOMContentLoaded", function () { //espera a que todo el contenido HTML se cargue completamente antes de ejecutar el script
    const form = document.querySelector("#box-form-propiedades"); //seleccionamos el formulario usando su ID

    form.addEventListener("submit", function (e) { //escucha el evento de "submit" del formulario
        e.preventDefault(); // Evita que se refresque la página
        // Obtener los valores que el usuario escribió
        const nombre = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const mensaje = form.querySelector('textarea').value;
        // Imprime en consola los valores que el usuario escribió
        console.log("Formulario enviado:");
        console.log("Nombre:", nombre);
        console.log("Email:", email);
        console.log("Mensaje:", mensaje);
        // Mensaje de alerta
        Swal.fire({ //SweetAlert2 es una librería externa para mostrar alertas personalizadas.
            title: '¡Gracias por tu mensaje!',
            text: 'Te contactaré muy pronto 😊',
            icon: 'success',
            confirmButtonColor: '#946CFF',
            background: '#290040',
            color: '#946CFF',
        });
        // Limpiar el formulario
        form.querySelector('input[type="text"]').value = "";
        form.querySelector('input[type="email"]').value = "";
        form.querySelector('textarea').value = "";
    });
});
