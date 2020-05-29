const canvas = document.querySelector('#drawer')

canvas.width = window.innerWidth * 2
canvas.height = window.innerHeight * 2

canvas.style.width = window.innerWidth + 'px'
canvas.style.height = window.innerHeight + 'px'

const context = canvas.getContext('2d')
context.scale(2, 2) // for retina-friendly canvas

// const image = document.createElement("img")
// image.src = "winmine.gif"

let aimX = null
let aimY = null
let currentX = null
let currentY = null

let i = 0
const images = [
  {src: 'image_1.jpg', width: 600, height: 400},
  {src: 'image_2.jpg', width: 600, height: 400},
  {src: 'image_3.jpg', width: 400, height: 600},
  {src: 'image_4.jpg', width: 600, height: 400}
].map(obj => {
  const image = new Image()
  image.src = obj.src
  obj.image = image
  return obj
})

document.addEventListener('mousemove', function(event) {
  aimX = event.pageX
  aimY = event.pageY
  if (currentX === null) {
    currentX = event.pageX
    currentY = event.pageY
  }
})

canvas.addEventListener('click', function() {
  i = i + 1
  if (i >= images.length) {
    i = 0
  }
})

const draw = function() {
  if (currentX) {
//     if (images[i].complete) {
      context.drawImage(
        images[i].image,
        currentX - images[i].width / 2,
        currentY - images[i].height / 2,
        images[i].width,
        images[i].height
      )

    currentX = currentX + (aimX - currentX) * 0.09
    currentY = currentY + (aimY - currentY) * 0.09
  }

  requestAnimationFrame(draw)
}

// document.getElementById('clear').addEventListener(
//   'click',
//   function() {
//     context.clearRect(0, 0, canvas.width, canvas.height)
//   },
//   false
// )

draw()