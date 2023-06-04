// TEMAS POR VER:

// IMPLEMENTAR CLASES
// FÍSICAS DE SALTO
// VELOCIDAD CONSTANTE DEL PERSONAJE
// APARICIÓN DE ENEMIGOS
// PINTAR ELEMENTOS PAISAJE
// LÓGICA DE PUNTAJE
// MÚSICA
// COLISIONES CON ENEMIGOS
// REINICIAR JUEGO


const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight ;
const ctx = canvas.getContext("2d");


const spriteMario = document.createElement("img");
const spriteMarioIzq = document.createElement("img");
const spriteSuelo = document.createElement("img");

const imagenFondo = document.createElement("img");
const imagenCesped = document.createElement("img");
const imagenFlorRoja = document.createElement("img");
const imagenFlorAmarilla = document.createElement("img");
const imagenCerca = document.createElement("img");
const imagenNubePequeña = document.createElement("img");
const imagenNubeGrande = document.createElement("img");

const sprites = [spriteMario, spriteMarioIzq, spriteSuelo, imagenFondo, imagenFlorRoja, imagenFlorAmarilla, imagenCesped, imagenCerca,imagenNubePequeña, imagenNubeGrande]

spriteMario.src = "./assets/sprites-mario.png";
spriteMarioIzq.src = "./assets/sprites-mario-izquierda.png";
imagenFondo.src = "./assets/fondo.png";
spriteSuelo.src = "./assets/suelo2.png";
imagenCesped.src = "./assets/cesped.png";
imagenCerca.src = "./assets/madera.png";
imagenFlorRoja.src = "./assets/flor-1.png";
imagenFlorAmarilla.src = "./assets/flor-2.png"
imagenNubeGrande.src = "./assets/nube-1.png";
imagenNubePequeña.src = "./assets/nube-2.png";



const promesas = sprites.map( (sprite) => {
    return new Promise( (res, rej) => {
        sprite.addEventListener('load', () => {
            return res(sprite)
        })
    })
})

Promise.all(promesas)
    .then(sprite => {
        iniciar()
    })


function iniciar() {

    let marioMoviendose = false
    let marioDerecha = false
    let marioIzquierda = false

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth ;
        canvas.height = window.innerHeight ;


        mario.y = window.innerHeight - 280;
        suelo.y = window.innerHeight - 125;
        fondo.altoZoom =  window.innerHeight - suelo.altoZoom + 10
        florRoja.y = window.innerHeight - 225
        florAmarilla.y = window.innerHeight - 225


        if(mario.posX > window.innerWidth - mario.ancho/3 ) {
            mario.posX = window.innerWidth - mario.ancho/3 
            animar()
        }
    })


    const animacion = {
        intervaloComienzoFrame: 0,
        intervaloFinalFrame: 0
    }

    const mario = {
        sprite: spriteMario,
        x: 0, 
        posX: window.innerWidth/2 - 115, //estable la posición del personaje
        y: window.innerHeight - 280, 
        ancho: 330,
        alto: 494,
        frameActual: 0,
        frames: 4,
    }

    const florRoja = {
        sprite: imagenFlorRoja,
        x: 0,
        y: window.innerHeight - 225,
        ancho: 260,
        alto: 468,
        anchoZoom: 58,
        altoZoom: 103,
    }

    const florAmarilla = {
        sprite: imagenFlorAmarilla,
        x: 0,
        y: window.innerHeight - 225,
        ancho: 260,
        alto: 468,
        anchoZoom: 58,
        altoZoom: 103,
    }

    const suelo = {
        sprite: spriteSuelo,
        ancho : 144,
        alto: 72,
        anchoZoom: 250,
        altoZoom: 125,
        x: 0,
        y: window.innerHeight - 125,
    }

    const cesped = {
        sprite: imagenCesped,
        ancho : 120,
        alto : 24,
        x: 0,
        y: window.innerHeight - 149,
        posX: [0 , 500 , 892 , window.innerWidth - 166 - 120]

    }

    const cerca = {

        sprite : imagenCerca,
        ancho : 49,
        alto : 51,
        x: 0,
        y: window.innerHeight - 174,
        posX: [
            {
                x: 172,
                cantidad: 4
            },
            {
                x: window.innerWidth - 49*7,
                cantidad: 4
            }
        ]

    }
   

    const fondo = {
        sprite: imagenFondo,
        x: 0,
        y: 0,
        ancho: 1008,
        alto: 480,
        anchoZoom: window.innerWidth,
        altoZoom: window.innerHeight - suelo.altoZoom + 10,
    }

    const nubePequeña = {
        sprite: imagenNubePequeña,
        x: 0,
        y: 0,
        ancho: 79,
        alto: 48,
        pos: [
            {
                posX: Math.floor( Math.random() * 420 * Math.floor(Math.random() * 10)+ window.innerWidth )  ,
                posY: Math.floor(Math.random() * 100),
            },
            {
                posX: Math.floor( Math.random() * 720 * Math.floor(Math.random() * 8)+ window.innerWidth )  ,
                posY: Math.floor(Math.random() * 150),
            },
            {
                posX: Math.floor( Math.random() * 120 * Math.floor(Math.random() * 6)+ window.innerWidth )  ,
                posY: Math.floor(Math.random() * 200),
            },
            {
                posX: Math.floor( Math.random() * 680 * Math.floor(Math.random() * 4)+ window.innerWidth )  ,
                posY: Math.floor(Math.random() * 250),
            },
            {
                posX: Math.floor( Math.random() * 190 * Math.floor(Math.random() * 2)+ window.innerWidth )  ,
                posY: Math.floor(Math.random() * 230),
            },
            {
                posX: Math.floor( Math.random() * 50 * Math.floor(Math.random() * 10)+ window.innerWidth )  ,
                posY: Math.floor(Math.random() * 180),
            },
        ]
    }
    
    const nubeGrande = {
        sprite: imagenNubeGrande,
        x: 0,
        y: 0,
        ancho: 151,
        alto: 75,
        pos: [
            {
                posX: Math.floor( Math.random() * 220 * Math.floor(Math.random() * 2)+ window.innerWidth )  ,
                posY: Math.floor(Math.random() * 200),
            },
            {
                posX: Math.floor( Math.random() * 330 * Math.floor(Math.random() * 4)+ window.innerWidth )  ,
                posY: Math.floor(Math.random() * 250),
            },
            {
                posX: Math.floor( Math.random() * 450 * Math.floor(Math.random() * 6)+ window.innerWidth ) ,
                posY: Math.floor(Math.random() * 250),
            },
            {
                posX: Math.floor( Math.random() * 180 * Math.floor(Math.random() * 8)+ window.innerWidth ) ,
                posY: Math.floor(Math.random() * 250),
            },
        ]
    }

    animar()

    function animar() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pintarFondo()
        pintarNubes()
        pintarFlores()
        pintarSuelo()
        pintarCesped()
        pintarCerca()
        pintarMario()

        requestAnimationFrame(animar)
   
 

    }

    function pintarFondo() {

        ctx.drawImage(fondo.sprite, 0, 0, fondo.ancho, fondo.alto, 0, 0, fondo.anchoZoom, fondo.altoZoom)
    }

    function pintarNubes() {

       nubePequeña.pos.forEach( nube => {

            ctx.drawImage(nubePequeña.sprite, 0, 0, nubePequeña.ancho, nubePequeña.alto, nube.posX, nube.posY, nubePequeña.ancho, nubePequeña.alto)
            
            nube.posX -= 1

            if(nube.posX + nubePequeña.ancho < 0 ) {
                
                nube.posX = Math.floor( Math.random() * 500 * Math.floor(Math.random() * 10) + window.innerWidth )
                nube.posY = Math.floor( Math.random() * 150 + 10 )
            }
       })

       nubeGrande.pos.forEach( nube => {

            ctx.drawImage(nubeGrande.sprite, 0, 0, nubeGrande.ancho, nubeGrande.alto, nube.posX, nube.posY, nubeGrande.ancho, nubeGrande.alto)

            nube.posX -= 1
                
            if(nube.posX + nubeGrande.ancho < 0 ) {
                nube.posX = Math.floor( Math.random() * 500 * Math.floor(Math.random() * 10)+ window.innerWidth )
                nube.posY = Math.floor( Math.random() * 150 + 10 )
            }

       })

    }

    

    function pintarFlores() {


        ctx.drawImage(florRoja.sprite, 0, 0, florRoja.ancho, florRoja.alto, 227, florRoja.y, florRoja.anchoZoom, florRoja.altoZoom)
        ctx.drawImage(florAmarilla.sprite, 0, 0, florAmarilla.ancho, florAmarilla.alto, florAmarilla.anchoZoom + 227, florAmarilla.y, florAmarilla.anchoZoom, florRoja.altoZoom)


        ctx.drawImage(florAmarilla.sprite, 0, 0, florAmarilla.ancho, florAmarilla.alto, window.innerWidth - florAmarilla.anchoZoom - 166, florAmarilla.y, florAmarilla.anchoZoom, florAmarilla.altoZoom)
        ctx.drawImage(florRoja.sprite, 0, 0, florRoja.ancho, florRoja.alto, window.innerWidth - florRoja.anchoZoom * 2 - 166, florAmarilla.y, florRoja.anchoZoom, florRoja.altoZoom)
        

    }

    function pintarSuelo() {

        let count = window.innerWidth / suelo.ancho 

        for (let i = 0; i<=count ; i++) {

            ctx.drawImage(suelo.sprite, 0 , 0, suelo.ancho, suelo.alto, suelo.anchoZoom * i, suelo.y, suelo.anchoZoom, suelo.altoZoom);
        }    

    }

    function pintarCesped() {

        cesped.posX.forEach(coordX => {

            ctx.drawImage(cesped.sprite, 0 , 0, cesped.ancho, cesped.alto, coordX, cesped.y, cesped.ancho, cesped.alto);
        })
    }

    function pintarCerca() {
        
        cerca.posX.forEach( spriteCerca => {
            
            for(let index=0; index <= spriteCerca.cantidad; index++ ) {

                ctx.drawImage(cerca.sprite, 0, 0, cerca.ancho, cerca.alto, spriteCerca.x + cerca.ancho*index, cerca.y, cerca.ancho, cerca.alto)
            }

        })

    }


    function pintarMario() {
        
        /*  imagen, 
            coord x img, 
            coord y img,
            ancho recorte imagen, 
            alto recorte imagen, 
            coord x canvas, (ubicación)
            coord y canvas, (ubicación)
            ancho img, (tamaño que usará)
            alto img (tamaño que usará)
        */
            
        if(marioMoviendose){

            if(marioDerecha && !marioIzquierda) {

                mario.sprite = spriteMario

                ctx.drawImage(mario.sprite, mario.frameActual * mario.ancho, 0, mario.ancho, mario.alto, mario.posX, mario.y, mario.ancho/3, mario.alto/3);

                if(mario.posX + 15  < window.innerWidth - mario.ancho/3) {
                    mario.posX += 15
                }
            }
            else if(marioIzquierda && !marioDerecha) {

                ctx.drawImage(mario.sprite, mario.frameActual * mario.ancho, 0, mario.ancho, mario.alto, mario.posX, mario.y, mario.ancho/3, mario.alto/3);

                mario.sprite = spriteMarioIzq

                if(mario.posX - 15  > 0) {
                    mario.posX -= 15
                }

            }else {
                marioDerecha = false;
                marioIzquierda = false;
                ctx.drawImage(mario.sprite, 0 , 0, mario.ancho, mario.alto, mario.posX, mario.y, mario.ancho/3, mario.alto/3);
            }

        }else {

            ctx.drawImage(mario.sprite, 0 , 0, mario.ancho, mario.alto, mario.posX, mario.y, mario.ancho/3, mario.alto/3);
        }


        if( animacion.intervaloComienzoFrame === animacion.intervaloFinalFrame ) {

            mario.frameActual++

            if(mario.frameActual> mario.frames) {
                mario.frameActual = 0
            }

            animacion.intervaloComienzoFrame = 0
        }


        
    }

    document.addEventListener('keydown', (e) => {


        
        if(e.key === 'ArrowRight') {

            marioDerecha = true
            marioIzquierda = false
            marioMoviendose = true
        }
        if(e.key === "ArrowLeft") {
            marioIzquierda = true
            marioDerecha = false
            marioMoviendose = true
        }


    })

    document.addEventListener("keyup", (e) => {
        if(e.key === 'ArrowRight') {
            marioMoviendose = false
            marioDerecha = false
        }
        if(e.key === 'ArrowLeft') {
            marioMoviendose = false
            marioIzquierda = false
        }
    })

    

}