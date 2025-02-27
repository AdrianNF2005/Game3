let Flotacion = 0;
let Flotacion2 = 0;

let senoidal = 0;
let senoidal2 = 0;

let rotationAngle = 0;

class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 130;
    this.score = 0;
    this.previousMouseY = Array(16).fill(y); // Inicializar con valores de mouseY
  }

  show() {
    fill(255);
    push();
    imageMode(CENTER);
    translate(this.x, this.y);

    if (Flotacion < 360) {
      Flotacion = Flotacion + 2;
    } else {
      Flotacion = 0;
    }

    senoidal = map(sin(Flotacion), -1, 1, -10, 10);

    if (Flotacion2 < 360) {
      Flotacion2 = Flotacion2 + 3;
    } else {
      Flotacion2 = 0;
    }

    senoidal2 = map(sin(Flotacion2), -1, 1, -10, 10);

    // Calcular la media de las posiciones anteriores del mouse
    let avgMouseY =
      this.previousMouseY.reduce((a, b) => a + b) / this.previousMouseY.length;

    if (playing == true) {
      rotationAngle = map(mouseY + senoidal2 / 5 - avgMouseY, -60, 60, -40, 30);
    }

    if (rotationAngle >= 30) {
      rotationAngle = 30;
    }

    if (rotationAngle <= -40) {
      rotationAngle = -40;
    }

    rotate(rotationAngle);
    image(birdImg, 0, 0, this.r, this.r);
    pop();
  }

  update() {
    if (playing == true) {
      // Actualiza la posición en el arreglo `previousMouseY` para el cálculo de media
      this.previousMouseY.shift(); // Eliminar la posición más antigua
      this.previousMouseY.push(mouseY); // Añadir la posición actual

      // Movimiento del pájaro según el mouse y limitación en la pantalla
      this.y = constrain(mouseY + senoidal, 0, height);
    }
  }
}
