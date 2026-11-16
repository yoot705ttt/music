let letters = ['A', 'B', 'C', 'D', 'E', 'F'];
let notes = [261.63, 293.66, 329.63, 349.23, 392, 440];
let colors = ['#EC7973', '#E5AD65', '#E5D57E', '#80BDA6', '#7C9ACB', '#B294D1'];
let sounds = [];
let sizes = [0, 0, 0, 0, 0, 0];
let pressed = [false, false, false, false, false, false];
let started = false;

function setup() {
  createCanvas(760, 360);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 6; i++) {
    sounds[i] = new p5.Oscillator(notes[i], 'sine');
    sounds[i].amp(0);
  }
}

function draw() {
  background(23, 25, 30);

  noStroke();
  fill(255);
  textSize(25);
  text('SOUND KEYBOARD', width / 2, 67);

  fill(165);
  textSize(13);
  text('Press A - F or click the keys', width / 2, 105);

  for (let i = 0; i < 6; i++) {
    let x = 117 + i * 105;

    fill(43, 47, 55);
    rect(x - 43, 150, 86, 105, 7);

    fill(colors[i]);
    circle(x, 187, 40 + sizes[i]);

    fill(255);
    textSize(18);
    text(letters[i], x, 232);

    if (sizes[i] > 0) {
      sizes[i] -= 1.5;
    }
  }
}

function playKey(i) {
  userStartAudio();

  if (!started) {
    for (let j = 0; j < 6; j++) {
      sounds[j].start();
      sounds[j].amp(0);
    }
    started = true;
  }

  sounds[i].freq(notes[i]);
  sounds[i].amp(0.18, 0.04);
  sizes[i] = 26;
  pressed[i] = true;
  console.log(letters[i]);
}

function stopKey(i) {
  if (pressed[i]) {
    sounds[i].amp(0, 0.1);
    pressed[i] = false;
  }
}

function keyPressed() {
  let i = letters.indexOf(key.toUpperCase());
  if (i !== -1 && !pressed[i]) {
    playKey(i);
  }
}

function keyReleased() {
  let i = letters.indexOf(key.toUpperCase());
  if (i !== -1) {
    stopKey(i);
  }
}

function mousePressed() {
  for (let i = 0; i < 6; i++) {
    let x = 117 + i * 105;
    if (mouseX > x - 43 && mouseX < x + 43 &&
        mouseY > 150 && mouseY < 255) {
      playKey(i);
      break;
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < 6; i++) {
    stopKey(i);
  }
}
