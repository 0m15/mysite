import React from 'react'
import _regl from 'regl/dist/regl.min'
import vectorizeText from 'vectorize-text'
import springController from '../utils/spring'
import mat4 from 'gl-mat4'
import perspective from 'gl-mat4/perspective'
import lookAt from 'gl-mat4/lookAt'
import vec3 from 'gl-vec3'

const fadeSpring = springController()
const mouseSpringX = springController()
const mouseSpringY = springController()
const projectionMatrix = new Float32Array(16)
const viewMatrix = lookAt([], [0, 0, 1], [0, 0, 0], [0, 1, 0])

const mouse = (function() {
  let x = 0
  let y = 0
  let prevX = 0
  let prevY = 0
  let dy = 0
  let dx = 0
  let evt = {}
  let resetTimeout
  const onmousemove = evt => {
    clearTimeout(resetTimeout)

    x = evt.clientX
    y = evt.clientY
    mouseSpringX.to = x
    mouseSpringY.to = y

    if (prevY !== 0) {
      dy = Math.abs(y - prevY)
    }

    if (prevX !== 0) {
      dx = Math.abs(x - prevX)
    }

    resetTimeout = setTimeout(() => {
      dy = 0
      dx = 0
    }, 250)

    evt = evt
    prevX = x
    prevY = y
  }

  if (typeof document !== 'undefined')
    document.addEventListener('mousemove', onmousemove, { passive: true })

  let result = {}

  Object.defineProperties(result, {
    x: {
      get: function() {
        return x
      },
      enumerable: true,
    },
    y: {
      get: function() {
        return y
      },
      enumerable: true,
    },
    dx: {
      get: function() {
        return dx
      },
      enumerable: true,
    },
    dy: {
      get: function() {
        return dy
      },
      enumerable: true,
    },
  })

  return result
})()

const mousewheel = (function() {
  let dx = 0
  let dy = 0

  const onwheel = evt => {
    dx = evt.deltaX
    dy = evt.deltaY > 0 ? evt.deltaY - 1 : evt.deltaY + 1
    evt = evt
  }

  if (typeof document !== 'undefined')
    document.addEventListener('wheel', onwheel, { passive: true })

  let result = {}

  Object.defineProperties(result, {
    dx: {
      get: function() {
        return dx
      },
      enumerable: true,
    },
    dy: {
      get: function() {
        return dy
      },
      enumerable: true,
    },
  })

  return result
})()

const createMeshes = slots => {
  const width = 5.0
  return slots.map((text, index) => {
    const mesh = vectorizeText(text, {
      textAlign: 'center',
      textBaseline: 'top',
      triangles: true,
      font: 'Helvetica',
      fontWeight: 800,
      size: 320,
    })

    return {
      id: text,
      mesh,
      offset: [index * width, 0],
      elements: mesh.cells,
      position: mesh.positions,
      index,
    }
  })
}

const getOffset = (slot, slots) => {
  const vel = 0.95
  const height = 1.1
  const maxOffset = slots.length * height
  //const dy = 0.5 + Math.abs(mouse.y / window.innerHeight) - 1.0
  const dy = (mouseSpringY.current / window.innerHeight) * vel
  let slotX = slot.offset[0]
  let offsetY = slot.offset[1]
  let offsetX = 0

  if (slotX < -0.99) {
    offsetX = maxOffset + dy
    // offsetX = 0.45 * slot.index * 2
  } else if (slotX >= maxOffset - 1) {
    offsetX = -maxOffset + dy
  } else {
    offsetX = dy
  }

  slot.offset = [slotX + offsetX, offsetY]
  // slot.offset = [0, 0]
  return slot.offset
}

// Below is a slightly modified version of this code:
// https://github.com/substack/ray-triangle-intersection
// It does intersection between ray and triangle.
// With the original version, we had no way of accessing 't'
// But we really needed that value.
function intersectTriangle(out, pt, dir, tri) {
  var EPSILON = 0.000001
  var edge1 = [0, 0, 0]
  var edge2 = [0, 0, 0]
  var tvec = [0, 0, 0]
  var pvec = [0, 0, 0]
  var qvec = [0, 0, 0]

  vec3.subtract(edge1, tri[1], tri[0])
  vec3.subtract(edge2, tri[2], tri[0])

  vec3.cross(pvec, dir, edge2)
  var det = vec3.dot(edge1, pvec)

  if (det < EPSILON) return null
  vec3.subtract(tvec, pt, tri[0])
  var u = vec3.dot(tvec, pvec)
  if (u < 0 || u > det) return null
  vec3.cross(qvec, tvec, edge1)
  var v = vec3.dot(dir, qvec)
  if (v < 0 || u + v > det) return null
  var t = vec3.dot(edge2, qvec) / det
  out[0] = pt[0] + t * dir[0]
  out[1] = pt[1] + t * dir[1]
  out[2] = pt[2] + t * dir[2]
  return t
}

class Menu extends React.Component {
  slots = []
  componentDidMount() {
    this.renderGl()
    document.addEventListener('mousedown', this.onMouseDown, { passive: true })
  }

  onMouseDown = () => {
    var vp = mat4.multiply([], projectionMatrix, viewMatrix)
    var invVp = mat4.invert([], vp)

    // get a single point on the camera ray.
    var rayPoint = vec3.transformMat4(
      [],
      [
        (2.0 * mouse.x) / window.innerWidth - 1.0,
        (2.0 * mouse.y) / window.innerHeight - 1.0,
        0,
      ],
      invVp
    )

    // get the position of the camera.
    var rayOrigin = vec3.transformMat4(
      [],
      [0, 0, 0],
      mat4.invert([], viewMatrix)
    )

    var rayDir = vec3.normalize([], vec3.subtract([], rayPoint, rayOrigin))

    // now we iterate through all meshes, and find the closest mesh that intersects the camera ray.
    var minT = 10000000.0

    for (var i = 0; i < this.slots.length; i++) {
      var m = this.slots[i]
      var modelMatrix = mat4.identity([])
      mat4.translate(modelMatrix, modelMatrix, [
        m.offset[0],
        m.offset[1] - 2,
        1,
      ])

      // draw two big triangles covering the entire mesh
      // get the bounds
      const xMin = Math.min(...m.position.map(d => d[0]))
      const yMin = Math.min(...m.position.map(d => d[1]))
      const xMax = Math.max(...m.position.map(d => d[0]))
      const yMax = Math.max(...m.position.map(d => d[1]))

      // build the triangles
      const triA = [
        vec3.transformMat4([], [xMax, yMax, 1], modelMatrix),
        vec3.transformMat4([], [xMin, yMax, 1], modelMatrix),
        vec3.transformMat4([], [xMin, yMin, 1], modelMatrix),
      ]
      const triB = [
        vec3.transformMat4([], [xMin, yMin, 1], modelMatrix),
        vec3.transformMat4([], [xMax, yMin, 1], modelMatrix),
        vec3.transformMat4([], [xMax, yMax, 1], modelMatrix),
      ]

      var res = []
      var t = intersectTriangle(res, rayPoint, rayDir, triA)

      if (t === null) {
        t = intersectTriangle(res, rayPoint, rayDir, triB)
      }

      if (t !== null) {
        if (t < minT) {
          // mesh was closer than any object thus far.
          // for the time being, make it the selected object.
          console.info('picked', m.id)
          minT = t
          break
        }
      }
    }
  }

  renderGl = (img1, img2, imgMap, depthMap) => {
    const regl = _regl({
      pixelRatio: 1,
      // canvas: this.canvas,
      extensions: ['OES_standard_derivatives'],
    })

    const feedBackTexture = regl.texture({
      copy: true,
      min: 'linear',
      mag: 'linear',
    })

    const drawFeedback = regl({
      frag: `
      precision mediump float;
      uniform sampler2D texture;
      uniform vec2 mouseVel;
      uniform vec2 mouse;
      uniform float t;
      varying vec2 uv;
      #define M_PI 3.14159265358979323846

      float rand(vec2 co){return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);}
      float rand (vec2 co, float l) {return rand(vec2(rand(co), l));}
      float rand (vec2 co, float l, float t) {return rand(vec2(rand(co, l), t));}

      float perlin(vec2 p, float dim, float time) {
        vec2 pos = floor(p * dim);
        vec2 posx = pos + vec2(1.0, 0.0);
        vec2 posy = pos + vec2(0.0, 1.0);
        vec2 posxy = pos + vec2(1.0);
        
        float c = rand(pos, dim, time);
        float cx = rand(posx, dim, time);
        float cy = rand(posy, dim, time);
        float cxy = rand(posxy, dim, time);
        
        vec2 d = fract(p * dim);
        d = -0.5 * cos(d * M_PI) + 0.5;
        
        float ccx = mix(c, cx, d.x);
        float cycxy = mix(cy, cxy, d.x);
        float center = mix(ccx, cycxy, d.y);
        
        return center * 2.0 - 1.0;
      }

      // p must be normalized!
      float perlin(vec2 p, float dim) {
        
        /*vec2 pos = floor(p * dim);
        vec2 posx = pos + vec2(1.0, 0.0);
        vec2 posy = pos + vec2(0.0, 1.0);
        vec2 posxy = pos + vec2(1.0);
        
        // For exclusively black/white noise
        /*float c = step(rand(pos, dim), 0.5);
        float cx = step(rand(posx, dim), 0.5);
        float cy = step(rand(posy, dim), 0.5);
        float cxy = step(rand(posxy, dim), 0.5);*/
        
        /*float c = rand(pos, dim);
        float cx = rand(posx, dim);
        float cy = rand(posy, dim);
        float cxy = rand(posxy, dim);
        
        vec2 d = fract(p * dim);
        d = -0.5 * cos(d * M_PI) + 0.5;
        
        float ccx = mix(c, cx, d.x);
        float cycxy = mix(cy, cxy, d.x);
        float center = mix(ccx, cycxy, d.y);
          
        return center * 2.0 - 1.0;*/
          return perlin(p, dim, 0.0);
        }
      void main () {
        float i = length(uv - vec2(0.5, 0.3));
        vec2 warp = uv + perlin(uv, 4.0) * 0.01 * sin(uv.x*10.0) * cos(uv.y * 10.0) * vec2(0.1 - uv.x, uv.x - 0.1)
      - 0.01 * (uv - 0.1);
        vec2 c = uv;
        // vec2 warp = vec2(uv.x, uv.y + perlin(uv, 3.0) * sin(t) * 0.01);
        vec3 color = texture2D(texture, warp - mouse * 0.001).rgb;
        gl_FragColor = vec4(color, 0.9);
        // gl_FragColor = vec4(texture2D(texture, warp).rgb, 0.2);
      }`,

      vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
        uv = position;
        gl_Position = vec4(2.0 * position - 1.0, 0, 1);
      }`,

      attributes: {
        position: [-2, 0, 0, -2, 2, 2],
      },

      uniforms: {
        texture: feedBackTexture,
        t: ({ tick }) => 0.001 * tick,
        mouseVel: ({ viewportHeight }) => {
          return [mousewheel.dx, mouseSpringY.current * 0.1]
        },
        mouse: ({ viewportHeight, viewportWidth }) => {
          const x = -0.5 + (mouseSpringX.current / window.innerWidth)
          const y = -0.5 + mouseSpringY.current / window.innerHeight
          return [
            x,
            -y,
          ]
        },
      },

      depth: { enable: false },

      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1,
        },
        equation: {
          rgb: 'add',
          alpha: 'add',
        },
      },

      count: 3,
    })

    const drawText = regl({
      vert: `
      attribute vec2 position;
      uniform vec2 resolution;
      uniform vec2 mouse;
      uniform float t;
      uniform vec2 offset;
      varying vec2 vUv;
      varying float vTime;
      uniform mat4 projection, view;

      #define M_PI 3.14159265358979323846

      float rand(vec2 co){return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);}
      float rand (vec2 co, float l) {return rand(vec2(rand(co), l));}
      float rand (vec2 co, float l, float t) {return rand(vec2(rand(co, l), t));}

      float perlin(vec2 p, float dim, float time) {
        vec2 pos = floor(p * dim);
        vec2 posx = pos + vec2(1.0, 0.0);
        vec2 posy = pos + vec2(0.0, 1.0);
        vec2 posxy = pos + vec2(1.0);
        
        float c = rand(pos, dim, time);
        float cx = rand(posx, dim, time);
        float cy = rand(posy, dim, time);
        float cxy = rand(posxy, dim, time);
        
        vec2 d = fract(p * dim);
        d = -0.5 * cos(d * M_PI) + 0.5;
        
        float ccx = mix(c, cx, d.x);
        float cycxy = mix(cy, cxy, d.x);
        float center = mix(ccx, cycxy, d.y);
        
        return center * 2.0 - 1.0;
      }

      // p must be normalized!
      float perlin(vec2 p, float dim) {
        
        /*vec2 pos = floor(p * dim);
        vec2 posx = pos + vec2(1.0, 0.0);
        vec2 posy = pos + vec2(0.0, 1.0);
        vec2 posxy = pos + vec2(1.0);
        
        // For exclusively black/white noise
        /*float c = step(rand(pos, dim), 0.5);
        float cx = step(rand(posx, dim), 0.5);
        float cy = step(rand(posy, dim), 0.5);
        float cxy = step(rand(posxy, dim), 0.5);*/
        
        /*float c = rand(pos, dim);
        float cx = rand(posx, dim);
        float cy = rand(posy, dim);
        float cxy = rand(posxy, dim);
        
        vec2 d = fract(p * dim);
        d = -0.5 * cos(d * M_PI) + 0.5;
        
        float ccx = mix(c, cx, d.x);
        float cycxy = mix(cy, cxy, d.x);
        float center = mix(ccx, cycxy, d.y);
        
        return center * 2.0 - 1.0;*/
          return perlin(p, dim, 0.0);
        }

      vec2 noise (vec2 st) {
        float x = position.x;
        float amplitude = 1.;
        float frequency = 1.;
        float y = sin(x * frequency);
        float t = 0.01*(-t*130.0);
        y += sin(x*frequency*2.1 + t)*4.5;
        y += sin(x*frequency*1.72 + t*1.121)*4.0;
        y += sin(x*frequency*2.221 + t*0.437)*5.0;
        y += sin(x*frequency*3.1122+ t*4.269)*2.5;
        y *= amplitude*0.003;
        return vec2(st.x, st.y + y); 
      }

      void main () {
        float aspect = resolution.x / resolution.y;
        vec2 scale = vec2(0.45, 0.45);
        vec2 scroll = vec2(offset.x, offset.y);
        vec2 warp = position + perlin(position, 3.0) * sin(t * .1) * 0.05;
        vec2 pos = vec2(warp.x, -warp.y) + scroll;
        // gl_Position = projection * vec4(pos, 0, 1);
        gl_Position = projection * view * vec4(pos * scale, 0, 1);
        vUv = pos;
        vTime = t;
      }`,

      frag: `
      precision mediump float;
      varying vec2 vUv;
      varying float vTime;

      float cubicPulse( float c, float w, float x ){
        x = abs(x - c);
        if( x > w ) return 0.0;
        x /= w;
        return 1.0 - x * x * (3.0 - 2.0 * x);
      }

      void main () {
        // float c = smoothstep(0.1, 0.9, vUv.y) + smoothstep(0.5, 0.01, vUv.y);
        float c = 1.0 - cubicPulse(0.0, 1.0, vUv.y);
        gl_FragColor = vec4(vec3(c, c, c), c + 1.0);
        // gl_FragColor = vec4(0.5, 0.0, 0.5, 0);
        // gl_FragColor = vec4(vec3(0.1, 0.1, 0.1), 0.1);
      }`,

      attributes: {
        position: regl.prop('position'),
      },

      elements: regl.prop('elements'),

      uniforms: {
        projection: ({ viewportWidth, viewportHeight }) =>
          perspective(
            projectionMatrix,
            Math.PI / 3,
            viewportWidth / viewportHeight,
            0.01,
            1000
          ),
        view: ({ tick }) => {
          return viewMatrix
        },
        t: ({ tick }) => 0.01 * tick,
        resolution: ({ viewportHeight, viewportWidth }) => {
          return [viewportWidth, viewportHeight]
        },
        mouse: ({ pixelRatio, viewportHeight, viewportWidth }) => {
          const x = 0.5 + Math.abs(mouse.x / window.innerWidth) - 1.0
          const y = 0.5 + Math.abs(mouse.y / window.innerHeight) - 1.0
          // mouseSpringX.to = x
          // mouseSpringY.to = y
          return [x, y]
        },
        mouseVel: ({ viewportHeight }) => {
          return [mousewheel.dx, mouseSpringY.current * 0.1]
        },
        offset: regl.prop('offset'),
      },

      cull: {
        enable: true,
        face: 'front',
      },

      depth: {
        enable: true,
        mask: false, // DONT write to depth buffer!
      },
    })

    

    const slots = (this.slots = createMeshes(['Hello']))

    regl.frame(({ time }) => {
      regl.clear({
        color: [0, 0, 0, 1],
        depth: 1,
      })
      drawFeedback()
      
      slots.forEach(slot => {
        drawText({
          offset: slot.offset,
          elements: slot.elements,
          position: slot.position,
        })
      })
      
      feedBackTexture({
        copy: true,
        min: 'linear',
        mag: 'linear',
      })
    })
  }

  render() {
    return null
  }
}

export default Menu
