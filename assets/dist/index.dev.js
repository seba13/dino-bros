"use strict";

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
var canvas = document.querySelector('canvas');
var ctx;
var propGenerales;
var mario, fondo, flores, cespeds, cercas, suelos, nubesPequeñas, nubesGrandes;

function instanciarObjetos() {
  fondo = new Sprite({
    posicion: {
      x: 0,
      y: 0
    },
    velocidad: {
      x: 0,
      y: 0
    },
    rutaImagen: './assets/img/fondo.png',
    contadorLimiteCuadros: 1,
    maximosCuadros: 1,
    escalaSprite: propGenerales.fondo.escalaSprite,
    gravedad: 0
  });
  mario = new Sprite({
    posicion: {
      x: canvas.width / 2.5,
      y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.mario.alto * propGenerales.mario.escalaSprite // y: 0,

    },
    velocidad: {
      x: 0,
      y: 0
    },
    rutaImagen: './assets/img/sprites-mario-inactivo-derecha-2.png',
    contadorLimiteCuadros: 5,
    maximosCuadros: 12,
    escalaSprite: propGenerales.mario.escalaSprite,
    gravedad: 1,
    offset: {
      x: 0,
      y: 15
    },
    sprites: {
      inactivoIzquierda: {
        rutaImagen: './assets/img/sprites-mario-inactivo-izquierda-2.png',
        maximosCuadros: '12'
      },
      inactivoDerecha: {
        rutaImagen: './assets/img/sprites-mario-inactivo-derecha-2.png',
        maximosCuadros: '12'
      },
      caminandoIzquierda: {
        rutaImagen: './assets/img/sprites-mario-caminando-izquierda.png',
        maximosCuadros: '5'
      },
      caminandoDerecha: {
        rutaImagen: './assets/img/sprites-mario-caminando-derecha.png',
        maximosCuadros: '5'
      },
      saltandoDerecha: {
        rutaImagen: './assets/img/sprites-mario-saltando-derecha.png',
        maximosCuadros: '1'
      },
      saltandoIzquierda: {
        rutaImagen: './assets/img/sprites-mario-saltando-izquierda.png',
        maximosCuadros: '1'
      }
    }
  });
  nubesPequeñas = [];
  nubesGrandes = [];

  for (var index = 0; index <= propGenerales.cantidadNubes; index++) {
    nubesPequeñas.push(new Animable({
      posicion: {
        x: canvas.width - propGenerales.nubePequeña.ancho + Math.floor(Math.random() * 100 * index) + Math.floor(Math.random() * 1200 + 100),
        y: Math.floor(Math.random() * canvas.height * 0.2)
      },
      velocidad: {
        x: 0,
        y: 0
      },
      rutaImagen: './assets/img/nube-2.png',
      contadorLimiteCuadros: 0,
      maximosCuadros: 1,
      escalaSprite: propGenerales.nubePequeña.escalaSprite,
      gravedad: 0
    }));
    nubesGrandes.push(new Animable({
      posicion: {
        x: canvas.width - propGenerales.nubePequeña.ancho + Math.floor(Math.random() * 601 * index) + Math.floor(Math.random() * 1200 + 100),
        y: Math.floor(Math.random() * canvas.height * 0.2)
      },
      velocidad: {
        x: 0,
        y: 0
      },
      rutaImagen: './assets/img/nube-1.png',
      contadorLimiteCuadros: 0,
      maximosCuadros: 1,
      escalaSprite: propGenerales.nubeGrande.escalaSprite,
      gravedad: 1
    }));
  }

  cespeds = [];
  propGenerales.cesped.posicionX.forEach(function (cesped) {
    cespeds.push(new Sprite({
      posicion: {
        x: cesped.x,
        y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.cesped.alto * propGenerales.cesped.escalaSprite
      },
      velocidad: {
        x: 0,
        y: 0
      },
      rutaImagen: './assets/img/cesped.png',
      contadorLimiteCuadros: 1,
      maximosCuadros: 1,
      escalaSprite: 1,
      gravedad: 1
    }));
  });
  suelos = [];

  for (var _index = 0; _index <= canvas.width / (propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite); _index++) {
    suelos.push(new Sprite({
      posicion: {
        x: _index * propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite,
        y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite
      },
      velocidad: {
        x: 0,
        y: 0
      },
      rutaImagen: './assets/img/suelo-1.png',
      contadorLimiteCuadros: 1,
      maximosCuadros: 1,
      escalaSprite: propGenerales.suelo.escalaSprite,
      gravedad: 1
    }));
    suelos.push(new Sprite({
      posicion: {
        x: _index * propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite,
        y: canvas.height - propGenerales.suelo.alto / 2 * propGenerales.suelo.escalaSprite
      },
      velocidad: {
        x: 0,
        y: 0
      },
      rutaImagen: './assets/img/suelo-2.png',
      contadorLimiteCuadros: 1,
      maximosCuadros: 1,
      escalaSprite: propGenerales.suelo.escalaSprite,
      gravedad: 1
    }));
  }

  cercas = []; // recorrer array de posiciones (coordenada x) de cada cerca

  propGenerales.cerca.posicionX.forEach(function (cerca) {
    for (var _index2 = 0; _index2 < cerca.cantidad; _index2++) {
      cercas.push(new Sprite({
        posicion: {
          x: cerca.x + propGenerales.cerca.ancho * propGenerales.cerca.escalaSprite * _index2,
          y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.cerca.alto * propGenerales.cerca.escalaSprite
        },
        velocidad: {
          x: 0,
          y: 0
        },
        rutaImagen: './assets/img/madera.png',
        contadorLimiteCuadros: 1,
        maximosCuadros: 1,
        escalaSprite: propGenerales.cerca.escalaSprite,
        gravedad: 1
      }));
    }
  });
  console.log({
    florY: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.flor.alto * propGenerales.flor.escalaSprite
  });
  flores = [];
  propGenerales.flor.florRoja.posicionX.forEach(function (flor) {
    // flor.x
    flores.push(new Sprite({
      posicion: {
        x: flor.x,
        y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.flor.alto * propGenerales.flor.escalaSprite
      },
      velocidad: {
        x: 0,
        y: 0
      },
      rutaImagen: './assets/img/flor-1.png',
      contadorLimiteCuadros: 1,
      maximosCuadros: 1,
      escalaSprite: propGenerales.flor.escalaSprite,
      gravedad: 1
    }));
  });
  propGenerales.flor.florAmarilla.posicionX.forEach(function (flor) {
    // flor.x
    flores.push(new Sprite({
      posicion: {
        x: flor.x,
        y: canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - propGenerales.flor.alto * propGenerales.flor.escalaSprite
      },
      velocidad: {
        x: 0,
        y: 0
      },
      rutaImagen: './assets/img/flor-2.png',
      contadorLimiteCuadros: 1,
      maximosCuadros: 1,
      escalaSprite: propGenerales.flor.escalaSprite,
      gravedad: 1
    }));
  });
}

window.addEventListener("load", function (e) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  propGenerales = {
    mario: {
      escalaSprite: canvas.width * .3 / 1920,
      ancho: 3960,
      alto: 514
    },
    fondo: {
      ancho: 1008,
      alto: 480,
      escalaSprite: canvas.width / 1008
    },
    suelo: {
      alto: 118,
      ancho: 185,
      escalaSprite: canvas.width / 1920
    },
    cantidadNubes: 9,
    nubePequeña: {
      ancho: 79,
      escalaSprite: canvas.width / 1920
    },
    nubeGrande: {
      ancho: 151,
      escalaSprite: canvas.width / 1920
    },
    cesped: {
      ancho: 120,
      alto: 24,
      escalaSprite: canvas.width / 1920,
      y: window.innerHeight - 144,
      posicionX: [{
        x: 0
      }, {
        x: 500
      }, {
        x: 892
      }, {
        x: canvas.width - 166 - 120
      }]
    },
    flor: {
      ancho: 260,
      alto: 468,
      escalaSprite: canvas.width * .22 / 1920,
      florRoja: {
        posicionX: [{
          x: 227
        }, {
          x: canvas.width - 260 * 0.22 - 166
        }]
      },
      florAmarilla: {
        posicionX: [{
          x: 227 + 260 * 0.22
        }, {
          x: canvas.width - 260 * 0.22 - 166 - 260 * 0.22
        }]
      }
    },
    cerca: {
      ancho: 48,
      alto: 51,
      escalaSprite: canvas.width / 1920,
      posicionX: [{
        x: 220,
        cantidad: 4
      }, {
        x: canvas.width - 290,
        cantidad: 4
      }]
    },
    gravedad: .8,
    teclas: {
      ArrowLeft: {
        presionada: false
      },
      ArrowRight: {
        presionada: false
      },
      ArrowUp: {
        presionada: false
      }
    }
  };
  console.log(propGenerales);
  iniciar();
});

function iniciar() {
  instanciarObjetos();
  animar();

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // fondo.actualizarSprite();

    for (var index in nubesPequeñas) {
      nubesPequeñas[index].actualizarSprite();
      nubesGrandes[index].actualizarSprite();
    } // for (let index = 0; index <= (canvas.width / propGenerales.suelo.ancho) * propGenerales.suelo.escalaSprite; index++) {
    //   suelo.posicion.x = index * propGenerales.suelo.ancho * propGenerales.suelo.escalaSprite;
    //   suelo.actualizarSprite();
    // }
    // console.log({suelo: canvas.height - propGenerales.suelo.alto });


    suelos.forEach(function (suelo) {
      suelo.actualizarSprite(); // console.log({suelo: suelo.posicion.y});
    }); // suelo.actualizarSprite();

    cespeds.forEach(function (s) {
      // console.log({pasto: s.posicion.y});
      s.actualizarSprite();
    });
    flores.forEach(function (flor) {
      // console.log({flor: flor.posicion.y});
      flor.actualizarSprite();
    });
    cercas.forEach(function (cerca) {
      cerca.actualizarSprite(); // console.log({cerca:cerca.posicion.y});
    });
    mario.actualizarSprite();
    requestAnimationFrame(animar);
  }

  document.addEventListener('keydown', function (e) {
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
  document.addEventListener('keyup', function (e) {
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
}