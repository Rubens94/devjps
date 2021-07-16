
document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelector('.lista-conocimientos');

    // Limpiar las alertas
    let alertas = document.querySelector('.alertas');

    if(alertas){
        limpiarAlertas();
    }

    if(skills){
        skills.addEventListener('click', agregarSkills);

        // Una vez que estamos en editar se manda a llemar la función
        skillsSeleccionados();
    }
})

const skills = new Set(); // Agregar habilidades sin duplicar

const agregarSkills = e => {

    if(e.target.tagName === 'LI'){
        if(e.target.classList.contains('activo')){
            // quitarlo del set y quitar la clase
            skills.delete(e.target.textContent); // Quitar el contenido dentro de un objeto
            e.target.classList.remove('activo'); // Quitar la clase al elemento
        } else {
            // agregarlo al set y agregar la clase
            skills.add(e.target.textContent); // Agrega el contenido dentro de un objeto
            e.target.classList.add('activo'); // Agregar clase al elemento
        }
    } 

    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;

}

// Función para llenar las skills en el div hidden
const skillsSeleccionados = () => {

    const seleccionadas = Array.from(document.querySelectorAll('.lista-conocimientos .activo')); // Convertir el resultado en un array

    seleccionadas.forEach( seleccionada => {
        skills.add(seleccionada.textContent);
    })

    // Inyectarlo en el hidden
    const skillsArray = [...skills];
    document.querySelector('#skills').value = skillsArray;
}

const limpiarAlertas = () => {

    const alertas = document.querySelector('.alertas');
    const interval = setInterval(() => { // ejecutar las funciones dentro de setInterval el tiempo establesido antes del cierre
        if(alertas.children.length > 0) { // saber cuantas alertas tiene la clase alertas
            alertas.removeChild(alertas.children[0]);
        } else if (alertas.children.length === 0) {
            alertas.parentElement.removeChild(alertas); // remover clase padre después de limpiar todas las alertas
            clearInterval(interval);
        }
    }, 2000);
}