class dino{
	constructor (img, x, y, w, h) {
	this.img    = img
	this.x      = x
	this.y      = y
	this.w      = w
	this.h      = h
	this.index  = 0
	this.speedY = 0
	this.speed  = 1
	this.heart = true
	this.gravedad = 0.29
}
	draw() {

		image(this.img[floor(this.index) % 41], this.x, this.y, this.w, this.h)
		this.index += this.speed
	}

	jump(gr) {

		this.speedY = -(this.w * gr) 
	}
	modificar(suelo) {

	let touch = this.y + this.w // píxel inferior del perro
	let calcularDown = touch + this.speedY

  if (touch <= suelo && calcularDown >= suelo) { 

		this.speedY = 0 //resetea la velocidad
		this.y = suelo - this.w // valida que no se pase mas alla del suelo
		this.heart = true
  } else if (suelo - touch > 1) { // en ninguna parte cerca de la plataforma

		this.speedY += this.speed// incrementa la velocidad	
		this.heart = false
  }

	//movimiento
	this.y += this.speedY
}
	
}