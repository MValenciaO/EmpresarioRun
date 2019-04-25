let pista;
let velocidadObs;
let empresario = []
const empresarioImagenArreglo = []
let cact1
let cact2
let empresarioImg
let emprs
let score
let scoreAnt
let obstaculos = []
let obstaculosArriba = []
let ladronGrande
let empre
let bg
let helicoptero
let size
const parallaxBg = []
function preload(){
	bg = loadImage('image/fondo.png')
	ladronGrande = loadImage('image/ratero.png')
	helicoptero = loadImage('image/helicoptero.png')
}

function setup() {
	size = 30
  	createCanvas(windowWidth, windowHeight);
	for(let i = 0; i <2; i++){
		parallaxBg.push(new parallaxs(bg, i*width, 0, width, height))
	}
	
 	textAlign(CENTER);

  	pista = height - 40;

	score = 0
	scoreAnt = 0
	velocidadObs = 6;
	for(let i = 0 ; i < 41; i++){

		empresarioImg = loadImage(`image/run_0${i}.png`) 
		empresario.push(empresarioImg)
	}
	
  textSize(50);

	empre = new dino(empresario, size * 2, height - pista, 60, 60);
	empresarioImagenArreglo.push(empre)
}

function draw() {
  	background('white')


	drawCarreteraScore()

	controlNivel(frameCount)

	empre.modificar(pista)
	moves()
	Obs()

	/*if(score>100){
		 //var element = document.getElement('#todo');
		 document.getElementById("todo").style.filter="invert(100%)";
		 //element.setAttribute('style','filter: invert(100%)')
  			
	}*/
	
}

function drawCarreteraScore() {

	for(let p of parallaxBg){
		p.draw()
		p.move()
	}

  	text("Score: " + score, width * .5, 67);

	for(let p of empresarioImagenArreglo){
		p.draw();
	}
	
}
function Obs(){
	for(let ob of obstaculos){
		ob.modificar(velocidadObs)
		ob.draw()

		if (ob.hit(empre)){
			finDelJuego()
			scoreAnt == score
		}


	}
	for(let v of obstaculosArriba){
		v.modificar(velocidadObs)
		v.draw()

		if (v.hit(empre)) 
			finDelJuego()

	}
}

function controlNivel(n) {

  if (n % 70 == 0) { 

    var n = random(n)

    if (n > 2)
      createNewObstaculo()

	  if (n % 120 == 0) 
	    velocidadObs *= 1
  }

	score++
}

function createNewObstaculo() {

	let size = random(30) + 20;
	let sizeD = random(150, 200)
  	let obs = new obstaculo(ladronGrande, width + size, pista - 80, 90, 80, size)
  	let obsUp = new volador(helicoptero, width - 200, pista - sizeD, 90, 40, size)
  	obstaculos.push(obs);


  	if (score >= 700)
  		obstaculosArriba.push(obsUp)
 
  	console.log("score"+score)
}

function moves() {

		if (keyIsDown(32) && empre.heart)
			empre.jump(.35)		
}

function finDelJuego() {

	noLoop();
  	noStroke();
  	textSize(150);
  	text("G A M E  O V E R", width * .5, height * .5);

}