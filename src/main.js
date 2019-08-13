import { init, GameLoop, Sprite } from 'kontra'

const { canvas, context } = init()

const N = 2

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

const quarterRadius = () => radius() / 4

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
  color: palette[15],
  width: radius() * 2,
  x: radius(),
  y: radius() + radius() * 2,

  render () {
    fillCircle(this.x, this.y, this.width / 2, this.color)
    strokeCircle(this.x, this.y, this.width / 2, '#fff')
  }
})

const sizes = [0.5, 1, 2, 4]

const sizeEntries = []

sizes.forEach((size, index) => {
  sizeEntries.push(Sprite({
    size,
    x: radius() + index * (radius() * 2),
    y: radius() + 2 * (radius() * 2),

    render () {
      fillCircle(this.x, this.y, size * quarterRadius(), '#fff')
      strokeCircle(this.x, this.y, radius(), '#fff')
    }
  }))
})

const currentSize = Sprite({
  size: 1,
  x: radius(),
  y: radius() + 3 * (radius() * 2),

  render () {
    fillCircle(this.x, this.y, this.size * quarterRadius(), '#fff')
    strokeCircle(this.x, this.y, radius(), '#fff')
  }
})

const grid = Sprite({
  x: radius(),
  y: radius() + 4 * (radius() * 2),

  render () {
    for (let y = 0; y < 8; ++y) {
      for (let x = 0; x < 8; ++x) {
        strokeCircle(this.x + x * ((quarterRadius() * 2) * N),
          this.y + y * ((quarterRadius() * 2) * N), quarterRadius() * 0.5,
          '#fff')
        strokeCircle(this.x + x * ((quarterRadius() * 2) * N),
          this.y + y * ((quarterRadius() * 2) * N), quarterRadius() * 1, '#fff')
        strokeCircle(this.x + x * ((quarterRadius() * 2) * N),
          this.y + y * ((quarterRadius() * 2) * N), quarterRadius() * 2, '#fff')
        strokeCircle(this.x + x * ((quarterRadius() * 2) * N),
          this.y + y * ((quarterRadius() * 2) * N), quarterRadius() * 4, '#fff')
      }
    }
  }
})

canvas.addEventListener('click', ({ pageX, pageY }) => {
  const index = Math.floor(pageX / (radius() * 2))

  if (index < palette.length && pageY < radius() * 2) {
    currentColor.color = palette[index]
  }

  if (index < sizes.length && pageY >= 2 * (radius() * 2) &&
    pageY < 3 * (radius() * 2)) {
    currentSize.size = sizes[index]
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

    sizeEntries.forEach(sizeEntry => {
      sizeEntry.render()
    })

    currentSize.render()

    grid.render()
  }
})

loop.start()
