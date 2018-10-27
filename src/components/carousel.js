import React from 'react'
import _regl from 'regl/dist/regl.min'
import { mouseChange, mouseWheelChange } from '../utils/mouse'
import { getMatrix } from '../utils/texture-matrix'
import { TweenLite, TimelineLite, Power2, Back } from 'gsap'

const mouse = mouseChange()
const mousewheel = mouseWheelChange()
export const pan = { x: 0, displace: 0, offsetX: 0 }

const timeline  = new TimelineLite({ paused: true })
TweenLite.defaultEase = Power2.easeInOut

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

class ImageFilter extends React.Component {
  buffers = []
  textures = []
  componentDidMount() {
    const images = this.props.images.map(img => imagePromise(img))
    Promise.all(images).then(images => {
      this.renderGl(images)
    })
  }

  componentWillUnmount() {
    this.textures.forEach(t => {
      t.destroy()
    })
    this.regl.destroy()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      TweenLite.to(pan, 2.5, {
        x: nextProps.index,
        ease: Back.easeInOut,
      }).play()
      timeline.to(pan, 0.75, {
        displace: nextProps.index > this.props.index ? 10 : -10,
        ease: Back.easeIn,
      })
      .to(pan, 0.75, {
        displace: 0,
        ease: Back.easeOut,
      }).play()
    }
  }
  
  renderGl = (images) => {
    const regl = (this.regl = _regl({
      canvas: this.canvas,
      pixelRatio: 1,
    }))
    const textures = images.map(img => regl.texture(img))
    const feedBackTexture = regl.texture({
      copy: true,
      min: 'linear',
      mag: 'linear',
    })

    const drawFeedback = regl({
      frag: `
      precision mediump float;
      uniform sampler2D texture;
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
        vec2 warp = uv + perlin(uv, 1.0) * sin(t) * vec2(0.5 - uv.y, uv.x - 0.5)
      - 0.01 * (uv - 0.5);
        // vec2 warp = uv + perlin(uv, 3.0) * cos(uv.x * 0.02) * 0.05;
        vec3 color = texture2D(texture, warp).rgb;
        gl_FragColor = vec4(color.b, color.g, color.r, 0.25);
        // gl_FragColor = vec4(texture2D(texture, warp).rgb, 1.0);
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
    const drawImg = regl({
      vert: `
        precision mediump float;
        attribute vec2 position;
        uniform mat4 matrix;
        varying vec2 uv;

        void main () {
          uv = position.xy * .5 + .5;
          vec2 pan = vec2(position.x, position.y);
          gl_Position = matrix * vec4(pan, 0, 1);
          // gl_Position = matrix * vec4(position, 0, 1);
        }`,
      frag: `
        precision mediump float;
        uniform sampler2D texture;
        uniform vec2 resolution;
        uniform float t;
        uniform vec2 mouse;
        uniform vec3 u_color;
        uniform float u_fade;
        uniform float u_delay;
        uniform float u_speed;
        uniform float u_displacement;
        uniform float mousewheel;
        uniform float u_noise;
        uniform float u_grain;
        uniform float u_wind;
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
          float dist = perlin(st, 22.0) * sin(st.x * 34.1248974 + t * 0.02) * 0.025;
          //float fade = u_fade - u_delay + clamp(t * 0.01, -u_delay, u_delay);
          float fade = 1.0;
          vec2 mouseOffset = vec2(mouse.x * u_speed, 0);
          float n = perlin(uv, u_noise);
          float map = cubicPulse(0.0, fade, n);
          float wind = u_wind * 10.0;
          vec2 displaced = vec2(uv.x + mouseOffset.x, (fade - 1.0) + uv.y + mouseOffset.y + dist * (1.0 - map) * u_displacement);
          vec4 color = texture2D(texture, displaced);
          // float rectangle = step(uv.y, 0.2);
          gl_FragColor = vec4(color.rgb, color.a);
        }`,
      attributes: {
        position: [-1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1],
      },

      uniforms: {
        texture: regl.prop('texture'),
        matrix: regl.prop('matrix'),
        u_displacement: regl.prop('u_displacement'),
        u_noise: regl.prop('u_noise'),
        u_grain: regl.prop('u_grain'),
        u_speed: regl.prop('u_speed'),
        u_delay: regl.prop('u_delay'),
        u_color: regl.prop('u_color'),
        u_wind: () => {
          // ((Input - InputLow) / (InputHigh - InputLow)) * (OutputHigh - OutputLow) + OutputLow;
          return 1.0
        },
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
            TweenLite.to(pan, 0.1, {
              offsetX: x,
            }).play()
          })
          return [pan.offsetX, 0]
        },
        mousewheel: () => {
          return mousewheel.dy
        },
      },
      depth: {
        enable: false,
      },
      // blend: {
      //   enable: true,
      //   func: {
      //     srcRGB: 'src alpha',
      //     srcAlpha: 1,
      //     dstRGB: 'src color',
      //     dstAlpha: 1,
      //   },
      //   equation: {
      //     rgb: 'add',
      //     alpha: 'add',
      //   },
      // },
      count: 6,
    })

    regl.frame(({ time, ...props }) => {
      regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
      })
      drawFeedback()
      drawImg([
        {
          texture: textures[0],
          u_speed: 0.1,
          matrix: getMatrix({
            image: images[0],
            width: this.canvas.clientWidth,
            height: this.canvas.clientHeight,
            offset: [-0.0, -0.0],
            scale: 0.35,
            pan: pan.x,
            panSpeed: 1,
            mode: 'contain',
          }),
          u_displacement: pan.displace,
          u_grain: 0.3,
          u_noise: 4.0,
          u_delay: 0.4,
          u_color: [0.1, 0.1, 0.1],
        },
        {
          texture: textures[1],
          u_speed: 0.1,
          matrix: getMatrix({
            image: images[1],
            width: this.canvas.clientWidth,
            height: this.canvas.clientHeight,
            offset: [1.0, -0.0],
            scale: 0.35,
            pan: pan.x,
            panSpeed: 1,
          }),
          u_displacement: pan.displace,
          u_grain: 0.8,
          u_noise: 3.0,
          u_delay: 0.15,
          u_color: [0.1, 0.1, 0.1],
        },
        {
          texture: textures[2],
          u_speed: 0.1,
          matrix: getMatrix({
            image: images[2],
            width: this.canvas.clientWidth,
            height: this.canvas.clientHeight,
            offset: [2.0, -0.0],
            scale: 0.35,
            pan: pan.x,
            panSpeed: 1,
            mode: 'contain',
          }),
          u_displacement: pan.displace,
          u_grain: 2.0,
          u_noise: 8.0,
          u_delay: 0.9,
          u_color: [1.0, 0.5, 0.1],
        },
        {
          texture: textures[3],
          u_speed: 0.1,
          matrix: getMatrix({
            image: images[3],
            width: this.canvas.clientWidth,
            height: this.canvas.clientHeight,
            offset: [3.0, -0.0],
            scale: 0.35,
            pan: pan.x,
            panSpeed: 1,
            mode: 'contain',
          }),
          u_displacement: pan.displace,
          u_grain: 2.0,
          u_noise: 8.0,
          u_delay: 0.9,
          u_color: [1.0, 0.5, 0.1],
        },
      ])
      feedBackTexture({
        copy: true,
        min: 'linear',
        mag: 'linear',
      })
    })
  }

  render() {
    return (
      <canvas
        className="fixed bottom-0 left-0"
        width={1200}
        height={1000}
        style={{
          width: '100%',
          height: '100%',
          zIndex: 9999,
        }}
        ref={el => (this.canvas = el)}
      />
    )
  }
}

export default ImageFilter
