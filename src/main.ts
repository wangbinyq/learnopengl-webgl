import vertexShaderSource from './shaders/vertex.glsl'
import fragShaderSource from './shaders/fragment.glsl'

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const HEIGHT = canvas.height
const WIDTH = canvas.width


const gl = canvas.getContext('webgl2', { antialias: true })!
gl.viewport(0, 0, WIDTH, HEIGHT)



const vertexShader = gl.createShader(gl.VERTEX_SHADER)!
gl.shaderSource(vertexShader, vertexShaderSource)
gl.compileShader(vertexShader)

let msg = gl.getShaderInfoLog(vertexShader)
if (msg) {
  console.error(msg)
}

const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!
gl.shaderSource(fragShader, fragShaderSource)
gl.compileShader(fragShader)

msg = gl.getShaderInfoLog(fragShader)
if (msg) {
  console.error(msg)
}

const shaderProgram = gl.createProgram()!
gl.attachShader(shaderProgram, vertexShader)
gl.attachShader(shaderProgram, fragShader)
gl.linkProgram(shaderProgram)
msg = gl.getProgramInfoLog(shaderProgram)
if (msg) {
  console.error(msg)
}

gl.deleteShader(vertexShader)
gl.deleteShader(fragShader)

const vertices = Float32Array.from([
  -0.5, -0.5, 0,
  0.5, -0.5, 0,
  0, 0.5, 0,
])

const vao = gl.createVertexArray()!
const vbo = gl.createBuffer()!
gl.bindVertexArray(vao)
gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0)
gl.enableVertexAttribArray(0)
gl.bindBuffer(gl.ARRAY_BUFFER, null)
gl.bindVertexArray(null)

function render(time: number) {
  gl.clearColor(0.2, 0.3, 0.3, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.useProgram(shaderProgram)
  gl.bindVertexArray(vao)
  gl.drawArrays(gl.TRIANGLES, 0, 3)

  requestAnimationFrame(render)
}

render(0)