const sobre = document.querySelector('.sobre');
const indicacion = document.querySelector('.indicacion');
const tarjeta = document.querySelector('.tarjeta');

sobre.addEventListener('click', () => {

    // Abrir el sobre
    sobre.classList.add('abierto');

    // Ocultar la indicación
    indicacion.classList.add('ocultar');

    // Esperar a que la tarjeta termine de salir
    setTimeout(() => {

        // Sacar la tarjeta del sobre
        document.body.appendChild(tarjeta);

        // Esperar un instante para que el navegador
        // registre su nueva posición
        requestAnimationFrame(() => {

            tarjeta.classList.add('expandida');

        });

    }, 1800);

});


// =========================
// CONTROL DE MÚSICA
// =========================

const botonMusica = document.getElementById('botonMusica');
const textoMusica = document.getElementById('textoMusica');
const musica = document.getElementById('musica');

botonMusica.addEventListener('click', () => {

    if (musica.paused) {

    musica.play();

    textoMusica.textContent = 'Pausar música';

    botonMusica.classList.add('reproduciendo');

} else {

    musica.pause();

    textoMusica.textContent = 'Escuchar música';

    botonMusica.classList.remove('reproduciendo');

}

});


// =========================
// CUENTA REGRESIVA
// =========================

const fechaEvento = new Date('2026-10-28T16:00:00');

function actualizarContador() {

    const ahora = new Date();

    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {

        document.getElementById('dias').textContent = '00';
        document.getElementById('horas').textContent = '00';
        document.getElementById('minutos').textContent = '00';
        document.getElementById('segundos').textContent = '00';

        return;
    }

    const dias = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horas = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferencia / 1000) % 60
    );

    document.getElementById('dias').textContent =
        String(dias).padStart(2, '0');

    document.getElementById('horas').textContent =
        String(horas).padStart(2, '0');

    document.getElementById('minutos').textContent =
        String(minutos).padStart(2, '0');

    document.getElementById('segundos').textContent =
        String(segundos).padStart(2, '0');
}


actualizarContador();

setInterval(actualizarContador, 1000);


// =========================
// CONFETI FINAL
// =========================

const botonConfeti = document.getElementById('botonConfeti');

botonConfeti.addEventListener('click', () => {

    for (let i = 0; i < 1000; i++) {

        const confeti = document.createElement('span');

        confeti.classList.add('confeti');

        confeti.style.left = Math.random() * 100 + 'vw';

        confeti.style.animationDelay =
            Math.random() * 0.5 + 's';

        confeti.style.animationDuration =
            2.5 + Math.random() * 2 + 's';

        document.body.appendChild(confeti);

        setTimeout(() => {
            confeti.remove();
        }, 80000000);
    }

});

// =========================
// CONFIRMACIÓN Y MENSAJE
// =========================

const URL_GOOGLE_SHEETS =
    'https://script.google.com/macros/s/AKfycbyWgjp3JeMBHMnKX5JFudRNPSsvNUajooheCNxFRHI-WGSyX_k1yyep1PuyKg4l3yjm/exec';


// =========================
// CONFIRMACIÓN DE ASISTENCIA
// =========================

const botonConfirmar =
    document.getElementById('botonConfirmar');

const nombreInvitado =
    document.getElementById('nombreInvitado');

const mensajeConfirmacion =
    document.getElementById('mensajeConfirmacion');

botonConfirmar.addEventListener('click', async () => {

    const nombre = nombreInvitado.value.trim();

    if (!nombre) {

        mensajeConfirmacion.textContent =
            'Por favor, ingresa tu nombre.';

        return;
    }

    botonConfirmar.disabled = true;

    botonConfirmar.innerHTML =
        '<span>✦</span> Enviando...';

    try {

        await fetch(URL_GOOGLE_SHEETS, {

            method: 'POST',

            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },

            body: JSON.stringify({
                nombre: nombre,
                asistencia: 'Sí',
                mensaje: ''
            })

        });

        mensajeConfirmacion.textContent =
            `¡Gracias, ${nombre}! Tu asistencia ha sido confirmada.`;

        nombreInvitado.value = '';

        botonConfirmar.innerHTML =
            '<span>✓</span> Asistencia confirmada';

    } catch (error) {

        mensajeConfirmacion.textContent =
            'No pudimos registrar tu confirmación. Inténtalo nuevamente.';

        botonConfirmar.disabled = false;

        botonConfirmar.innerHTML =
            '<span>✉</span> Confirmar asistencia';
    }

});


// =========================
// MENSAJE PARA MA. ISABEL
// =========================

const botonMensaje =
    document.getElementById('botonMensaje');

const nombreMensaje =
    document.getElementById('nombreMensaje');

const textoMensaje =
    document.getElementById('textoMensaje');

const mensajeEnviado =
    document.getElementById('mensajeEnviado');

botonMensaje.addEventListener('click', async () => {

    const nombre = nombreMensaje.value.trim();
    const mensaje = textoMensaje.value.trim();

    if (!nombre) {

        mensajeEnviado.textContent =
            'Por favor, ingresa tu nombre.';

        return;
    }

    if (!mensaje) {

        mensajeEnviado.textContent =
            'Por favor, escribe un mensaje para Ma. Isabel.';

        return;
    }

    botonMensaje.disabled = true;

    botonMensaje.innerHTML =
        '<span>✦</span> Enviando...';

    try {

        await fetch(URL_GOOGLE_SHEETS, {

            method: 'POST',

            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },

            body: JSON.stringify({
                nombre: nombre,
                asistencia: '',
                mensaje: mensaje
            })

        });

        mensajeEnviado.textContent =
            `¡Gracias, ${nombre}! Tu mensaje ha sido enviado.`;

        nombreMensaje.value = '';
        textoMensaje.value = '';

        botonMensaje.innerHTML =
            '<span>✓</span> Mensaje enviado';

    } catch (error) {

        mensajeEnviado.textContent =
            'No pudimos enviar tu mensaje. Inténtalo nuevamente.';

        botonMensaje.disabled = false;

        botonMensaje.innerHTML =
            '<span>✉</span> Enviar mensaje';
    }

});