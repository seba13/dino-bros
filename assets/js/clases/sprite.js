class Sprite {
	/**
	 *
	 * @param {object} posicion
	 * @param {object} velocidad
	 * @param {string} rutaImagen
	 * @param {number} maximosCuadros
	 * @param {number} escalaSprite
	 * @param {string[]} sprites
	 */
	constructor({ posicion, velocidad, rutaImagen, maximosCuadros, offset = { x: 0, y: 0 }, contadorLimiteCuadros, escalaSprite = 1, gravedad = 0, sprites = undefined }) {
		this.posicion = posicion;
		this.velocidad = velocidad;
		this.imagen = document.createElement('img');
		this.imagen.src = rutaImagen;
		this.maximosCuadros = maximosCuadros;
		this.cuadroActual = 0;
		this.contadorCuadros = 0;
		this.contadorLimiteCuadros = contadorLimiteCuadros;
		this.escalaSprite = escalaSprite;
		this.sprites = sprites;
		this.gravedad = gravedad;
		this.offset = offset;
		this.ultimaTeclaPresionada = '';
		this.bloquearSalto = false;
		this.ultimaDireccion = 'derecha';
		this.coordenadaSalto = this.posicion.y + this.offset.y + this.velocidad.y + this.imagen.height * this.escalaSprite;


		// console.log(`canvas.height:${canvas.height} + propGenerales.suelo.alto:${propGenerales.suelo.alto} * propGenerales.suelo.escalaSprite:${propGenerales.suelo.escalaSprite} - this.imagen.height:${this.imagen.height} * this.escalaSprite:${this.escalaSprite} === ${Math.floor(canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - this.imagen.height * this.escalaSprite)}`)

		const self = this


		// espera a que cargue la imagen para así obtener el alto de esta
		this.imagen.addEventListener("load", function (e) {

			self.deltaSueloSprite = Math.floor(canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - self.imagen.height * self.escalaSprite);

		})

		for (const sprite in sprites) {
			this.sprites[sprite].imagen = document.createElement('img');
			this.sprites[sprite].imagen.src = this.sprites[sprite].rutaImagen;
		}
	}

	dibujar() {
		ctx.drawImage(
			this.imagen,
			this.cuadroActual * (this.imagen.width / this.maximosCuadros),
			0,
			this.imagen.width / this.maximosCuadros,
			this.imagen.height,
			this.posicion.x,
			this.posicion.y + this.offset.y,
			(this.imagen.width / this.maximosCuadros) * this.escalaSprite,
			this.imagen.height * this.escalaSprite,
		);
	}

	animarSprite() {
		this.contadorCuadros++;

		// cambia de un cuadro a otro
		if (this.contadorCuadros % this.contadorLimiteCuadros === 0) {
			if (this.cuadroActual < this.maximosCuadros - 1) {
				this.cuadroActual++;
			} else {
				this.cuadroActual = 0;
			}
		}

		// mover sprite en canvas
		// aplica gravedad solo a los que tenga gravedad 1
		if (this.gravedad === 1) {
			// if(this.posicion.y + this.velocidad.y - 2 +  this.imagen.height  * this.escalaSprite < this.deltaSueloSprite) {
			//     this.velocidad.y += 1
			//     this.posicion.y += this.velocidad.y
			// } else {
			//     this.velocidad.y = 0
			// }
			

			this.posicion.x += this.velocidad.x;
			this.velocidad.y += propGenerales.gravedad;


            if(this.posicion.y + this.velocidad.y < this.deltaSueloSprite) {
                this.posicion.y += this.velocidad.y;
            }else {

				if(this.condicion == 0) {
					this.condicion = 1

					
					canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite - this.imagen.height * this.escalaSprite;
					console.log({"coordenada suelo posY" :this.deltaSueloSprite});
				}


                this.posicion.y = this.deltaSueloSprite
                this.velocidad.y = 0
            }


            // aparicion personaje por el otro extremo

			if (this.posicion.x < -this.imagen.width * this.escalaSprite) {
				console.log('entra aca');
				this.posicion.x = canvas.width;
				console.log(this.posicion.x);
			}
			if (this.posicion.x > canvas.width) {
				this.posicion.x = -this.imagen.width * this.escalaSprite;
			}
		}
		if (propGenerales.teclas[this.ultimaTeclaPresionada]) {
			this.cambiarSprite(this.ultimaTeclaPresionada);
		}
	}

	cambiarSprite(accion) {
		if (this.sprites) {
			// define la posición actual cuando salta el personaje
			this.coordenadaSalto = Math.floor(this.posicion.y + this.velocidad.y);

			
			if(propGenerales.teclas.ArrowUp.presionada  && !this.bloquearSalto) {
				this.bloquearSalto = true
				console.log({salto: this.deltaSueloSprite + this.velocidad.y });

				if(this.posicion.y + this.velocidad.y > this.deltaSueloSprite - 15) {

					this.velocidad.y = -15
				}

			}
			if(Math.floor(this.posicion.y) != this.deltaSueloSprite) {

			
				if(this.ultimaDireccion === 'derecha'){
					if(this.imagen != this.sprites['saltandoDerecha'].imagen) {
						this.imagen = this.sprites['saltandoDerecha'].imagen
						this.maximosCuadros = this.sprites['saltandoDerecha'].maximosCuadros
						this.cuadroActual = 0
					}
				}else 
				if(this.ultimaDireccion === 'izquierda') {
					if(this.imagen != this.sprites['saltandoIzquierda'].imagen) {
						this.imagen = this.sprites['saltandoIzquierda'].imagen
						this.maximosCuadros = this.sprites['saltandoIzquierda'].maximosCuadros
						this.cuadroActual = 0
					}
				}
			}
			if(propGenerales.teclas.ArrowLeft.presionada) {

				if(Math.floor(this.posicion.y) === this.deltaSueloSprite) {
					if(this.imagen != this.sprites['caminandoIzquierda'].imagen) {

						this.imagen = this.sprites['caminandoIzquierda'].imagen
						this.maximosCuadros = this.sprites['caminandoIzquierda'].maximosCuadros
						this.cuadroActual = 0
					}
				}
				
				this.velocidad.x = -5
				this.ultimaDireccion = 'izquierda'

			} else
			if(propGenerales.teclas.ArrowRight.presionada) {
				if(Math.floor(this.posicion.y) === this.deltaSueloSprite) {
					if(this.imagen != this.sprites['caminandoDerecha'].imagen) {
						this.imagen = this.sprites['caminandoDerecha'].imagen
						this.maximosCuadros = this.sprites['caminandoDerecha'].maximosCuadros
						this.cuadroActual = 0
					}
				}
				this.ultimaDireccion = 'derecha'
				this.velocidad.x = 5
			}
			else {
				if(Math.floor(this.posicion.y) === this.deltaSueloSprite) {
					if(this.ultimaDireccion === 'derecha'){
						if(this.imagen != this.sprites['inactivoDerecha'].imagen) {
							this.imagen = this.sprites['inactivoDerecha'].imagen
							this.maximosCuadros = this.sprites['inactivoDerecha'].maximosCuadros
							this.cuadroActual = 0
						}
					}else 
					if(this.ultimaDireccion === 'izquierda') {
						if(this.imagen != this.sprites['inactivoIzquierda'].imagen) {
							this.imagen = this.sprites['inactivoIzquierda'].imagen
							this.maximosCuadros = this.sprites['inactivoIzquierda'].maximosCuadros
							this.cuadroActual = 0
						}
					}
					this.velocidad.x = 0
				}
				
			}


			


			






















			// if (this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowRight.presionada) {
			// 	if (this.coordenadaSalto >= this.deltaSueloSprite) {
			// 		if (this.imagen != this.sprites['caminandoDerecha'].imagen) {
			// 			this.imagen = this.sprites['caminandoDerecha'].imagen;
			// 			this.maximosCuadros = this.sprites['caminandoDerecha'].maximosCuadros;
			// 			this.cuadroActual = 0;
			// 		}

			// 		// if(this.posicion.x + 10 + (this.imagen.width/this.maximosCuadros * this.escalaSprite )< canvas.width){
			// 		//     this.posicion.x +=10
			// 		// }

			// 		//  1920 => 10
			// 		//  980 =>
			// 	}
			// 	this.ultimaDireccion = 'derecha';
			// 	this.velocidad.x = (canvas.width * 3) / 1920;
			// } else if (this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowLeft.presionada) {
			// 	if (this.coordenadaSalto >= this.deltaSueloSprite) {
			// 		if (this.imagen != this.sprites['caminandoIzquierda'].imagen) {
			// 			this.imagen = this.sprites['caminandoIzquierda'].imagen;
			// 			this.maximosCuadros = this.sprites['caminandoIzquierda'].maximosCuadros;
			// 			this.cuadroActual = 0;
			// 		}

			// 		// if(this.posicion.x - 10 > 0){
			// 		//     this.posicion.x -=10
			// 		// }
			// 	}
			// 	this.velocidad.x = (canvas.width * -3) / 1920;
			// 	//  console.log(this.velocidad.x);
			// 	this.ultimaDireccion = 'izquierda';
			// } else if (this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowUp.presionada) {
			// 	// this.velocidad.x = 0
			// 	// determinar en que direccion está el salto
			// 	if (this.ultimaDireccion == 'derecha') {
			// 		if (this.imagen != this.sprites['saltandoDerecha'].imagen) {
			// 			this.imagen = this.sprites['saltandoDerecha'].imagen;
			// 			this.maximosCuadros = this.sprites['saltandoDerecha'].maximosCuadros;
			// 			this.cuadroActual = 0;
			// 			if (this.velocidad.y == 0) {
			// 				this.velocidad.y -= (canvas.height * 15) / 973;
			// 			}
			// 		}
			// 	} else if (this.ultimaDireccion == 'izquierda') {
			// 		if (this.imagen != this.sprites['saltandoIzquierda'].imagen) {
			// 			this.imagen = this.sprites['saltandoIzquierda'].imagen;
			// 			this.maximosCuadros = this.sprites['saltandoIzquierda'].maximosCuadros;
			// 			this.cuadroActual = 0;
			// 			if (this.velocidad.y == 0) {
			// 				this.velocidad.y -= (canvas.height * 15) / 973;
			// 			}
			// 		}
			// 	}

			// 	if (this.coordenadaSalto >= this.deltaSueloSprite) {
			// 		if (this.ultimaDireccion === 'derecha') {
			// 			if (this.imagen !== this.sprites['inactivoDerecha'].imagen) {
			// 				this.imagen = this.sprites['inactivoDerecha'].imagen;
			// 				this.maximosCuadros = this.sprites['inactivoDerecha'].maximosCuadros;
			// 				this.cuadroActual = 0;
			// 			}
			// 		}
			// 		if (this.ultimaDireccion === 'izquierda') {
			// 			if (this.imagen !== this.sprites['inactivoIzquierda'].imagen) {
			// 				this.imagen = this.sprites['inactivoIzquierda'].imagen;
			// 				this.maximosCuadros = this.sprites['inactivoIzquierda'].maximosCuadros;
			// 				this.cuadroActual = 0;
			// 			}
			// 		}
			// 	}
			// }
			// // si no se está presionando ninguna tecla
			// else {
			// 	this.velocidad.x = 0;
			// 	// this.velocidad.y = 0
			// 	if (this.ultimaTeclaPresiona == 'ArrowUp') {
			// 		if (this.coordenadaSalto >= this.deltaSueloSprite) {
			// 			if (this.ultimaDireccion === 'derecha') {
			// 				if (this.imagen !== this.sprites['inactivoDerecha'].imagen) {
			// 					this.imagen = this.sprites['inactivoDerecha'].imagen;
			// 					this.maximosCuadros = this.sprites['inactivoDerecha'].maximosCuadros;
			// 					this.cuadroActual = 0;
			// 				}
			// 			}
			// 			if (this.ultimaDireccion === 'izquierda') {
			// 				if (this.imagen !== this.sprites['inactivoIzquierda'].imagen) {
			// 					this.imagen = this.sprites['inactivoIzquierda'].imagen;
			// 					this.maximosCuadros = this.sprites['inactivoIzquierda'].maximosCuadros;
			// 					this.cuadroActual = 0;
			// 				}
			// 			}
			// 		}
			// 	} else {
			// 		if (this.ultimaDireccion === 'derecha') {
			// 			if (this.imagen !== this.sprites['inactivoDerecha'].imagen) {
			// 				this.imagen = this.sprites['inactivoDerecha'].imagen;
			// 				this.maximosCuadros = this.sprites['inactivoDerecha'].maximosCuadros;
			// 				this.cuadroActual = 0;
			// 			}
			// 		}
			// 		if (this.ultimaDireccion === 'izquierda') {
			// 			if (this.imagen !== this.sprites['inactivoIzquierda'].imagen) {
			// 				this.imagen = this.sprites['inactivoIzquierda'].imagen;
			// 				this.maximosCuadros = this.sprites['inactivoIzquierda'].maximosCuadros;
			// 				this.cuadroActual = 0;
			// 			}
			// 		}
			// 	}
			// }
		} 
	}

	actualizarSprite() {
		this.dibujar();
		this.animarSprite();
	}
}

class Animable extends Sprite {
	constructor({ posicion, velocidad, rutaImagen, maximosCuadros, contadorLimiteCuadros, escalaSprite = 1, gravedad = 0, sprites = undefined }) {
		super({ posicion, velocidad, rutaImagen, maximosCuadros, contadorLimiteCuadros, escalaSprite, gravedad, sprites });
	}

	animarSprite() {
		this.posicion.x -= canvas.width / 1920;

		if (this.posicion.x + this.imagen.width * this.escalaSprite < 0) {
			this.posicion.x = canvas.width - propGenerales.nubePequeña.ancho + Math.floor(Math.random() * 601) + Math.floor(Math.random() * 1200 + 100);

			this.posicion.y = Math.floor(Math.random() * 250);
		}
	}
}
