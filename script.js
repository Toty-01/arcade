const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const background = new Image();
background.src = "./img/stars.png";

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    }

    this.rotation = 0

    const image = new Image()
    image.src = './img/spaces.png'
    image.onload = () => {
      const scale = 0.15
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }
    }
  }

  draw() {
  
   c.save()
   c.translate(
    player.position.x + player.width / 2, 
    player.position.y + player.height / 2
    )
   c.rotate(this.rotation)

   c.translate(
    -player.position.x - player.width / 2, 
    -player.position.y - player.height / 2
    )

   c.drawImage(
      this.image, 
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height
    )
    c.restore()
  }

  update() {  
   if (this.image) {
    this.draw()
    this.position.x += this.velocity.x
    }
  }
}

class Projectile {
  constructor({position, velocity}) {
    this.position = position
    this.velocity = velocity
    this.radius = 4
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle ='blue'
    c.fill()
    c.closePath()
  }


  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}
class Invader {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = './img/invader.png'
    image.onload = () => {
      const scale = 1
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height / 2
      }
    }
  }

  draw() {
   // c.fillStyle = 'red'
   // c.fillRect(this.position.x, this.position.y, this.width, this.height)
  
   
   c.drawImage(
      this.image, 
      this.position.x, 
      this.position.y, 
      this.width, 
      this.height
    )
  }

  update() {  
   if (this.image) {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    }
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }

    this.velocity = {
      x: 0,
      y: 0
    }

    this.invaders = [new Invader()]
  }

  update() {}
}

const player = new Player()
const projectiles = []
const grids = [new Grid()]

const keys = {
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  space: {
    pressed: false
  }
}

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
    } else {
      projectile.update()
    }
  })


  
  if (keys.ArrowLeft.pressed && player.position.x >= 0) {
    player.velocity.x = -5
    player.rotation = -0.15
   } else if (keys.ArrowRight.pressed && player.position.x + player.width <= canvas.width) {
    player.velocity.x = +5
    player.rotation = 0.15
  } else {
    player.velocity.x = 0
    player.rotation = 0
  }
}

animate()

window.addEventListener('keydown', ({ key }) => {
   switch (key) {
      case 'ArrowLeft':
        player.velocity.x = -5
        keys.ArrowLeft.pressed = true
        break
      case 'ArrowRight':
        player.velocity.x = +5
        keys.ArrowRight.pressed = true
        break
      case ' ':
        projectiles.push(new Projectile({
          position: {
            x: player.position.x + player.width /2,
            y: player.position.y
          },
          velocity: {
            x: 0,
            y: -5
          }
        }))
        break
   }
})

window.addEventListener('keyup', ({ key }) => {
  switch (key) {
     case 'ArrowLeft':
       player.velocity.x = -5
       keys.ArrowLeft.pressed = false
       break
     case 'ArrowRight':
       player.velocity.x = +5
       keys.ArrowRight.pressed = false
       break
     case ' ':
       keys.space.pressed = false
       break
  }
})