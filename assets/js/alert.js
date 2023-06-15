function crearAlerta({ mensaje = 'CAMPO NOMBRE DE JUGADOR <b>REQUERIDO<b>', tipo = 'error' }) {
	const alert = document.createElement('div');
	alert.classList.add('alerta');

	if (tipo == 'error') {
		alert.classList.add('alerta--error');
	} else {
		alert.classList.add('alerta--info');
	}

	const p = document.createElement('p');
	p.innerHTML = mensaje;

	alert.append(p);

	containerAlertas.append(alert);

	alert.addEventListener('animationend', (e) => {
		if (e.animationName == 'desaparecer-alerta') {
			containerAlertas.removeChild(alert);
		}
	});
}
