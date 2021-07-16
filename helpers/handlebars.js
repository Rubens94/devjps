module.exports = {
    seleccionarSkills: (seleccionadas = [], opciones) => {


        const skills = ['HTML5', 'CSS3', 'CSSGrid', 'Flexbox', 'JavaScript', 'jQuery', 'Node', 'Angular', 
        'VueJS', 'ReactJS', 'React Hooks', 'Redux', 'Apollo', 'GraphQL', 'TypeScript', 'PHP', 'Laravel', 
        'Symfony', 'Python', 'Django', 'ORM', 'Sequelize', 'Mongoose', 'SQL', 'MVC', 'SASS', 'WordPress'];

        let html = '';
        skills.forEach(skill => {
            html += `
                <li ${seleccionadas.includes(skill) ? 'class="activo"' : ""}>${skill}</li> 
            `; // Rellenar las skills que ya estan seleccionadas en la BD
        });

        return opciones.fn().html = html;
    },

    tipoContrato: (seleccionado, opciones) => {
        return opciones.fn(this).replace(
            new RegExp(` value="${seleccionado}"`), '$& selected="selected"' // $& inserta un string
        )
    },
    // Solo sirve para handlebars
    mostrarAlertas: (errores = {}, alertas) => {

        const categoria = Object.keys(errores); // Object.keys trae la llave de los objetos

        //console.log(errores[categoria]);
        let html = '';
        if(categoria.length) {
            errores[categoria].forEach(error => {
                html+= ` <div class="${categoria} alerta">
                ${error}
                </div>
                `;
            });
        }
        return alertas.fn().html = html;
    }
}