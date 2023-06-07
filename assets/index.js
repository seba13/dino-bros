// TEMAS POR VER:

// resize de navegador
// ajuste de fondo a distintas resoluciones

// IMPLEMENTAR CLASES
// FÍSICAS DE SALTO
// VELOCIDAD CONSTANTE DEL PERSONAJE
// APARICIÓN DE ENEMIGOS
// PINTAR ELEMENTOS PAISAJE
// LÓGICA DE PUNTAJE
// MÚSICA
// COLISIONES CON ENEMIGOS
// REINICIAR JUEGO

const canvas = document.querySelector('canvas');

let ctx ;



let propGenerales


let mario, fondo, flores, cespeds, cercas, suelos, nubesPequeñas, nubesGrandes;




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
            y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.mario.alto * propGenerales.mario.escalaSprite ,
            // y: 0,
        },
        velocidad: {
            x: 0,
            y: 0,
        },
        rutaImagen: './assets/img/sprites-mario-inactivo-derecha-2.png',
        contadorLimiteCuadros: 5,
        maximosCuadros: 12,
        escalaSprite: propGenerales.mario.escalaSprite,
        gravedad: 1,
        offset : {
            x: 0,
            y: 10,
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
                rutaImagen: './assets/img/sprites-mario-saltando-derecha.png',
                maximosCuadros: '1',
            },
            saltandoIzquierda: {
                rutaImagen: './assets/img/sprites-mario-saltando-izquierda.png',
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
                    y: Math.floor(Math.random() * canvas.height*0.2),
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
                    y: Math.floor(Math.random() * canvas.height*0.2),
                },
                velocidad: {
                    x: 0,
                    y: 0,
                },
                rutaImagen: './assets/img/nube-1.png',
                contadorLimiteCuadros: 0,
                maximosCuadros: 1,
                escalaSprite: propGenerales.nubeGrande.escalaSprite,
                gravedad: 1,
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
                escalaSprite: 1,
                gravedad: 1,
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
                gravedad: 1,
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
                gravedad: 1,
            }),
        );
    }
    
    cercas = [];
    
    // recorrer array de posiciones (coordenada x) de cada cerca
    propGenerales.cerca.posicionX.forEach((cerca) => {
		
        for (let index = 0; index < cerca.cantidad; index++) {
            cercas.push(
                new Sprite({
                    posicion: {
                        x: cerca.x + propGenerales.cerca.ancho * propGenerales.cerca.escalaSprite * index,
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
                    gravedad: 1,
                }),
            );
        }
    });
    
    console.log({florY: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.flor.alto * propGenerales.flor.escalaSprite});

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
                gravedad: 1,
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
                gravedad: 1,
            }),
        );
    });
}



function esDispositivoMovil() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
let proporcion = 1920 * .9 / window.innerWidth 

window.addEventListener("load", (e) => {


    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

	if(esDispositivoMovil()) {

		proporcion = 1.8
		document.addEventListener("pointerdown", (e) => {

		
			if (canvas.requestFullscreen) {
				canvas.requestFullscreen();
			  }

		})
	}


	aspectRatio = canvas.width / canvas.height;
	console.log({aspectRatio});
    ctx = canvas.getContext('2d');


    propGenerales = {
        mario: {
            escalaSprite: canvas.width * .3 / ( window.innerWidth * proporcion ),
            ancho: 3960,
            alto: 514,
        },
		// 1008 => 100
		// 1920 => x
        fondo: {
            ancho: 1008,
            alto: 480,
            escalaSprite: canvas.width *  ( window.innerWidth * proporcion ),
        },
        suelo: {
            alto: 118,
            ancho: 185,
            escalaSprite: canvas.width  / ( window.innerWidth * proporcion ),
        },
        cantidadNubes: 9,
        nubePequeña: {
            ancho: 79,
            escalaSprite: canvas.width  / ( window.innerWidth * proporcion ),
        },
        nubeGrande: {
            ancho: 151,
            escalaSprite: canvas.width  / ( window.innerWidth * proporcion ),
        },
        cesped: {
            ancho: 120,
            alto: 24,
            escalaSprite: canvas.width  / ( window.innerWidth * proporcion ),
            y: window.innerHeight - 144 * (canvas.width  / ( window.innerWidth * proporcion )),
            posicionX: [
                {
                    x: 0,
                },
                {
                    x: 500,
                },
                {
                    x: 892,
                },
                {
                    x: canvas.width - 166 - 120,
                },
            ],
        },
        flor: {
            ancho: 260,
            alto: 468,
            escalaSprite: canvas.width * .22  / ( window.innerWidth * proporcion ),
            florRoja: {
                posicionX: [
                    {
                        x: (227 / 1920) * canvas.width,
                    },
                    {
                        x: ((1708 / 1920) * canvas.width) - (canvas.width * .22  / ( window.innerWidth * proporcion )) * 260 ,
                    },
                ],
            },
            florAmarilla: {
                posicionX: [
                    {
                        x: ((227 / 1920) * canvas.width) + (canvas.width * .22  / ( window.innerWidth * proporcion )) * 260,
                    },
                    {
                        x: ((1708	 / 1920) * canvas.width) - (canvas.width * .22  / ( window.innerWidth * proporcion )) * 260 * 2,
                    },
                ],
            },
        },
        cerca: {
            ancho: 48,
            alto: 51,
            escalaSprite: canvas.width  / ( window.innerWidth * proporcion ),
            posicionX: [
                {
                    x: (180 / 1920) * canvas.width,
                    cantidad: 4,
                },
                {
                    x: (1530 / 1920 ) * canvas.width,
                    cantidad: 4,
                },
            ],
        },
        gravedad: .8,
        teclas: {
            ArrowLeft: {
                presionada: false,
            },
            ArrowRight: {
                presionada: false,
            },
            ArrowUp: {
                presionada: false,
            },
        },
    };
    console.log(propGenerales);
    iniciar();
})

function iniciar() {

    instanciarObjetos()

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
            suelo.actualizarSprite()
            // console.log({suelo: suelo.posicion.y});
        });

		// suelo.actualizarSprite();
		cespeds.forEach((s) => {
            // console.log({pasto: s.posicion.y});
            s.actualizarSprite()
        });
        


		flores.forEach((flor) => {
            // console.log({flor: flor.posicion.y});
            flor.actualizarSprite()
        });
		cercas.forEach((cerca) => {
            cerca.actualizarSprite()
            // console.log({cerca:cerca.posicion.y});
        });
		mario.actualizarSprite();

		requestAnimationFrame(animar);
	}

	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowLeft') {
			propGenerales.teclas.ArrowLeft.presionada = true;
			mario.ultimaTeclaPresiona = 'ArrowLeft';
		}
		if (e.key === 'ArrowRight') {
			propGenerales.teclas.ArrowRight.presionada = true;
			mario.ultimaTeclaPresiona = 'ArrowRight';
		}
		if (e.key === 'ArrowUp') {
			propGenerales.teclas.ArrowUp.presionada = true;
			mario.ultimaTeclaPresiona = 'ArrowUp';
		}
	});

	document.addEventListener('keyup', (e) => {
		if (e.key === 'ArrowLeft') {
			propGenerales.teclas.ArrowLeft.presionada = false;
		}
		if (e.key === 'ArrowRight') {
			propGenerales.teclas.ArrowRight.presionada = false;
		}
		if (e.key === 'ArrowUp') {
			propGenerales.teclas.ArrowUp.presionada = false;
		}
	});


	function resize(e) {
	
		// 1920/973 => 1.1
		// width/height => x
		if(screen.orientation.angle % 90 === 0) {

			canvas.width = window.innerHeight
			canvas.height = window.innerWidth
		}else {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		instanciarObjetos()
	}

	

	
	window.addEventListener('resize', () => {

		if(!esDispositivoMovil()) {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight

			proporcion = 1920 * .9 / window.innerWidth 

			propGenerales.mario.escalaSprite = canvas.width * .3 / ( window.innerWidth * proporcion )

			propGenerales.cesped.escalaSprite = canvas.width  / ( window.innerWidth * proporcion )

			propGenerales.suelo.escalaSprite = canvas.width  / ( window.innerWidth * proporcion )

			propGenerales.flor.escalaSprite = canvas.width * .22 / ( window.innerWidth * proporcion )


			propGenerales.flor.florRoja.posicionX[0].x = (227 / 1920) * canvas.width
			propGenerales.flor.florRoja.posicionX[1].x = ((1708 / 1920) * canvas.width) - (canvas.width * .22  / ( window.innerWidth * proporcion )) * 260

			propGenerales.flor.florAmarilla.posicionX[0].x = ((227 / 1920) * canvas.width) + (canvas.width * .22  / ( window.innerWidth * proporcion )) * 260
			propGenerales.flor.florAmarilla.posicionX[1].x = ((1708 / 1920) * canvas.width) - (canvas.width * .22  / ( window.innerWidth * proporcion )) * 260 * 2

			propGenerales.cerca.escalaSprite = canvas.width / ( window.innerWidth * proporcion )

			propGenerales.nubeGrande.escalaSprite = canvas.width  / ( window.innerWidth * proporcion )
			propGenerales.nubePequeña.escalaSprite = canvas.width  / ( window.innerWidth * proporcion )


			instanciarObjetos()
		}
	})


	window.addEventListener("orientationchange", resize)

	// document.addEventListener('touchstart', (e)=> {
	// 	e.preventDefault()
	// })

	// document.addEventListener('click', (e) => {
	// 	e.preventDefault()
	// })
	
	// document.addEventListener('pointerdown', (e) => {
	
	// 	e.preventDefault()

	// 	console.log(e);


	// })

	// document.addEventListener('touchend', (e) => {
	// 	e.preventDefault();
	// })
	// document.addEventListener('touchmove', (e) => {
	// 	e.preventDefault();
	// })

	// document.addEventListener('pointermove', (e) => {
	// 	e.preventDefault();
	// })

	// document.addEventListener('pointerup', (e) => {
	// 	e.preventDefault()
	// })

	
	
	
}

