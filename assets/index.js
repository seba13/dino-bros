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
const spriteSuelo2 = document.createElement("img");
const sprites = [spriteMario, spriteSuelo, spriteSuelo2]

spriteMario.src = "/assets/sprites-mario.png";
spriteMarioIzq.src = "/assets/sprites-mario-izquierda.png";
spriteSuelo.src = "/assets/suelo.png";
spriteSuelo2.src = "/assets/suelo-2.png";




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
        suelo.y = window.innerHeight - 130;
        suelo2.y = window.innerHeight - 66;

        console.log(mario.posX);
        console.log(window.innerWidth);


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
        posX: 50,
        y: window.innerHeight - 280, 
        ancho: 315,
        alto: 494,
        frameActual: 0,
        frames: 4,
    }

    

    const suelo = {
        sprite: spriteSuelo,
        ancho : 185,
        alto: 64,
        x: 0,
        y: window.innerHeight - 130,
    }
    const suelo2 = {
        sprite: spriteSuelo2,
        ancho : 185,
        alto: 64,
        x: 0,
        y: window.innerHeight - 66,
    }

    const marioSaltando = {
        sprite: spriteMario,
        x: 1260,
        y: 0,
        ancho: 375,
        alto: 494,
        frameActual: 0,
        frames: 1,
    }
    
   

    animar()

    function animar() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pintarCielo()
        pintarSuelo()
        pintarMario()

        
 
        requestAnimationFrame(animar)
   
        // pintarMario()
        // pintar el fondo

    }

    function pintarCielo() {

        ctx.fillStyle = "#469DFC"

        porcentajePintadoY = window.innerHeight * 0.09

        ctx.fillRect(0, -porcentajePintadoY, canvas.width, canvas.height)

    }

    function pintarSuelo() {

        let count = window.innerWidth / suelo.ancho 

        for (let i = 0; i<=count ; i++) {

            ctx.drawImage(suelo.sprite, 0 , 0, suelo.ancho, suelo.alto, suelo.ancho * i, suelo.y, suelo.ancho, suelo.alto);
            ctx.drawImage(suelo2.sprite, 0 , 0, suelo2.ancho, suelo2.alto, suelo2.ancho * i, suelo2.y, suelo2.ancho, suelo2.alto);
        }    

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

                if(mario.posX + 7  < window.innerWidth - mario.ancho/3) {
                    mario.posX += 7
                }
            }
            else if(marioIzquierda && !marioDerecha) {

                ctx.drawImage(mario.sprite, mario.frameActual * mario.ancho, 0, mario.ancho, mario.alto, mario.posX, mario.y, mario.ancho/3, mario.alto/3);

                mario.sprite = spriteMarioIzq

                if(mario.posX - 7  > 0) {
                    mario.posX -= 7
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
            marioMoviendose = true
        }
        if(e.key === "ArrowLeft") {
            marioIzquierda = true
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