function esDispositivoMovil() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function instanciarObjetos() {
	fondo = new Sprite({
		posicion: {
			x: 0,
			y: 0,
		},
		velocidad: {
			x: 0,
			y: 0,
		},
		rutaImagen: './assets/img/fondo.png',
		contadorLimiteCuadros: 1,
		maximosCuadros: 1,
		escalaSprite: propGenerales.fondo.escalaSprite,
		gravedad: 0,
	});

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
			y: 15,
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
		},
	});

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

	console.log({ florY: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.flor.alto * propGenerales.flor.escalaSprite });

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

	goomba = new Sprite({
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
			y: 10,
		},
	
	});	
}



function iniciar() {
	instanciarObjetos();

	animar();

	function animar() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// fondo.actualizarSprite();
		for (const index in nubesPequeñas) {
			nubesPequeñas[index].actualizarSprite();
			nubesGrandes[index].actualizarSprite();
		}

		// for (let index = 0; index <= (canvas.width / propGenerales.suelo.ancho) * propGenerales.suelo.escalaSprite; index++) {
		//   suelo.posicion.x = index * propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite;
		//   suelo.actualizarSprite();
		// }

		// console.log({suelo: canvas.height - propGenerales.suelo.alto });

		suelos.forEach((suelo) => {
			suelo.actualizarSprite();
			// console.log({suelo: suelo.posicion.y});
		});

		flores.forEach((flor) => {
			// console.log({flor: flor.posicion.y});
			flor.actualizarSprite();
		});

		// suelo.actualizarSprite();
		cespeds.forEach((s) => {
			// console.log({pasto: s.posicion.y});
			s.actualizarSprite();
		});

		cercas.forEach((c) => c.actualizarSprite());

		// cercas.forEach((cerca) => {
		// cerca.actualizarSprite()

		// console.log({cerca:cerca.posicion.y});
		// });

		goomba.actualizarSprite();

		mario.actualizarSprite();


		detectarColision(mario, goomba)

		requestAnimationFrame(animar);

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



	function detectarColision(mario, enemigo) {
		// if(mario.posicion.x + ( (mario.imagen.width / mario.maximosCuadros) - mario.offset.x) * mario.escalaSprite  >= goomba.posicion.x && mario.posicion.x + mario.offset.x <= enemigo.posicion.x + (enemigo.imagen.width / enemigo.maximosCuadros) * enemigo.escalaSprite) {
			
		// 	if(mario.posicion.y +  (mario.imagen.height) * mario.escalaSprite - mario.offset.y >= enemigo.posicion.y) {

		// 		alert("colision")
		// 	}
			
		// }

		if( (mario.rectanguloColision.x + mario.rectanguloColision.ancho >= enemigo.rectanguloColision.x) && mario.rectanguloColision.x <= enemigo.rectanguloColision.x + enemigo.rectanguloColision.ancho){

			if(enemigo.rectanguloColision.x > 0 && enemigo.rectanguloColision.x < canvas.width){
				if(mario.rectanguloColision.y + mario.rectanguloColision.alto >= enemigo.rectanguloColision.y) {

					alert('colision')
				}
			}
			

		}


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

		definirPropGenerales();

		instanciarObjetos();
	}

	function definirPropGenerales() {
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

		propGenerales.goomba.escalaSprite =  (canvas.width) * .7 / (window.innerWidth * proporcion)

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
