"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sprite =
/*#__PURE__*/
function () {
  /**
   * 
   * @param {object} posicion 
   * @param {object} velocidad 
   * @param {string} rutaImagen 
   * @param {number} maximosCuadros 
   * @param {number} escalaSprite 
   * @param {string[]} sprites 
   */
  function Sprite(_ref) {
    var posicion = _ref.posicion,
        velocidad = _ref.velocidad,
        rutaImagen = _ref.rutaImagen,
        maximosCuadros = _ref.maximosCuadros,
        contadorLimiteCuadros = _ref.contadorLimiteCuadros,
        _ref$escalaSprite = _ref.escalaSprite,
        escalaSprite = _ref$escalaSprite === void 0 ? 1 : _ref$escalaSprite,
        _ref$gravedad = _ref.gravedad,
        gravedad = _ref$gravedad === void 0 ? 0 : _ref$gravedad,
        _ref$sprites = _ref.sprites,
        sprites = _ref$sprites === void 0 ? undefined : _ref$sprites;

    _classCallCheck(this, Sprite);

    this.posicion = posicion;
    this.velocidad = velocidad;
    this.imagen = document.createElement("img");
    this.imagen.src = rutaImagen;
    this.maximosCuadros = maximosCuadros;
    this.cuadroActual = 0;
    this.contadorCuadros = 0;
    this.contadorLimiteCuadros = contadorLimiteCuadros;
    this.escalaSprite = escalaSprite;
    this.sprites = sprites;
    this.gravedad = gravedad;
    this.ultimaTeclaPresiona = '';
    this.ultimaDireccion = 'derecha';
    this.coordenadaSuelo = canvas.height - propGenerales.suelo.alto * propGenerales.suelo.escalaSprite;

    for (var sprite in sprites) {
      this.sprites[sprite].imagen = document.createElement('img');
      this.sprites[sprite].imagen.src = this.sprites[sprite].rutaImagen;
    }
  }

  _createClass(Sprite, [{
    key: "dibujar",
    value: function dibujar() {
      ctx.drawImage(this.imagen, this.cuadroActual * (this.imagen.width / this.maximosCuadros), 0, this.imagen.width / this.maximosCuadros, this.imagen.height, this.posicion.x, this.posicion.y, this.imagen.width / this.maximosCuadros * this.escalaSprite, this.imagen.height * this.escalaSprite);
    }
  }, {
    key: "animarSprite",
    value: function animarSprite() {
      this.contadorCuadros++; // cambia de un cuadro a otro

      if (this.contadorCuadros % this.contadorLimiteCuadros === 0) {
        if (this.cuadroActual < this.maximosCuadros - 1) {
          this.cuadroActual++;
        } else {
          this.cuadroActual = 0;
        }
      } // mover sprite en canvas
      // aplica gravedad solo a los que tenga gravedad 1


      if (this.gravedad === 1) {
        if (this.posicion.y + this.velocidad.y - 2 + this.imagen.height * this.escalaSprite < this.coordenadaSuelo) {
          this.velocidad.y += 1;
          this.posicion.y += this.velocidad.y;
        } else {
          this.velocidad.y = 0;
        }
      }

      if (propGenerales.teclas[this.ultimaTeclaPresiona]) {
        this.cambiarSprite(this.ultimaTeclaPresiona);
      }
    }
  }, {
    key: "cambiarSprite",
    value: function cambiarSprite(accion) {
      if (this.sprites) {
        if (this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowRight.presionada) {
          if (this.imagen != this.sprites['caminandoDerecha'].imagen) {
            this.imagen = this.sprites['caminandoDerecha'].imagen;
            this.maximosCuadros = this.sprites['caminandoDerecha'].maximosCuadros;
          }

          if (this.posicion.x + 10 + this.imagen.width / this.maximosCuadros * this.escalaSprite < canvas.width) {
            this.posicion.x += 10;
          }

          this.ultimaDireccion = 'derecha';
        } else if (this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowLeft.presionada) {
          if (this.imagen != this.sprites['caminandoIzquierda'].imagen) {
            this.imagen = this.sprites['caminandoIzquierda'].imagen;
            this.maximosCuadros = this.sprites['caminandoIzquierda'].maximosCuadros;
          }

          if (this.posicion.x - 10 > 0) {
            this.posicion.x -= 10;
          }

          this.ultimaDireccion = 'izquierda';
        } else if (this.ultimaTeclaPresiona === accion && propGenerales.teclas.ArrowUp.presionada) {
          // determinar en que direccion está el salto
          if (this.ultimaDireccion == 'derecha') {
            if (this.imagen != this.sprites['saltandoDerecha'].imagen) {
              this.imagen = this.sprites['saltandoDerecha'].imagen;
              this.maximosCuadros = this.sprites['saltandoDerecha'].maximosCuadros;
            }
          } else if (this.ultimaDireccion == 'izquierda') {
            if (this.imagen != this.sprites['saltandoIzquierda'].imagen) {
              this.imagen = this.sprites['saltandoIzquierda'].imagen;
              this.maximosCuadros = this.sprites['saltandoIzquierda'].maximosCuadros;
            }
          }

          this.posicion.y -= 20;
        } // si no se está presionando ninguna tecla
        else {
            if (this.ultimaTeclaPresiona == 'ArrowUp') {
              if (this.posicion.y + this.velocidad.y + this.imagen.height * this.escalaSprite > this.coordenadaSuelo) {
                if (this.ultimaDireccion === 'derecha') {
                  this.imagen = this.sprites['inactivoDerecha'].imagen;
                  this.maximosCuadros = this.sprites['inactivoDerecha'].maximosCuadros;
                }

                if (this.ultimaDireccion === 'izquierda') {
                  this.imagen = this.sprites['inactivoIzquierda'].imagen;
                  this.maximosCuadros = this.sprites['inactivoIzquierda'].maximosCuadros;
                }
              }
            } else {
              if (this.ultimaDireccion === 'derecha') {
                this.imagen = this.sprites['inactivoDerecha'].imagen;
                this.maximosCuadros = this.sprites['inactivoDerecha'].maximosCuadros;
              }

              if (this.ultimaDireccion === 'izquierda') {
                this.imagen = this.sprites['inactivoIzquierda'].imagen;
                this.maximosCuadros = this.sprites['inactivoIzquierda'].maximosCuadros;
              }
            }
          }
      } else {
        console.log("no sprites");
      }
    }
  }, {
    key: "actualizarSprite",
    value: function actualizarSprite() {
      this.dibujar();
      this.animarSprite();
    }
  }]);

  return Sprite;
}();

var Animable =
/*#__PURE__*/
function (_Sprite) {
  _inherits(Animable, _Sprite);

  function Animable(_ref2) {
    var posicion = _ref2.posicion,
        velocidad = _ref2.velocidad,
        rutaImagen = _ref2.rutaImagen,
        maximosCuadros = _ref2.maximosCuadros,
        contadorLimiteCuadros = _ref2.contadorLimiteCuadros,
        _ref2$escalaSprite = _ref2.escalaSprite,
        escalaSprite = _ref2$escalaSprite === void 0 ? 1 : _ref2$escalaSprite,
        _ref2$gravedad = _ref2.gravedad,
        gravedad = _ref2$gravedad === void 0 ? 0 : _ref2$gravedad,
        _ref2$sprites = _ref2.sprites,
        sprites = _ref2$sprites === void 0 ? undefined : _ref2$sprites;

    _classCallCheck(this, Animable);

    return _possibleConstructorReturn(this, _getPrototypeOf(Animable).call(this, {
      posicion: posicion,
      velocidad: velocidad,
      rutaImagen: rutaImagen,
      maximosCuadros: maximosCuadros,
      contadorLimiteCuadros: contadorLimiteCuadros,
      escalaSprite: escalaSprite,
      gravedad: gravedad,
      sprites: sprites
    }));
  }

  _createClass(Animable, [{
    key: "animarSprite",
    value: function animarSprite() {
      this.posicion.x -= 1;

      if (this.posicion.x + this.imagen.width * this.escalaSprite < 0) {
        this.posicion.x = canvas.width - propGenerales.nubePequeña.ancho + Math.floor(Math.random() * 601) + Math.floor(Math.random() * 1200 + 100);
        this.posicion.y = Math.floor(Math.random() * 250);
      }
    }
  }]);

  return Animable;
}(Sprite);