// TEMAS POR VER:

// resize de navegador ✅
// ajuste de fondo a distintas resoluciones ✅

// IMPLEMENTAR CLASES ✅
// FÍSICAS DE SALTO ✅
// ---> MEJORAR ACCIONES DE SALTO CON DIRECCION (SALTAR IZQUIERDA / SALTAR DERECHA) ⭕

// VELOCIDAD CONSTANTE DEL PERSONAJE ✅
// ---> AJUSTAR VELOCIDAD PERSONAJE EN DISPOSITIVOS MOBILES ⭕
// APARICIÓN DE ENEMIGOS ⭕
// PINTAR ELEMENTOS PAISAJE ✅

// MENÚ ⭕
// MÚSICA ⭕
// LÓGICA DE PUNTAJE ⭕
// MÚSICA ⭕
// COLISIONES CON ENEMIGOS ⭕
// INICIO / TERMINO / REINICIO DE JUEGO ⭕

const canvas = document.querySelector('canvas');
const containerCanvas = document.querySelector('.container');
let proporcion = (1920 * 0.9) / window.innerWidth;
let ctx;

let propGenerales;

let mario, fondo, flores, cespeds, cercas, suelos, nubesPequeñas, nubesGrandes;


window.addEventListener('load', (e) => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	if (esDispositivoMovil()) {
		if (window.innerWidth > window.innerHeight) {
			proporcion = (657 * 1.6) / window.innerWidth;
		} else {
			proporcion = (657 * 1.7) / window.innerHeight;
		}

		document.addEventListener('pointerdown', (e) => {
			if (containerCanvas.requestFullscreen && !document.fullscreenElement) {
				containerCanvas.requestFullscreen();
				setTimeout(() => {
					window.scrollTo(0, document.body.scrollHeight);
				}, 1);
			}
		});
	}


	ctx = canvas.getContext('2d');

	propGenerales = {
		mario: {
			escalaSprite: (canvas.width * 0.3) / (window.innerWidth * proporcion),
			ancho: 3960,
			alto: 514,
		},
		// 1008 => 100
		// 1920 => x
		fondo: {
			ancho: 1008,
			alto: 480,
			escalaSprite: canvas.width * (window.innerWidth * proporcion),
		},
		suelo: {
			alto: 118,
			ancho: 185,
			escalaSprite: canvas.width / (window.innerWidth * proporcion),
		},
		cantidadNubes: 9,
		nubePequeña: {
			ancho: 79,
			escalaSprite: canvas.width / (window.innerWidth * proporcion),
		},
		nubeGrande: {
			ancho: 151,
			escalaSprite: canvas.width / (window.innerWidth * proporcion),
		},
		cesped: {
			ancho: 120,
			alto: 24,
			escalaSprite: canvas.width / (window.innerWidth * proporcion),
			y: window.innerHeight - 144 * (canvas.width / (window.innerWidth * proporcion)),
			posicionX: [
				{
					x: 0,
				},
				{
					x: (500 / 1920) * canvas.width,
				},
				{
					x: (892 / 1920) * canvas.width,
				},
				{
					x: canvas.width - canvas.width * 0.176,
				},
			],
		},
		flor: {
			ancho: 260,
			alto: 468,
			escalaSprite: (canvas.width * 0.22) / (window.innerWidth * proporcion),
			florRoja: {
				posicionX: [
					{
						x: (227 / 1920) * canvas.width,
					},
					{
						x: (1708 / 1920) * canvas.width - ((canvas.width * 0.22) / (window.innerWidth * proporcion)) * 260,
					},
				],
			},
			florAmarilla: {
				posicionX: [
					{
						x: (227 / 1920) * canvas.width + ((canvas.width * 0.22) / (window.innerWidth * proporcion)) * 260,
					},
					{
						x: (1708 / 1920) * canvas.width - ((canvas.width * 0.22) / (window.innerWidth * proporcion)) * 260 * 2,
					},
				],
			},
		},
		cerca: {
			ancho: 48,
			alto: 51,
			escalaSprite: canvas.width / (window.innerWidth * proporcion),
			posicionX: [
				{
					x: ((227 - (48 * canvas.width) / (window.innerWidth * proporcion)) / 1920) * canvas.width,
				},
				{
					x: ((227 - (48 * canvas.width) / (window.innerWidth * proporcion)) / 1920) * canvas.width + (48 * canvas.width) / (window.innerWidth * proporcion),
				},
				{
					x: ((227 - (48 * canvas.width) / (window.innerWidth * proporcion)) / 1920) * canvas.width + ((48 * canvas.width) / (window.innerWidth * proporcion)) * 2,
				},
				{
					x: ((227 - (48 * canvas.width) / (window.innerWidth * proporcion)) / 1920) * canvas.width + ((48 * canvas.width) / (window.innerWidth * proporcion)) * 3,
				},
				{
					x: (1690 / 1920) * canvas.width,
				},
				{
					x: (1690 / 1920) * canvas.width - (48 * canvas.width) / (window.innerWidth * proporcion),
				},
				{
					x: (1690 / 1920) * canvas.width - ((48 * canvas.width) / (window.innerWidth * proporcion)) * 2,
				},
				{
					x: (1690 / 1920) * canvas.width - ((48 * canvas.width) / (window.innerWidth * proporcion)) * 3,
				},
			],
		},
		gravedad: 0.5,
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
	
	iniciar();
});