import React from 'react'
import _regl from 'regl/dist/regl.min'
import { mouseChange, mouseWheelChange } from '../utils/mouse'
import { getMatrix } from '../utils/texture-matrix'
import { TweenLite, TimelineLite, Power3, Back } from 'gsap'
import vectorizeText from 'vectorize-text'

const mouse = mouseChange()
const mousewheel = mouseWheelChange()
export const scene = { x: 0, displace: 0, offsetX: 0, props: [] }

const timeline = new TimelineLite({ paused: true })
TweenLite.defaultEase = Power3.easeInOut

const imagePromise = src => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      reject(image)
    }
  })
}

class Carousel extends React.Component {
  buffers = []
  meshes = []

  constructor(props) {
    super(props)
    scene.props = props.images.map((d, i) => ({ scale: 0.35, alpha: 1, offsetY: 0 }))
  }

  componentDidMount() {
    const images = this.props.images.map(img => imagePromise(img.url))
    Promise.all(images).then(images => {
      this.renderGl(images)
    })
  }

  componentWillUnmount() {
    this.meshes.forEach(m => {
      m.texture.destroy()
    })
    this.regl.destroy()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      TweenLite.to(scene, 1.0, {
        x: nextProps.index,
        ease: Power3.easeInOut,
      }).play()
      timeline
        .to(scene, 0.5, {
          displace: nextProps.index > this.props.index ? 6 : -6,
          ease: Power3.easeIn,
        })
        .to(scene, 0.5, {
          displace: 0,
          ease: Power3.easeOut,
        })
        .play()
    }

    if (
      nextProps.selectedIndex !== undefined &&
      nextProps.selectedIndex !== this.props.selectedIndex
    ) {
      TweenLite.to(
        scene.props.filter((s, i) => i !== nextProps.selectedIndex),
        1.0,
        {
          scale: 0,
          offsetY: 0,
          alpha: 0,
        }
      ).play()
      TweenLite.to(scene.props[nextProps.selectedIndex], 0.5, {
        scale: 0.75,
        offsetY: 0.25,
        alpha: 1,
      }).play()
      timeline
        .to(scene, 0.25, {
          displace: 12,
          ease: Power3.easeIn,
        })
        .to(scene, 0.75, {
          displace: 0,
          ease: Power3.easeOut,
        })
        .play()
      scene.x = nextProps.selectedIndex
      // TweenLite.to(scene, 1.5, {
      //   x: nextProps.selectedIndex,
      //   ease: Power3.easeInOut,
      // }).play()
    }

    if (
      nextProps.selectedIndex === undefined &&
      this.props.selectedIndex !== undefined
    ) {
      TweenLite.to(scene.props, 1.0, {
        scale: 0.35,
        alpha: 1,
        offsetY: 0,
      }).play()
      timeline
        .to(scene, 0.5, {
          displace: 12,
          ease: Power3.easeIn,
        })
        .to(scene, 0.25, {
          displace: 0,
          ease: Power3.easeOut,
        })
        .play()
      scene.x = this.props.index
    }
  }

  renderGl = images => {
    const regl = (this.regl = _regl({
      pixelRatio: 1,
    }))
    const meshes = images.map(img => ({
      texture: regl.texture(img),
      textMesh: vectorizeText('Intellitower', {
        textAlign: 'center',
        textBaseline: 'top',
        triangles: true,
        font: 'Helvetica',
        fontWeight: 800,
      }),
    }))
    const feedBackTexture = regl.texture({
      copy: true,
      min: 'linear',
      mag: 'linear',
    })

    const drawFeedback = regl({
      frag: `
      precision mediump float;
      uniform sampler2D tInput;
      varying vec2 uv;
      void main () {
        vec2 warp = uv + sin(t) * vec2(0.5 - uv.y, uv.x - 0.5)
        - 0.01 * (uv - 0.5);
        vec3 color = texture2D(tInput, warp).rgb;
        gl_FragColor = vec4(color.r, 1.0, color.b, 0.5);
        // gl_FragColor = vec4(texture2D(tInput, warp).rgb, 0.2);
      }
      `,

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
        tInput: feedBackTexture,
        t: ({ tick }) => 0.001 * tick,
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
      vert:`
        precision mediump float;
        attribute vec2 position;
        uniform vec2 u_offset;
        uniform float u_pan;
        varying vec2 vUv;

        void main() {
          vec2 pos = vec2((position.x * 0.1) + (u_offset.x * 0.9) - u_pan * 0.9, -position.y * 0.15);
          gl_Position = vec4(pos, 0, 1);
          vUv = pos;
        }
      `,
      frag:`
      precision mediump float;
      varying vec2 vUv;

      void main() {
        gl_FragColor = vec4(vec3(1.0, 0.5, 0.1), 1.0);
      }  
      `,
      attributes: {
        position: regl.prop('position'),
      },

      elements: regl.prop('elements'),

      uniforms: {
        u_offset: regl.prop('u_offset'),
        u_pan: regl.prop('u_pan'),
      },

      depth: {
        enable: false,
        // mask: false, // DONT write to depth buffer!
      },
    })
    const drawImg = regl({
      vert: `
      precision mediump float;
      attribute vec2 position;
      uniform mat4 matrix;
      varying vec2 uv;
      void main () {
        uv = position.xy * .5 + .5;
        // float dist = sin(uv.y * 3.14 + t * 0.1) * 0.02;
        vec2 pos = vec2(position.x, position.y);
        gl_Position = matrix * vec4(vec2(pos.x, pos.y), 0, 1);
        // gl_Position = matrix * vec4(position, 0, 1);
      }`,
      frag: `
        precision mediump float;
        uniform sampler2D texture;
        uniform vec2 resolution;
        uniform float t;
        uniform vec2 mouse;
        uniform float u_fade;
        uniform float u_speed;
        uniform float mousewheel;
        uniform float u_noise;
        uniform float u_alpha;
        uniform float u_displacement;
        varying vec2 uv;
        varying float v_rand;

        float cubicPulse( float c, float w, float x ){
          x = abs(x - c);
          if( x > w ) return 0.0;
          x /= w;
          return 1.0 - x * x * (3.0 - 2.0 * x);
        }

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
          vec2 st = gl_FragCoord.xy / resolution.xy;
          float y = uv.y;
          // float dist = perlin(st, 4.0) * 0.125;
          float dist = sin(y * 3.14 + t * 0.1) * 0.02;
          float fade = 1.0;
          float map = distance(st, vec2(0.7));
          vec2 mouseOffset = vec2(mouse.x * u_speed, 0);
          vec2 displaced = vec2(uv.x + mouseOffset.x + dist * u_displacement * uv.x, uv.y + mouseOffset.y);
          vec4 color = texture2D(texture, displaced);
          // float rectangle = step(uv.x, 0.9);
          gl_FragColor = vec4(color.rgb, u_alpha);
          // gl_FragColor = vec4(color.rgb, map);
        }`,
      attributes: {
        position: [-1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1],
      },

      uniforms: {
        texture: regl.prop('texture'),
        matrix: regl.prop('matrix'),
        u_displacement: regl.prop('u_displacement'),
        u_noise: regl.prop('u_noise'),
        u_speed: regl.prop('u_speed'),
        u_alpha: regl.prop('u_alpha'),
        t: ({ tick }) => tick,
        u_fade: () => {
          return 1.0
        },
        resolution: ({ drawingBufferHeight, drawingBufferWidth }) => {
          return [drawingBufferWidth, drawingBufferHeight]
        },
        mouse: ({ pixelRatio, viewportHeight, viewportWidth }) => {
          let x = 0.5 + Math.abs(mouse.x / window.innerWidth) - 1.0
          requestAnimationFrame(() => {
            TweenLite.to(scene, 0.1, {
              offsetX: x,
            }).play()
          })
          return [scene.offsetX, 0]
        },
        mousewheel: () => {
          return 0
        },
      },
      depth: {
        enable: false,
        mask: false, // DONT write to depth buffer!
      },
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'src color',
          dstAlpha: 1,
        },
        equation: {
          rgb: 'add',
          alpha: 'add',
        },
      },
      count: 6,
    })

    regl.frame(({ time, ...props }) => {
      regl.clear({
        color: [0, 0, 0, 0],
        depth: 1,
      })
      // drawFeedback()
      drawImg(
        meshes.map((mesh, i) => {
          const meshProps = scene.props[i]
          return {
            texture: mesh.texture,
            u_text: mesh.text,
            u_speed: 0.1,
            u_displacement: scene.displace,
            u_alpha: meshProps.alpha,
            u_noise: 4.0,
            matrix: getMatrix({
              image: images[i],
              width: this.canvas.clientWidth,
              height: this.canvas.clientHeight,
              offset: [i, meshProps.offsetY],
              scale: meshProps.scale,
              pan: scene.x,
              panSpeed: 1,
              mode: 'contain',
            }),
          }
        })
      )

      // drawText(
      //   meshes.map((mesh,i) => {
      //     return {
      //       position: mesh.textMesh.positions,
      //       elements: mesh.textMesh.cells,
      //       u_offset: [i, 0],
      //       u_pan: scene.x,
      //     }
      //   })
      // )

      // feedBackTexture({
      //   copy: true,
      //   min: 'linear',
      //   mag: 'linear',
      // })
    })
  }

  render() {
    return (
      <canvas
        className="fixed bottom-0 left-0"
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={el => (this.canvas = el)}
      />
    )
  }
}

export default Carousel
