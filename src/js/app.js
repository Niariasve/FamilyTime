let planes = {
    1: 'Plan básico',
    2: 'Plan Premium'
}

let loaded = () => {
    formularioEventListener();
    buttonsEventListeners();
}

function formularioEventListener() {
    let formulario = document.getElementById('formulario')
    console.log('hola')

    formulario.addEventListener('submit', e => {
        e.preventDefault();

        let nombre = document.getElementById('form-nombre').value
        let apellido = document.getElementById('form-apellido').value
        let correo = document.getElementById('form-correo').value
        let plan = planes[document.getElementById('form-select').value]

        console.log(nombre, apellido, correo, plan)

        errores = []

        if ((!nombre && !apellido) || (!nombre && apellido)) {
            errores.push('Es obligatorio al menos ingresar el nombre');
        }

        if(!correo) {
            errores.push('Es obligatorio ingresar el correo');
        }

        if(!plan) {
            errores.push('Es obligatorio escoger un plan')
        }

        if(errores.length === 0) {
            mostrarExito();
            guardarObjecto(nombre, apellido, correo, plan);
        } else {
            mostrarErrores(errores);
        }
    })
}

function guardarObjecto(nombre, apellido, contrasena, plan) {

    datos = {
        nombre: nombre,
        apellido: apellido,
        contrasena: contrasena,
        plan: plan
    }
    console.log(datos)

    fetch('https://familytimeapp-default-rtdb.firebaseio.com/collection.json', {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(respuesta => {
        if(!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor', respuesta.status);
        }
        console.log(respuesta.status)
        return respuesta.json();
    })
    .then(datos => {
        console.log(datos)
    })
    .catch(error => {
        console.error();
    })
}

function mostrarErrores(arreglo) {
    let alertas = document.getElementById('alertas');

    alertas.innerHTML = ""

    arreglo.forEach(element => {
        let template = `
            <div class="alerta error">
                <p>${element}</p>
            </div>
        `
        alertas.innerHTML += template;
    })
}

function mostrarExito() {
    let alertas = document.getElementById('alertas');

    template = `
        <div class="alerta exito">
            <p>Se ha hecho el registro exitosamente. Agradecemos su colaboración y le enviaremos un correo en cuanto el producto este listo.</p>
        </div>
    `

    alertas.innerHTML = template;
}

function scrollButtons() {
    let botonesForm = document.querySelectorAll('.form');
    let botonesInfo = document.querySelectorAll('.order');

    // console.log(botonesForm);
    botonesForm.forEach(boton => {
        boton.addEventListener('click', function() {
            document.getElementById('formulario').scrollIntoView({behavior: "smooth"})
        })
    })

    botonesInfo.forEach(boton => {
        boton.addEventListener('click', function() {
            document.getElementById('precio').scrollIntoView({behavior: "smooth"})
        })
    })

    let masInfo = document.querySelector('.info');
    masInfo.addEventListener('click', function() {
        document.getElementById('producto').scrollIntoView({behavior: "smooth"})
    })
}

function buttonsEventListeners() {
    scrollButtons();
}


window.addEventListener('DOMContentLoaded', loaded);