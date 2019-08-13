import { init, GameLoop, Sprite } from 'kontra'

const { canvas, context } = init()

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function fillCircle (x, y, radius, color) {
  context.fillStyle = color
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.fill()
}

function strokeCircle (x, y, radius, color) {
  context.strokeStyle = color
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.stroke()
}

const palette = [
/* eslint-disable no-multi-spaces */
  '#020',     // 0
  '#f00',     // 1
  '#ffd700',  // 2
  '#333',     // 3
  '#444',     // 4
  '#555',     // 5
  '#666',     // 6
  '#777',     // 7
  '#8b4513',  // 8
  '#999',     // 9
  '#a52a2a',  // a
  '#b0c4de',  // b
  '#ccc',     // c
  '#d2b48c',  // d
  '#9e9',     // e
  '#0e0'      // f
/* eslint-enable no-multi-spaces */
]

const paletteEntries = []

const radius = () => (canvas.height < canvas.width
  ? canvas.height / palette.length
  : canvas.width / palette.length) / 2

palette.forEach((color, index) => {
  paletteEntries.push(Sprite({
    color,
    width: radius() * 2,
    x: radius() + index * (radius() * 2),
    y: radius(),

    render () {
      fillCircle(this.x, this.y, this.width / 2, this.color)
      strokeCircle(this.x, this.y, this.width / 2, '#fff')
    }
  }))
})

const currentColor = Sprite({
  color: palette[0],
  width: radius() * 2,
  x: radius() + (palette.length + 1) * (radius() * 2),
  y: radius(),

  render () {
    fillCircle(this.x, this.y, this.width / 2, this.color)
    strokeCircle(this.x, this.y, this.width / 2, '#fff')
  }
})

canvas.addEventListener('click', ({ pageX, pageY }) => {
  const index = Math.floor(pageX / (radius * 2))

  window.alert(index)
  if (index < palette.length && pageY < radius() * 2) {
    currentColor.color = palette[index]
  }
}, false)

const loop = GameLoop({
  update () {
    // ...
  },

  render () {
    context.fillStyle = palette[0]
    context.fillRect(0, 0, canvas.width, canvas.height)

    paletteEntries.forEach(paletteEntry => {
      paletteEntry.render()
    })

    currentColor.render()
  }
})

loop.start()
