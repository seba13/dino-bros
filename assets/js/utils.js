function esDispositivoMovil() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let idAnimation;

function instanciarJugador() {
	mario = new Sprite({
		posicion: {
			x: canvas.width / 2.5,
			y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.mario.alto * propGenerales.mario.escalaSprite,
			// y: 0,
		},
		velocidad: {
			x: 0,
			y: 0,
		},
		rutaImagen: './assets/img/sprites-mario-inactivo-derecha-2.png',
		contadorLimiteCuadros: 16,
		maximosCuadros: 12,
		escalaSprite: propGenerales.mario.escalaSprite,
		gravedad: 1,
		offset: {
			x: 35,
			y: 45,
		},
		sprites: {
			inactivoIzquierda: {
				rutaImagen: './assets/img/sprites-mario-inactivo-izquierda-2.png',
				maximosCuadros: '12',
			},
			inactivoDerecha: {
				rutaImagen: './assets/img/sprites-mario-inactivo-derecha-2.png',
				maximosCuadros: '12',
			},
			caminandoIzquierda: {
				rutaImagen: './assets/img/sprites-mario-caminando-izquierda.png',
				maximosCuadros: '5',
			},
			caminandoDerecha: {
				rutaImagen: './assets/img/sprites-mario-caminando-derecha.png',
				maximosCuadros: '5',
			},
			saltandoDerecha: {
				rutaImagen: './assets/img/sprites-mario-saltando-derecha-2.png',
				maximosCuadros: '1',
			},
			saltandoIzquierda: {
				rutaImagen: './assets/img/sprites-mario-saltando-izquierda-2.png',
				maximosCuadros: '1',
			},
			muerto: {
				rutaImagen: './assets/img/sprite-mario-colision.png',
				maximosCuadros: 1,
			},
		},
	});
}

function instanciarNubes() {
	nubesPequeñas = [];
	nubesGrandes = [];

	for (let index = 0; index <= propGenerales.cantidadNubes; index++) {
		nubesPequeñas.push(
			new Animable({
				posicion: {
					x: canvas.width - propGenerales.nubePequeña.ancho + Math.floor(Math.random() * 100 * index) + Math.floor(Math.random() * 1200 + 100),
					y: Math.floor(Math.random() * canvas.height * 0.2),
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				rutaImagen: './assets/img/nube-2.png',
				contadorLimiteCuadros: 0,
				maximosCuadros: 1,
				escalaSprite: propGenerales.nubePequeña.escalaSprite,
				gravedad: 0,
			}),
		);
		nubesGrandes.push(
			new Animable({
				posicion: {
					x: canvas.width - propGenerales.nubePequeña.ancho + Math.floor(Math.random() * 601 * index) + Math.floor(Math.random() * 1200 + 100),
					y: Math.floor(Math.random() * canvas.height * 0.2),
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				rutaImagen: './assets/img/nube-1.png',
				contadorLimiteCuadros: 0,
				maximosCuadros: 1,
				escalaSprite: propGenerales.nubeGrande.escalaSprite,
				gravedad: 0,
			}),
		);
	}
}

function instanciarCesped() {
	cespeds = [];

	propGenerales.cesped.posicionX.forEach((cesped) => {
		cespeds.push(
			new Sprite({
				posicion: {
					x: cesped.x,
					y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.cesped.alto * propGenerales.cesped.escalaSprite,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				rutaImagen: './assets/img/cesped.png',
				contadorLimiteCuadros: 1,
				maximosCuadros: 1,
				escalaSprite: propGenerales.cesped.escalaSprite,
				gravedad: 0,
			}),
		);
	});
}

function instanciarSuelo() {
	suelos = [];
	for (let index = 0; index <= canvas.width / (propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite); index++) {
		suelos.push(
			new Sprite({
				posicion: {
					x: index * propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite,
					y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				rutaImagen: './assets/img/suelo-1.png',
				contadorLimiteCuadros: 1,
				maximosCuadros: 1,
				escalaSprite: propGenerales.suelo.escalaSprite,
				gravedad: 0,
			}),
		);
		suelos.push(
			new Sprite({
				posicion: {
					x: index * propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite,
					y: canvas.height - (propGenerales.suelo.alto / 2) * propGenerales.suelo.escalaSprite,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				rutaImagen: './assets/img/suelo-2.png',
				contadorLimiteCuadros: 1,
				maximosCuadros: 1,
				escalaSprite: propGenerales.suelo.escalaSprite,
				gravedad: 0,
			}),
		);
	}
}

function instanciarCerca() {
	cercas = [];

	// recorrer array de posiciones (coordenada x) de cada cerca
	propGenerales.cerca.posicionX.forEach((cerca, index) => {
		cercas.push(
			new Sprite({
				posicion: {
					x: cerca.x,
					y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.cerca.alto * propGenerales.cerca.escalaSprite,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				rutaImagen: './assets/img/madera.png',
				contadorLimiteCuadros: 1,
				maximosCuadros: 1,
				escalaSprite: propGenerales.cerca.escalaSprite,
				gravedad: 0,
			}),
		);
	});
}

function instanciarFlores() {
	flores = [];
	propGenerales.flor.florRoja.posicionX.forEach((flor) => {
		// flor.x
		flores.push(
			new Sprite({
				posicion: {
					x: flor.x,
					y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.flor.alto * propGenerales.flor.escalaSprite,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				rutaImagen: './assets/img/flor-1.png',
				contadorLimiteCuadros: 1,
				maximosCuadros: 1,
				escalaSprite: propGenerales.flor.escalaSprite,
				gravedad: 0,
			}),
		);
	});
	propGenerales.flor.florAmarilla.posicionX.forEach((flor) => {
		// flor.x
		flores.push(
			new Sprite({
				posicion: {
					x: flor.x,
					y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.flor.alto * propGenerales.flor.escalaSprite,
				},
				velocidad: {
					x: 0,
					y: 0,
				},
				rutaImagen: './assets/img/flor-2.png',
				contadorLimiteCuadros: 1,
				maximosCuadros: 1,
				escalaSprite: propGenerales.flor.escalaSprite,
				gravedad: 0,
			}),
		);
	});
}

function instanciarEnemigo() {
	enemigos = [];

	enemigos.push(
		(goomba = new Enemigo({
			posicion: {
				x: canvas.width / 1.2,
				y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.goomba.alto * propGenerales.goomba.escalaSprite,
				// y: 0,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			rutaImagen: './assets/img/sprite-goomba-3.png',
			contadorLimiteCuadros: 25,
			maximosCuadros: 4,
			escalaSprite: propGenerales.goomba.escalaSprite,
			gravedad: 1,
			offset: {
				x: 0,
				y: 15,
			},
			nombreEnemigo: 'goomba',
		})),
	);

	enemigos.push(
		new Enemigo({
			posicion: {
				x: canvas.width,
				y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.koopa.alto * propGenerales.koopa.escalaSprite,
			},
			velocidad: {
				x: 0,
				y: 0,
			},
			rutaImagen: './assets/img/sprite-koopa-3.png',
			contadorLimiteCuadros: 25,
			maximosCuadros: 5,
			escalaSprite: propGenerales.koopa.escalaSprite,
			gravedad: 1,
			offset: {
				x: 0,
				y: 15,
			},
			nombreEnemigo: 'koopa',
		}),
	);
}

function instanciarTablero() {
	tableroScore = new Tablero({
		posicion: {
			x: canvas.width - propGenerales.tablero.ancho * propGenerales.tablero.escalaSprite,
			y: 10,
		},
		velocidad: {
			x: 0,
			y: 0,
		},
		rutaImagen: './assets/img/score.png',
		contadorLimiteCuadros: 1,
		maximosCuadros: 1,
		escalaSprite: propGenerales.tablero.escalaSprite,
		gravedad: 0,
		offset: {
			x: 0,
			y: 0,
		},
	});
}

function instanciarObjetos() {
	// fondo = new Sprite({
	// 	posicion: {
	// 		x: 0,
	// 		y: 0,
	// 	},
	// 	velocidad: {
	// 		x: 0,
	// 		y: 0,
	// 	},
	// 	rutaImagen: './assets/img/fondo.png',
	// 	contadorLimiteCuadros: 1,
	// 	maximosCuadros: 1,
	// 	escalaSprite: propGenerales.fondo.escalaSprite,
	// 	gravedad: 0,
	// });

	instanciarJugador();

	instanciarNubes();

	instanciarCesped();

	instanciarSuelo();

	instanciarCerca();

	instanciarFlores();

	instanciarEnemigo()

	instanciarTablero();
}

async function cargarPuntuaciones() {
	try {
		let res = await fetch('/scores');
		let json = (await res.json()).puntuaciones;

		let fragment = document.createDocumentFragment();
		let arrayPuntuaciones = Object.values(json);

		while (listaPuntuaciones.firstChild) {
			listaPuntuaciones.removeChild(listaPuntuaciones.firstChild);
		}

		arrayPuntuaciones.sort((a, b) => b.puntuacion - a.puntuacion);

		for (index in arrayPuntuaciones) {
			let liJugador = document.createElement('li');
			liJugador.classList.add('item__lista__puntuaciones');

			let numeroJugador = document.createElement('p');
			numeroJugador.textContent = `#${arrayPuntuaciones[index].id}`;

			let fechaJugador = document.createElement('p');
			const fecha = new Date(arrayPuntuaciones[index].fecha);

			const anio = fecha.getFullYear();
			const mes = fecha.getMonth() < 10 ? '0' + fecha.getMonth() : fecha.getMonth();
			const dia = fecha.getDay() < 10 ? '0' + fecha.getDay() : fecha.getDay();

			const horas = fecha.getHours() < 10 ? '0' + fecha.getHours() : fecha.getHours();
			const minutos = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes();
			const segundos = fecha.getSeconds() < 10 ? '0' + fecha.getSeconds() : fecha.getSeconds();

			fechaJugador.textContent = `${anio}/${mes}/${dia} ${horas}:${minutos}:${segundos}`;

			let nombreJugador = document.createElement('p');
			nombreJugador.textContent = arrayPuntuaciones[index].nombre;

			let puntuacionJugador = document.createElement('p');
			puntuacionJugador.textContent = arrayPuntuaciones[index].puntuacion;

			await liJugador.append(numeroJugador);
			await liJugador.append(nombreJugador);
			await liJugador.append(fechaJugador);
			await liJugador.append(puntuacionJugador);

			await fragment.append(liJugador);
		}
		await listaPuntuaciones.append(fragment);

		return true;
	} catch (err) {
		return false;
	}
}

function iniciar() {
	propGenerales.tablero.detenerScore = false;
	propGenerales.gameOver = false;
	propGenerales.tablero.score = 0;
	propGenerales.tablero.scoreAlmacenado = false;
	instanciarObjetos();

	let fps = 0;
	let contadorFps = 0;
	let dateStart = new Date();
	let dateEnd = new Date();

	let msInicial = new Date();
	let msFinal = new Date();

	animar();

	function calcularFrames() {
		msFinal = Date.now();

		if (msFinal - msInicial >= 500 / 60) {
			msInicial = Date.now();
			return true;
		}
		return false;
	}

	function actualizarFps() {
		dateEnd = new Date();

		if (dateEnd - dateStart >= 1000) {
			dateStart = new Date();
			fps = contadorFps;
			contadorFps = 0;
		} else {
			contadorFps += 1;
		}

		ctx.font = `700 40px 'VT323'`;
		ctx.fillStyle = 'white';
		ctx.fillText('Fps:' + fps, 10, 50);
	}

	function animar() {
		// if (calcularFrames()) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		

		if (fondo) {
			fondo.actualizarSprite();
		}

		if (nubesPequeñas) {
			for (const index in nubesPequeñas) {
				nubesPequeñas[index].actualizarSprite();
				nubesGrandes[index].actualizarSprite();
			}
		}

		// for (let index = 0; index <= (canvas.width / propGenerales.suelo.ancho) * propGenerales.suelo.escalaSprite; index++) {
		//   suelo.posicion.x = index * propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite;
		//   suelo.actualizarSprite();
		// }

		// console.log({suelo: canvas.height - propGenerales.suelo.alto });

		if (suelos) {
			suelos.forEach((suelo) => {
				suelo.actualizarSprite();
				// console.log({suelo: suelo.posicion.y});
			});
		}

		if (flores) {
			flores.forEach((flor) => {
				// console.log({flor: flor.posicion.y});
				flor.actualizarSprite();
			});
		}

		// suelo.actualizarSprite();
		if (cespeds) {
			cespeds.forEach((s) => {
				// console.log({pasto: s.posicion.y});
				s.actualizarSprite();
			});
		}

		if (cercas) {
			cercas.forEach((c) => c.actualizarSprite());
		}

		// cercas.forEach((cerca) => {
		// cerca.actualizarSprite()

		// console.log({cerca:cerca.posicion.y});
		// });

		if (propGenerales.gameStart) {
			if (tableroScore) {
				tableroScore.actualizarSprite();
			}
			// goomba.actualizarSprite();
			// koopa.actualizarSprite();

			if (enemigos) {
				enemigos.forEach((enemigo) => {
					enemigo.actualizarSprite();
				});
			}

			if (mario) {
				mario.actualizarSprite();
			}
		}

		actualizarFps();
		// }

		// botonPlay.actualizarSprite()

		// console.log(botonPlay);

		if (mario && enemigos) {
			if (detectarColision(mario, enemigos)) {
				finalizarJuego();
			}
		}

		if (!propGenerales.gameOver) {
			
			idAnimation = requestAnimationFrame(animar);
			
		}
	}

	async function finalizarJuego() {
		audioFondo.pause();
		audioGameOver.play();

		mario.muerto = true;
		mario.cambiarSprite('muerto');

		propGenerales.tablero.detenerScore = true;

		if (!propGenerales.tablero.scoreAlmacenado) {
			propGenerales.tablero.scoreAlmacenado = true;

			let puntajeGuardado = await guardarPuntuacion();

			if (puntajeGuardado) {
				await cargarPuntuaciones();
			}
		}
		// audioFondo.pause()
		setTimeout(() => {
			cancelAnimationFrame(idAnimation);

			propGenerales.gameOver = true;

			audioFondo.currentTime = 0;

			containerDatosJugador.classList.remove('desaparecer-container');
			containerDatosJugador.classList.add('aparecer-container');

			// document.querySelector('form').classList.add('aparecer-elementos');
			// document.querySelector('form').classList.remove('desaparecer-elementos');

			// containerPuntuaciones.style.display = 'flex';
			// containerPuntuaciones.classList.remove('desaparecer-elementos');
			// containerPuntuaciones.classList.add('aparecer-elementos');

			// cargarPuntuaciones().then((res) => {
			// 	if (res == true) {
			// 		containerPuntuaciones.style.display = 'flex';
			// 		containerPuntuaciones.classList.remove('desaparecer-elementos');
			// 		containerPuntuaciones.classList.add('aparecer-elementos');
			// 	}
			// });
			// containerPuntuaciones.style.display = 'flex';

			containerDatosJugador.addEventListener('animationend', (e) => {
				if (e.animationName === 'aparecer-container') {
					botonPuntuaciones.style.display = "none";
					
					containerPuntuaciones.classList.remove('desaparecer-elementos');
					containerPuntuaciones.style.display = 'flex';
					containerPuntuaciones.classList.add('aparecer-elementos');

					botonJugar.style.display = 'block';
					botonJugar.classList.add('aparecer-elementos');
					botonJugar.classList.remove('desaparecer-elementos');

					document.querySelector('form').elements['nombre-jugador'].value = '';
				}
			});
		}, 3000);
	}

	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			propGenerales.teclas.ArrowLeft.presionada = true;
			mario.ultimaTeclaPresionada = 'ArrowLeft';
		}
		if (e.key === 'ArrowRight') {
			propGenerales.teclas.ArrowRight.presionada = true;
			mario.ultimaTeclaPresionada = 'ArrowRight';
		}
		if (e.key === 'ArrowUp' || e.key === ' ') {
			propGenerales.teclas.ArrowUp.presionada = true;
			// mario.bloquearSalto = true
			mario.ultimaTeclaPresionada = 'ArrowUp';

			if (!mario.bloquearSalto && propGenerales.gameStart) {
				audioSalto.play();
			}
		}
	});

	document.addEventListener('keyup', (e) => {
		if (e.key === 'ArrowLeft') {
			propGenerales.teclas.ArrowLeft.presionada = false;
		}
		if (e.key === 'ArrowRight') {
			propGenerales.teclas.ArrowRight.presionada = false;
		}
		if (e.key === 'ArrowUp' || e.key === ' ') {
			propGenerales.teclas.ArrowUp.presionada = false;
			mario.bloquearSalto = false;
		}
	});

	function detectarColision(mario, enemigos) {
		let colisionDetectada = false;

		enemigos.forEach((enemigo) => {
			if (mario.rectanguloColision.x + mario.rectanguloColision.ancho >= enemigo.rectanguloColision.x && mario.rectanguloColision.x <= enemigo.rectanguloColision.x + enemigo.rectanguloColision.ancho) {
				if (enemigo.rectanguloColision.x > 0 && enemigo.rectanguloColision.x < canvas.width) {
					if (mario.rectanguloColision.y + mario.rectanguloColision.alto >= enemigo.rectanguloColision.y) {
						colisionDetectada = true;
					}
				}
			}
		});

		return colisionDetectada;
	}

	document.addEventListener('submit', (e) => {
		e.preventDefault();

		if (e.target.elements['nombre-jugador'].value.trim() != '') {
			propGenerales.tablero.nombreJugador = e.target.elements['nombre-jugador'].value;

			containerDatosJugador.classList.remove('aparecer-container');
			containerDatosJugador.classList.add('desaparecer-container');

			botonJugar.classList.remove('aparecer-elementos');
			botonJugar.classList.add('desaparecer-elementos');

			botonPuntuaciones.classList.remove('aparecer-elementos');
			botonPuntuaciones.classList.add('desaparecer-elementos');

			containerDatosJugador.addEventListener('animationend', (e) => {
				if (e.animationName === 'desaparecer-container') {
					// imagenComenzar.style.display = '';
					animarNumeros();
				}
			});

			e.target.classList.remove('aparecer-elementos');
			e.target.classList.add('desaparecer-elementos');
		} else {
			crearAlerta({});
		}
	});

	function animarNumeros() {
		imagenNumeros.style.display = '';

		imagenNumeros.style.setProperty('--i', 2);
		let i = parseInt(window.getComputedStyle(imagenNumeros).getPropertyValue('--i'));

		imagenNumeros.addEventListener('animationiteration', (e) => {
			if (e.animationName === 'crecer-texto') {
				i -= 1;
				imagenNumeros.style.setProperty('--i', i.toString());
			}
		});

		imagenNumeros.addEventListener('animationend', (e) => {
			if (e.animationName === 'crecer-texto') {
				imagenNumeros.style.display = 'none';
				imagenComenzar.style.display = '';
			}
		});

		imagenComenzar.addEventListener('animationend', (e) => {
			if (e.animationName == 'disminuir-texto') {
				imagenComenzar.style.display = 'none';
				if (audioFondo.paused) {
					audioFondo.play();
				}
				propGenerales.gameStart = true;
				if (propGenerales.gameOver) {
					iniciar();
				}
			}
		});

		// console.log({i})
	}

	async function guardarPuntuacion() {
		const datos = {
			nombre: propGenerales.tablero.nombreJugador,
			puntuacion: propGenerales.tablero.score,
			fecha: new Date(),
		};

		const res = await fetch(document.querySelector('form').action, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(datos),
			method: 'PUT',
		});

		json = await res.json();

		if (json.success) {
			return true;
		}
		return false;
	}

	function resize(e) {
		if (!esDispositivoMovil()) {
			proporcion = (1920 * 0.9) / window.innerWidth;
		} else {
			if (window.innerWidth > window.innerHeight) {
				proporcion = (657 * 1.6) / window.innerWidth;
			} else {
				proporcion = (657 * 1.7) / window.innerHeight;
			}
		}

	

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		actualizarPropGenerales();

		actualizarObjectos();
		// instanciarObjetos();

		// var gameWidth = window.innerWidth;
		// var gameHeight = window.innerHeight;
		// var scaleToFitX = gameWidth / 1920;
		// var scaleToFitY = gameHeight / 963;

		// var currentScreenRatio = gameWidth / gameHeight;
		// var optimalRatio = Math.min(scaleToFitX, scaleToFitY);

		// if (currentScreenRatio >= 1.77 && currentScreenRatio <= 1.79) {
		// 	canvas.style.width = gameWidth + "px";
		// 	canvas.style.height = gameHeight + "px";
		// }
		// else {
		// 	canvas.style.width = 1920 * optimalRatio + "px";
		// 	canvas.style.height = 963 * optimalRatio + "px";
		// }
	}

	function actualizarObjectos() {
		instanciarJugador();
		instanciarSuelo();
		instanciarCerca();
		instanciarCesped();
		instanciarFlores();
		instanciarNubes();
		instanciarTablero();
		instanciarEnemigo();

		// mario.escalaSprite = propGenerales.mario.escalaSprite
		// mario.posicion.x = mario.posicion.x * mario.escalaSprite
		// mario.posicion.y = mario.posicion.y * mario.escalaSprite

		// cespeds.forEach(cesped => {
		// 	cesped.escalaSprite = propGenerales.cesped.escalaSprite
		// 	cesped.posicion.x = cesped.posicion.x * propGenerales.cesped.escalaSprite
		// 	cesped.posicion.y = cesped.posicion.y * propGenerales.cesped.escalaSprite
		// })

		// suelos.forEach(suelo => {
		// 	suelo.escalaSprite = propGenerales.suelo.escalaSprite
		// 	suelo.posicion.x = suelo.posicion.x * propGenerales.suelo.escalaSprite
		// 	// suelo.posicion.y = suelo.posicion.y * propGenerales.suelo.escalaSprite
		// })

		// flores.forEach( flor => {
		// 	flor.escalaSprite = propGenerales.flor.escalaSprite
		// 	flor.posicion.x = flor.posicion.x * propGenerales.flor.escalaSprite
		// 	flor.posicion.y = flor.posicion.y * propGenerales.flor.escalaSprite
		// })

		// cercas.forEach( cerca => {
		// 	cerca.escalaSprite = propGenerales.cerca.escalaSprite
		// 	cerca.posicion.x = cerca.posicion.x * propGenerales.cerca.escalaSprite
		// 	cerca.posicion.y = cerca.posicion.y * propGenerales.cerca.escalaSprite
		// })

		// nubesGrandes.forEach( nube => {
		// 	nube.escalaSprite = propGenerales.nubeGrande.escalaSprite
		// 	nube.posicion.x = nube.posicion.x * propGenerales.nubeGrande.escalaSprite
		// 	nube.posicion.y = nube.posicion.y * propGenerales.nubeGrande.escalaSprite
		// })

		// nubesPequeñas.forEach( nube => {
		// 	nube.escalaSprite = propGenerales.nubePequeña.escalaSprite
		// 	nube.posicion.x = nube.posicion.x * propGenerales.nubePequeña.escalaSprite
		// 	nube.posicion.y = nube.posicion.y * propGenerales.nubePequeña.escalaSprite
		// })

		// enemigos.forEach( enemigo => {
		// 	if(enemigo.nombreEnemigo === 'goomba') {
		// 		enemigo.escalaSprite = propGenerales.goomba.escalaSprite
		// 		enemigo.posicion.x = enemigo.posicion.x * propGenerales.goomba.escalaSprite
		// 		enemigo.posicion.y = enemigo.posicion.y * propGenerales.goomba.escalaSprite
		// 	}
		// 	if(enemigo.nombreEnemigo === 'koopa') {
		// 		enemigo.escalaSprite = propGenerales.koopa.escalaSprite
		// 		enemigo.posicion.x = enemigo.posicion.x * propGenerales.koopa.escalaSprite
		// 		enemigo.posicion.y = enemigo.posicion.y * propGenerales.koopa.escalaSprite
		// 	}
		// })
	}

	function actualizarPropGenerales() {
		
		propGenerales.mario.escalaSprite = (canvas.width * 0.3) / (window.innerWidth * proporcion);

		propGenerales.cesped.escalaSprite = canvas.width / (window.innerWidth * proporcion);

		propGenerales.suelo.escalaSprite = canvas.width / (window.innerWidth * proporcion);

		propGenerales.flor.escalaSprite = (canvas.width * 0.22) / (window.innerWidth * proporcion);

		propGenerales.flor.florRoja.posicionX[0].x = (227 / 1920) * canvas.width;
		propGenerales.flor.florRoja.posicionX[1].x = (1708 / 1920) * canvas.width - ((canvas.width * 0.22) / (window.innerWidth * proporcion)) * 260;

		propGenerales.flor.florAmarilla.posicionX[0].x = (227 / 1920) * canvas.width + ((canvas.width * 0.22) / (window.innerWidth * proporcion)) * 260;
		propGenerales.flor.florAmarilla.posicionX[1].x = (1708 / 1920) * canvas.width - ((canvas.width * 0.22) / (window.innerWidth * proporcion)) * 260 * 2;

		propGenerales.cerca.posicionX[0].x = ((227 - (48 * canvas.width) / (window.innerWidth * proporcion)) / 1920) * canvas.width;

		propGenerales.cerca.posicionX[1].x = ((227 - (48 * canvas.width) / (window.innerWidth * proporcion)) / 1920) * canvas.width + (48 * canvas.width) / (window.innerWidth * proporcion);

		propGenerales.cerca.posicionX[2].x = ((227 - (48 * canvas.width) / (window.innerWidth * proporcion)) / 1920) * canvas.width + ((48 * canvas.width) / (window.innerWidth * proporcion)) * 2;

		propGenerales.cerca.posicionX[3].x = ((227 - (48 * canvas.width) / (window.innerWidth * proporcion)) / 1920) * canvas.width + ((48 * canvas.width) / (window.innerWidth * proporcion)) * 3;

		(propGenerales.cerca.posicionX[4].x = (1690 / 1920) * canvas.width),
			(propGenerales.cerca.posicionX[5].x = (1690 / 1920) * canvas.width - (48 * canvas.width) / (window.innerWidth * proporcion)),
			(propGenerales.cerca.posicionX[6].x = (1690 / 1920) * canvas.width - ((48 * canvas.width) / (window.innerWidth * proporcion)) * 2);

		propGenerales.cerca.posicionX[7].x = (1690 / 1920) * canvas.width - ((48 * canvas.width) / (window.innerWidth * proporcion)) * 3;

		propGenerales.cesped.posicionX[0].x = 0;
		propGenerales.cesped.posicionX[1].x = (500 / 1920) * canvas.width;
		propGenerales.cesped.posicionX[2].x = (892 / 1920) * canvas.width;
		propGenerales.cesped.posicionX[3].x = canvas.width - canvas.width * 0.176;

		nubesGrandes.forEach((nube) => {
			nube.posicion.y = Math.floor(Math.random() * canvas.height * 0.2);
		});

		nubesPequeñas.forEach((nube) => {
			nube.posicion.y = Math.floor(Math.random() * canvas.height * 0.2);
		});

		propGenerales.cerca.escalaSprite = canvas.width / (window.innerWidth * proporcion);

		propGenerales.nubeGrande.escalaSprite = canvas.width / (window.innerWidth * proporcion);
		propGenerales.nubePequeña.escalaSprite = canvas.width / (window.innerWidth * proporcion);

		// propGenerales.botonPlay.escalaSprite = canvas.width / (window.innerWidth * proporcion);

		propGenerales.tablero.escalaSprite = (canvas.width * 0.6) / (window.innerWidth * proporcion);

		propGenerales.goomba.escalaSprite = (canvas.width * 0.7) / (window.innerWidth * proporcion);

		propGenerales.koopa.escalaSprite = (canvas.width * 0.7) / (window.innerWidth * proporcion);
	}

	window.addEventListener('resize', resize);

	if (esDispositivoMovil()) {
		let posXInicial;
		let posYInicial;
		let posXFinal;
		let posYFinal;
		let moviendo = false;

		let btn = document.createElement('div');
		btn.classList.add('boton-saltar');
		btn.textContent = 'saltar';
		containerCanvas.appendChild(btn);

		btn.addEventListener('pointerdown', () => {
			propGenerales.teclas.ArrowUp.presionada = true;
			mario.ultimaTeclaPresionada = 'ArrowUp';

			if (!mario.bloquearSalto && !mario.muerto) {
				audioSalto.play();
			}
			setTimeout(() => {
				propGenerales.teclas.ArrowUp.presionada = false;
				mario.bloquearSalto = false;
			}, 100);
		});

		document.addEventListener('orientationchange', resize);

		let pointerId = 0;

		canvas.addEventListener('pointerdown', (e) => {
			posXInicial = e.clientX;
			posYInicial = e.clientY;

			// alert(e.pointerId)
			console.log({ pointerid: e.pointerId });
			if (e.target !== btn) {
				pointerId = e.pointerId;
				if (e.clientX <= canvas.width * 0.15) {
					console.log('izquierda');

					propGenerales.teclas.ArrowLeft.presionada = true;
					mario.ultimaTeclaPresionada = 'ArrowLeft';
				} else if (e.clientX >= canvas.width * 0.85) {
					console.log('derecha');
					propGenerales.teclas.ArrowRight.presionada = true;
					mario.ultimaTeclaPresionada = 'ArrowRight';
				}
			}
		});

		canvas.addEventListener('pointermove', (e) => {
			// if (e.clientX <= canvas.width * 0.15) {
			// 	propGenerales.teclas.ArrowLeft.presionada = false;
			// } else if (e.clientX >= canvas.width * 0.85) {
			// 	propGenerales.teclas.ArrowRight.presionada = false;
			// }
			canvas.addEventListener('pointerleave', pointerLeave);
			// e.preventDefault()
		});

		canvas.addEventListener('pointerup', (e) => {
			if (e.clientX <= canvas.width * 0.15) {
				propGenerales.teclas.ArrowLeft.presionada = false;
			} else if (e.clientX >= canvas.width * 0.85) {
				propGenerales.teclas.ArrowRight.presionada = false;
			}
		});

		let pointerLeave = (e) => {
			propGenerales.teclas.ArrowLeft.presionada = false;
			propGenerales.teclas.ArrowRight.presionada = false;
			canvas.removeEventListener('pointerleave', pointerLeave);
		};
	}
}
