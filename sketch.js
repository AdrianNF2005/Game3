let pipes = [];
let bird;
let playing = false;

let millisANT = 0;
let millisANT2 = 0;
let Tiempo = 4000;
let TiempoUpdate = 10000;
let multiplicador = 1;
let millisRecord = 0;
let Opacity = 255;
let OpacityANT = 255;

let FuturisticFont;

let music;
let dead;

let r = 255;
let g = 0;
let b = 0;

let floatProgramer = 0;
let floatProgramer2 = 0;

let showDuck = false;

let birdImg,
  pipe1white,
  pipe2white,
  pipe1green,
  pipe2green,
  pipe1yellow,
  pipe2yellow,
  pipe1red,
  pipe2red,
  backgroundImg,
  Duckprogramer,
  Duckprogramer2,
  QR;

function preload() {
  QR = loadImage("assets/qr-code.png");
  Duckprogramer = loadImage("assets/DuckProgramer.webp");
  Duckprogramer2 = loadImage("assets/DuckProgramerText.webp");
  birdImg = loadImage("assets/bird.png");
  pipe1white = loadImage("assets/pipes1white.png");
  pipe2white = loadImage("assets/pipes2white.png");
  pipe1green = loadImage("assets/pipes1green.png");
  pipe2green = loadImage("assets/pipes2green.png");
  pipe1yellow = loadImage("assets/pipes1yellow.png");
  pipe2yellow = loadImage("assets/pipes2yellow.png");
  pipe1red = loadImage("assets/pipes1red.png");
  pipe2red = loadImage("assets/pipes2red.png");
  backgroundImg = loadImage("assets/background.png");
  FuturisticFont = loadFont("assets/ethnocentric.otf");
  music = loadSound("assets/MUSIC.mp3");
  dead = loadSound("assets/DEAD.mp3");
}

function setup() {
  createCanvas(1280, 720);
  frameRate(60);
  bird = new Bird(width / 3, height / 3);

  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(80);
  music.loop();

  if (second() % 2 === 0) {
    showDuck = true;
  }

}

function draw() {
  if (millis() - millisANT2 >= TiempoUpdate && Tiempo > 1687.5) {
    millisANT2 = millis();
    Tiempo = Tiempo * 0.75;
  }

  if (millis() - millisANT2 >= TiempoUpdate && Tiempo <= 1687.5) {
    millisANT2 = millis();
    multiplicador = multiplicador * 1.2;

    if (multiplicador >= 1.3) {
      Tiempo = Tiempo * 0.8;
    }
  }

  background(backgroundImg);

  if (showDuck == true) {

    image(
      QR,
      800,
      -QR.height * 0.32 + floatProgramer2 * 280,
      QR.width * 0.32,
      QR.height * 0.32
    );

    if (millis() >= 8000 && millis() <= 9500) {
      floatProgramer = sin(map(millis(), 8000, 9500, -90, 90));
    }

    if (millis() >= 18000 && millis() <= 19500) {
      floatProgramer = sin(map(millis(), 18000, 19500, 90, -90));
    }

    if (millis() >= 10000 && millis() <= 11500) {
      floatProgramer2 = sin(map(millis(), 10000, 11500, -90, 90));
    }

    if (millis() >= 20000 && millis() <= 21500) {
      floatProgramer2 = sin(map(millis(), 17000, 18500, 90, -90));
    }

    if (millis() >= 10500 && millis() <= 11500) {
      Opacity = map(millis(), 10500, 11500, 255, 0);
    }

    if (millis() >= 16000 && millis() <= 17500) {
      Opacity = map(millis(), 16000, 17500, 0,255);
    }

    if (Opacity < 250) {
      image(
        Duckprogramer2,
        70,
        -Duckprogramer.height * 0.24 + floatProgramer * 280,
        Duckprogramer2.width * 0.24,
        Duckprogramer2.height * 0.24
      );
    }
    
    push();
    
      noStroke();
    
    fill(1, 152, 203, Opacity);
    
    rect(70, -Duckprogramer.height * 0.24 + floatProgramer * 280, 70 + Duckprogramer2.width * 0.24, -Duckprogramer.height * 0.24 + floatProgramer * 280 + Duckprogramer2.height * 0.25);
    
    pop();
        image(
      Duckprogramer,
      70,
      -Duckprogramer.height * 0.24 + floatProgramer * 280,
      Duckprogramer.width * 0.24,
      Duckprogramer.height * 0.24
    );

  }

  if (millis() - millisANT >= Tiempo) {
    millisANT = millis();
    pipes.push(new Pipe());
    playing = true;
  }

  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    if (pipes[i].offScreen()) {
      if (pipes[i].pass(bird)) {
        bird.score++;
      }
      pipes.splice(i, 1);
    }
    if (pipes[i].hit(bird)) {
      strokeWeight(8);
      rectMode(CENTER);
      fill(255);
      rect(width / 2, height / 2, width - 500, 140, 30);
      fill(0);
      push();
      textFont(FuturisticFont);
      textSize(60);
      text("Record: " + bird.score, width / 2, height / 2);

      if (millisRecord <= 0) {
        dead.play();

        millisRecord = millis();
      }

      if (millisRecord > 0 && millis() - millisRecord < 4000) {
        music.setVolume(map(millis() - millisRecord, 0, 4000, 1, 0));
      }

      if (millis() - millisRecord >= 8000) {
        window.location.reload();
      }

      pop();
      playing = false;
    }
  }

  bird.show();
  bird.update();

  if (playing) {
    push();
    textFont(FuturisticFont);
    textSize(80);
    text(bird.score, width / 2, height / 5);
    pop();
  }
  if (pipes.length - 1 < 1) {
    
    push();
    stroke(0);
    strokeWeight(5);
    text("Vamos mantén la altura", width / 2, height / 3);    
    pop();
    
  }
}

function drawLine() {
  let step = 100;
  stroke(1);
  for (let i = 0; i < height / step; i++) {
    line(0, i * step, width, i * step);
  }
}

function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs);
}

class Pipe {
  constructor() {
    this.x = width;
    this.w = 100;
    this.gap = 120;
    this.min_height = 80;
    this.max_height = height - this.min_height - this.gap;
    this.top = floor(random(this.min_height, this.max_height));
    this.speed = 3;
  }

  show() {
    if (playing == true) {
      if (Tiempo <= 2250 && Tiempo > 1700) {
        image(
          pipe2green,
          this.x,
          this.top - pipe2green.height * 0.49,
          this.w,
          pipe2green.height * 0.49
        );
        let height_b = height - this.gap - this.top;
        image(
          pipe1green,
          this.x,
          this.gap + this.top,
          this.w,
          pipe1green.height * 0.49
        );
      } else if (Tiempo <= 1700 && multiplicador < 1.3) {
        image(
          pipe2yellow,
          this.x,
          this.top - pipe2yellow.height * 0.49,
          this.w,
          pipe2yellow.height * 0.49
        );
        let height_b = height - this.gap - this.top;
        image(
          pipe1yellow,
          this.x,
          this.gap + this.top,
          this.w,
          pipe1yellow.height * 0.49
        );
      } else if (Tiempo <= 1700 && multiplicador >= 1.3) {
        image(
          pipe2red,
          this.x,
          this.top - pipe2red.height * 0.49,
          this.w,
          pipe2red.height * 0.49
        );
        let height_b = height - this.gap - this.top;
        image(
          pipe1red,
          this.x,
          this.gap + this.top,
          this.w,
          pipe1red.height * 0.49
        );
      } else {
        image(
          pipe2white,
          this.x,
          this.top - pipe2white.height * 0.49,
          this.w,
          pipe2white.height * 0.49
        );
        let height_b = height - this.gap - this.top;
        image(
          pipe1white,
          this.x,
          this.gap + this.top,
          this.w,
          pipe1white.height * 0.49
        );
      }
    } else {
      if (r === 255 && g < 255 && b === 0) {
        g += 5; // Transition from red to yellow
      } else if (g === 255 && r > 0 && b === 0) {
        r -= 5; // Transition from yellow to green
      } else if (g === 255 && b < 255 && r === 0) {
        b += 5; // Transition from green to cyan
      } else if (b === 255 && g > 0 && r === 0) {
        g -= 5; // Transition from cyan to blue
      } else if (b === 255 && r < 255 && g === 0) {
        r += 5; // Transition from blue to purple
      } else if (r === 255 && b > 0 && g === 0) {
        b -= 5; // Transition from purple back to red
      }

      push();

      tint(r, g, b);

      image(
        pipe2white,
        this.x,
        this.top - pipe2white.height * 0.49,
        this.w,
        pipe2white.height * 0.49
      );
      let height_b = height - this.gap - this.top;
      image(
        pipe1white,
        this.x,
        this.gap + this.top,
        this.w,
        pipe1white.height * 0.49
      );

      pop();
    }
  }

  offScreen() {
    return this.x + this.w + this.speed < 0;
  }

  hit(bird) {
    return (
      bird.x + 20 > this.x &&
      bird.x < this.x + this.w &&
      (bird.y - 20 < this.top || bird.y + 20 > this.top + this.gap)
    );
  }

  pass(bird) {
    return bird.x > this.x + this.w;
  }

  update() {
    if (playing == true) {
      this.x -= this.speed * multiplicador;
    }
  }
}
