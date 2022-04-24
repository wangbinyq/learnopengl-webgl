const canvas = document.getElementById('canvas') as HTMLCanvasElement
const HEIGHT = canvas.height
const WIDTH = canvas.width


const gl = canvas.getContext('webgl2')
gl.viewport(0, 0, WIDTH, HEIGHT)

gl.clearColor(0.2, 0.3, 0.3, 1)
gl.clear(gl.COLOR_BUFFER_BIT)