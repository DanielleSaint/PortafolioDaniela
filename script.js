const text = "Desarrolladora Web Full Stack / Java - Frontend";
const velocidad = 50;
const borrar = 50;
const ciclo = 1000; // Espera antes de volver a empezar

let i = 0;
let borrando = false;
const target = document.getElementById("tecleando");

function bucle() {
if (!borrando && i <= text.length) {
    target.innerHTML = text.substring(0, i);
    i++;
    setTimeout(bucle, velocidad);
} else if (borrando && i >= 0) {
    target.innerHTML = text.substring(0, i);
    i--;
    setTimeout(bucle, borrar);
} else {
    borrando = !borrando;
    setTimeout(bucle, ciclo);
}
}
window.onload = bucle;

//Boton menu
function desplegar() {
document.getElementById("menuContenido").classList.toggle("mostrar");
}
// Cierra el menú si haces clic fuera de él
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

//Boton tema Neon
let neonMode = false;
const originalStyles = new Map();

function randomNeonColor() {
    const neonColors = [
        '#39ff14', '#ff073a', '#f0f', '#0ff', '#ff6ec7',
        '#ffae00', '#9d00ff', '#00ffff', '#ff00ff', '#ffff00'
    ];
    return neonColors[Math.floor(Math.random() * neonColors.length)];
}
document.getElementById('neonToggle').addEventListener('click', () => {
    neonMode = !neonMode;

    const body = document.body;
    const allElements = document.querySelectorAll('*');

    if (neonMode) {
        // Guardar estilos originales
        allElements.forEach(el => {
            originalStyles.set(el, {
                color: el.style.color,
                backgroundColor: el.style.backgroundColor,
                borderColor: el.style.borderColor
            });
        });

        body.style.backgroundColor = "#000";

        allElements.forEach(el => {
            if (el.tagName.match(/H[1-6]|P|SPAN|A|STRONG|BUTTON|LI|LABEL|DIV/)) {
                const neon = randomNeonColor();
                el.style.color = neon;
                el.style.borderColor = neon;
            }
        });

    } else {
        // Restaurar estilos originales
        allElements.forEach(el => {
            const styles = originalStyles.get(el);
            if (styles) {
                el.style.color = styles.color;
                el.style.backgroundColor = styles.backgroundColor;
                el.style.borderColor = styles.borderColor;
        
                // Restaurar fondo de inputs y textareas
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.style.backgroundColor = styles.backgroundColor || "";
                }
            }
        });
        body.style.backgroundColor = "";
    }
});

//no funciona
// Al cargar la página, aplicar el tema guardado si existe
window.addEventListener('DOMContentLoaded', () => {
    const isNeon = localStorage.getItem('neon-mode') === 'true';
    if (isNeon) {
        document.body.classList.add('neon-mode');
    }
});

// Alternar modo neón y guardar en localStorage
document.getElementById("neonToggle").addEventListener("click", function() {
    const isActive = document.body.classList.toggle("neon-mode");
    localStorage.setItem('neon-mode', isActive);
});
