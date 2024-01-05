document.addEventListener('DOMContentLoaded', function() {
    const dias = document.getElementById('dias');
    const mesAnterior = document.getElementById('mesAnterior');
    const mesSiguiente = document.getElementById('mesSiguiente');
    const encabezado = document.getElementById('encabezado');
    const inputAnio = document.getElementById('inputAnio');
    const inputMes = document.getElementById('inputMes');
    const inputDia = document.getElementById('inputDia');
    const confirmarFecha = document.getElementById('confirmarFecha');
    const textoMensaje = document.getElementById('textoMensaje');

    let fechaActual = new Date();
    let fechaSeleccionada = null;

    const nombresDeMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const nombresDeDias = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

    const dibujarEncabezado = () => {
        encabezado.textContent = `${nombresDeMeses[fechaActual.getMonth()]} ${fechaActual.getFullYear()}`;
    };

    const dibujarDiasDeLaSemana = () => {
        dias.innerHTML = '';
        nombresDeDias.forEach(dia => {
            let diaElemento = document.createElement('div');
            diaElemento.classList.add('dia-de-la-semana');
            diaElemento.textContent = dia;
            dias.appendChild(diaElemento);
        });
    };

    const dibujarDiasDelMes = () => {
        let fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        while (fecha.getDay() !== 0) {
            fecha.setDate(fecha.getDate() - 1);
        }
        for (let i = 0; i < 42; i++) {
            let dia = document.createElement('div');
            dia.classList.add('dia');
            if (fecha.getMonth() !== fechaActual.getMonth()) {
                dia.classList.add('dia-fuera');
            }
            dia.textContent = fecha.getDate();
            if (fechaSeleccionada && fecha.getDate() === fechaSeleccionada.getDate() &&
                fecha.getMonth() === fechaSeleccionada.getMonth() &&
                fecha.getFullYear() === fechaSeleccionada.getFullYear()) {
                dia.classList.add('dia-seleccionado');
            }
    
            // Agregar manejador de clic para cada día
            (function(fechaCapturada) {
                dia.addEventListener('click', function() {
                    fechaSeleccionada = new Date(fechaCapturada);
                    actualizarMensaje(fechaSeleccionada);
                    dibujarCalendario(); // Redibujar para actualizar la selección visual
                });
            })(new Date(fecha));
    
            dias.appendChild(dia);
            fecha.setDate(fecha.getDate() + 1);
        }
    };

    const dibujarCalendario = () => {
        dibujarEncabezado();
        dibujarDiasDeLaSemana();
        dibujarDiasDelMes();
    };

    const actualizarMensaje = (fecha) => {
        let mensaje = "";
        let diaDelAnio = obtenerDiaDelAnio(fecha);
        let patron = Math.floor(diaDelAnio / 2) % 4;
    
        switch (patron) {
            case 0:
                mensaje = "Entras en la mañana";
                break;
            case 1:
                mensaje = "Entras en la tarde";
                break;
            case 2:
                mensaje = "Entras en la noche";
                break;
            case 3:
                mensaje = "Estás libre";
                break;
        }
    
        textoMensaje.value = mensaje;
    };
    
    const obtenerDiaDelAnio = (fecha) => {
        const comienzoAnio = new Date(fecha.getFullYear(), 0, 1);
        const diferencia = fecha - comienzoAnio;
        const unDia = 1000 * 60 * 60 * 24;
        return Math.floor(diferencia / unDia) + 1;
    };
    
    

    mesAnterior.addEventListener('click', () => {
        fechaActual.setMonth(fechaActual.getMonth() - 1);
        dibujarCalendario();
    });

    mesSiguiente.addEventListener('click', () => {
        fechaActual.setMonth(fechaActual.getMonth() + 1);
        dibujarCalendario();
    });

    confirmarFecha.addEventListener('click', () => {
        const anio = parseInt(inputAnio.value, 10);
        const mes = parseInt(inputMes.value, 10) - 1;
        const dia = parseInt(inputDia.value, 10);

        if (!isNaN(anio) && !isNaN(mes) && !isNaN(dia)) {
            fechaSeleccionada = new Date(anio, mes, dia);
            fechaActual = new Date(anio, mes, 1);
            dibujarCalendario();
            actualizarMensaje(fechaSeleccionada);
        } else {
            alert("Por favor, ingrese una fecha válida.");
        }
    });

    dibujarCalendario();
});

