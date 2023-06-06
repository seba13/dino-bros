

class Sprite{
    /**
     * 
     * @param {object} posicion 
     * @param {object} velocidad 
     * @param {string} rutaImagen 
     * @param {number} maximosCuadros 
     * @param {number} escalaSprite 
     * @param {string[]} sprites 
     */
     constructor({posicion, velocidad, rutaImagen, maximosCuadros, contadorLimiteCuadros, escalaSprite = 1, gravedad = 0, sprites = undefined}){
 
         this.posicion = posicion;
         this.velocidad = velocidad;
         this.imagen = document.createElement("img");
         this.imagen.src = rutaImagen
         this.maximosCuadros = maximosCuadros;
         this.cuadroActual = 0;
         this.contadorCuadros = 0;
         this.contadorLimiteCuadros = contadorLimiteCuadros;
         this.escalaSprite = escalaSprite;
         this.sprites = sprites
         this.gravedad = gravedad;
         this.ultimaTeclaPresiona = '';
         this.ultimaDireccion = 'derecha';
 
         this.coordenadaSuelo = canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite
         for(const sprite in sprites) {
             this.sprites[sprite].imagen = document.createElement('img')
             this.sprites[sprite].imagen.src = this.sprites[sprite].rutaImagen
         }
 
     }
 
 
     dibujar() {
 
         ctx.drawImage(
             this.imagen, this.cuadroActual * (this.imagen.width / this.maximosCuadros) 
             , 
             0, 
             this.imagen.width / this.maximosCuadros, 
             this.imagen.height, 
             this.posicion.x,
             this.posicion.y, 
             this.imagen.width / this.maximosCuadros * this.escalaSprite, 
             this.imagen.height * this.escalaSprite);
     }
 
     animarSprite() {
         this.contadorCuadros++
         
 
         // cambia de un cuadro a otro
         if((this.contadorCuadros % this.contadorLimiteCuadros) === 0) {
 
             if(this.cuadroActual < this.maximosCuadros - 1) {
                 this.cuadroActual++
             }else {
                 this.cuadroActual = 0
             }
 
         }
         // mover sprite en canvas
         // aplica gravedad solo a los que tenga gravedad 1
         if(this.gravedad === 1) {
             if(this.posicion.y + this.velocidad.y - 2 +  this.imagen.height  * this.escalaSprite < this.coordenadaSuelo) {
                 this.velocidad.y += 1
                 this.posicion.y += this.velocidad.y
             } else {
                 this.velocidad.y = 0
             }
         }
         if(propGenerales.teclas[this.ultimaTeclaPresiona] ) {
             this.cambiarSprite(this.ultimaTeclaPresiona)
         }
 
 
     }
 
 
     cambiarSprite(accion) {
 
         if(this.sprites) {
             
             if(this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowRight.presionada){
 
                 if(this.imagen != this.sprites['caminandoDerecha'].imagen) {
                     this.imagen = this.sprites['caminandoDerecha'].imagen
                     this.maximosCuadros = this.sprites['caminandoDerecha'].maximosCuadros
                 }
 
                 if(this.posicion.x + 10 + (this.imagen.width/this.maximosCuadros * this.escalaSprite )< canvas.width){
                     this.posicion.x +=10
                 }
                 this.ultimaDireccion = 'derecha'
             }
 
            else if(this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowLeft.presionada){
 
                 if(this.imagen != this.sprites['caminandoIzquierda'].imagen){
                     this.imagen = this.sprites['caminandoIzquierda'].imagen
                     this.maximosCuadros = this.sprites['caminandoIzquierda'].maximosCuadros
                 }
 
                 if(this.posicion.x - 10 > 0){
                     this.posicion.x -=10
                 }
                 this.ultimaDireccion = 'izquierda'
             }
             else if(this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowUp.presionada){
 
                 // determinar en que direccion está el salto
 
                 if(this.ultimaDireccion == 'derecha') {
                     if(this.imagen != this.sprites['saltandoDerecha'].imagen){
                         this.imagen = this.sprites['saltandoDerecha'].imagen
                         this.maximosCuadros = this.sprites['saltandoDerecha'].maximosCuadros
                     }
                 }
                 else if(this.ultimaDireccion == 'izquierda') {
                     if(this.imagen != this.sprites['saltandoIzquierda'].imagen) {
                         this.imagen = this.sprites['saltandoIzquierda'].imagen
                         this.maximosCuadros = this.sprites['saltandoIzquierda'].maximosCuadros
                     }
                     
                 }
                 this.posicion.y -= 20
             
             
             
             }
             // si no se está presionando ninguna tecla
             else{
                 
 
                 if(this.ultimaTeclaPresiona == 'ArrowUp'){
                     if(this.posicion.y + this.velocidad.y + this.imagen.height * this.escalaSprite > this.coordenadaSuelo) {
                         if(this.ultimaDireccion === 'derecha') {
     
                             this.imagen = this.sprites['inactivoDerecha'].imagen
                             this.maximosCuadros = this.sprites['inactivoDerecha'].maximosCuadros
                         }
                         if(this.ultimaDireccion === 'izquierda') {
                             
                             this.imagen = this.sprites['inactivoIzquierda'].imagen
                             this.maximosCuadros = this.sprites['inactivoIzquierda'].maximosCuadros
                         }
                     }
                 } else {
                     if(this.ultimaDireccion === 'derecha') {
                         
                         this.imagen = this.sprites['inactivoDerecha'].imagen
                         this.maximosCuadros = this.sprites['inactivoDerecha'].maximosCuadros
                     }
                     if(this.ultimaDireccion === 'izquierda') {
                         
                         this.imagen = this.sprites['inactivoIzquierda'].imagen
                         this.maximosCuadros = this.sprites['inactivoIzquierda'].maximosCuadros
                     }
                 }
             }
         }else {
             console.log("no sprites");
         }
 
     }
 
     actualizarSprite() {
         this.dibujar()
         this.animarSprite()
     }
 
 }
 
 
 
 class Animable extends Sprite{
 
 
     constructor({posicion, velocidad, rutaImagen, maximosCuadros, contadorLimiteCuadros, escalaSprite = 1, gravedad = 0, sprites = undefined}){
         super({posicion, velocidad, rutaImagen, maximosCuadros, contadorLimiteCuadros, escalaSprite, gravedad, sprites})
 
     }
 
     animarSprite() {
         this.posicion.x-=1
 
         if(this.posicion.x + this.imagen.width * this.escalaSprite < 0) {
             this.posicion.x = canvas.width - propGenerales.nubePequeña.ancho + Math.floor(Math.random() * 601) + Math.floor((Math.random() * 1200) + 100);
 
             this.posicion.y = Math.floor(Math.random() * 250) 
         }
     }
 
 }