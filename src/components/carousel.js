import React from 'react'
import _regl from 'regl/dist/regl.min'
import { TweenMax, TimelineLite, Power3, Back } from 'gsap'
import { mouseChange, mouseWheelChange } from '../utils/mouse'
import { getMatrix } from '../utils/texture-matrix'
import loadImage from '../utils/load-image'
import vectorizeText from 'vectorize-text'
import {
  state,
  slideTo,
  openProject,
  closeProject,
  setMeshProps,
  fadeInSlides,
} from '../utils/choreography'
import { getFragmentDefinition } from 'apollo-utilities'

const mouse = mouseChange()
const sliderState = state.slider
TweenMax.defaultEase = Power3.easeInOut

class Carousel extends React.Component {
  buffers = []
  meshes = []

  constructor(props) {
    super(props)
    setMeshProps(props.images)
  }

  componentDidMount() {
    const images = this.props.images // .map(img => loadImage(img.url))

    this.canvas.style.width = window.innerWidth + 'px'
    this.canvas.style.height = window.innerHeight + 'px'

    const preload = async () => {
      const loaded = []
      let i = 1
      for (const img of images) {
        const image = await loadImage(img.url)
        loaded.push(image)
        this.props.onPreloadProgress(i, images.length)
        i++
      }
      return loaded
    }

    preload().then(loaded => {
      this.renderGl(loaded)
      if (this.props.selectedIndex !== undefined) {
        openProject({
          index: this.props.selectedIndex,
          delay: 0.2,
        })
      } else {
        fadeInSlides()
      }
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
      slideTo({
        fromIndex: this.props.index,
        toIndex: nextProps.index,
      })
    }

    if (
      nextProps.selectedIndex !== undefined &&
      nextProps.selectedIndex !== this.props.selectedIndex
    ) {
      openProject({
        index: nextProps.selectedIndex,
      })
    }

    if (
      nextProps.selectedIndex === undefined &&
      this.props.selectedIndex !== undefined
    ) {
      closeProject(this.props.selectedIndex)
    }
  }

  renderGl = images => {
    const regl = (this.regl = _regl({
      pixelRatio: 1,
      // canvas: this.canvas,
    }))
    const meshes = images.map(img => ({
      texture: regl.texture({
        data: img,
        premultiplyAlpha: true,
        mag: 'linear',
        min: 'linear',
      }),
    }))

    // const feedBackTexture = regl.texture({
    //   copy: true,
    //   min: 'linear',
    //   mag: 'linear',
    // })

    // const drawFeedback = regl({
    //   frag: `
    //   precision mediump float;
    //   uniform sampler2D tInput;
    //   varying vec2 uv;

    //   vec2 barrelDistortion(vec2 coord, float amt) {
    //     vec2 cc = coord - 0.5;
    //     float dist = dot(cc, cc);
    //     return coord + cc * dist * amt;
    //   }
      
    //   float sat( float t ) {
    //     return clamp( t, 0.0, 1.0 );
    //   }
      
    //   float linterp( float t ) {
    //     return sat( 1.0 - abs( 2.0 * t - 1.0 ) );
    //   }
      
    //   float remap( float t, float a, float b ) {
    //     return sat( (t - a) / (b - a) );
    //   }
      
    //   vec4 spectrum_offset( float t ) {
    //     vec4 ret;
    //     float lo = step(t, 0.5);
    //     float hi = 1.0 - lo;
    //     float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );
    //     ret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);
      
    //     return pow( ret, vec4(1.0/2.2) );
    //   }

    //   void main () {
    //     vec2 warp = uv;
    //     vec3 color = texture2D(tInput, warp).rgb;
    //     // vec4 blurred = barrel_blur();
    //     gl_FragColor = vec4(blurred.rgb, blurred.a - 0.4); //vec4(color.r, color.g, color.b, 0.5);
    //     // gl_FragColor = vec4(texture2D(tInput, warp).rgb, 0.2);
    //   }
    //   `,

    //   vert: `
    //   precision mediump float;
    //   attribute vec2 position;
    //   varying vec2 uv;
    //   void main () {
    //     uv = position;
    //     gl_Position = vec4(2.0 * position - 1.0, 0, 1);
    //   }`,

    //   attributes: {
    //     position: [-2, 0, 0, -2, 2, 2],
    //   },

    //   uniforms: {
    //     tInput: feedBackTexture,
    //     t: ({ tick }) => 0.001 * tick,
    //   },

    //   depth: { enable: false },

    //   blend: {
    //     enable: true,
    //     func: {
    //       srcRGB: 'src alpha',
    //       srcAlpha: 1,
    //       dstRGB: 'one minus src alpha',
    //       dstAlpha: 1,
    //     },
    //     equation: {
    //       rgb: 'subtract',
    //       alpha: 'add',
    //     },
    //   },

    //   count: 3,
    // })

    const drawImg = regl({
      vert: ```
      precision mediump float;
      attribute vec2 position;
      uniform vec2 texCoords;
      uniform mat4 matrix;
      uniform vec2 mouse;
      varying vec2 uv;
      varying vec2 vTexCoords;

      float barrelPower = 1.0;
      vec2 mouseOffset = vec2(mouse.x, mouse.y);

      vec4 distort(vec4 p) {
        vec2 v = p.xy;
        // Convert to polar coords:
        float radius = length(v);
        
        if (radius > 0.0) {
          float theta = atan(v.y, v.x);
          
          // Distort:
          radius = pow(radius, barrelPower);

          // Convert back to Cartesian:
          v.x = radius * cos(theta);
          v.y = radius * sin(theta);
          p.xy = v.xy;
        }
        return p;
      }

      void main () {
        uv = position.xy * .5 + .5;
        vTexCoords = texCoords.xy * .5 + .5;
        // float dist = sin(uv.y * 3.14 + t * 0.1) * 0.02;
        vec2 pos = position;
        gl_Position = distort(matrix * vec4(pos, 0, 1));
        // gl_Position = matrix * vec4(position, 0, 1);
      }```,
      frag: `
        precision mediump float;
        uniform sampler2D texture;
        uniform vec2 resolution;
        uniform float t;
        uniform float mousewheel;
        uniform float u_alpha;
        uniform float u_displacement;
        uniform float u_displacementY;
        uniform vec2 mouse;
        uniform float u_speed;  
        varying vec2 uv;
        varying float v_rand;
        varying vec2 vTexCoords;


        // float cubicPulse( float c, float w, float x ){
        //   x = abs(x - c);
        //   if( x > w ) return 0.0;
        //   x /= w;
        //   return 1.0 - x * x * (3.0 - 2.0 * x);
        // }

        vec2 barrelDistortion(vec2 coord, float amt) {
          vec2 cc = coord - 0.5;
          float dist = dot(cc, cc);
          return coord + cc * dist * amt;
        }
        
        float sat( float t ) {
          return clamp( t, 0.0, 1.0 );
        }
        
        float linterp( float t ) {
          return sat( 1.0 - abs( 2.0 * t - 1.0 ) );
        }
        
        float remap( float t, float a, float b ) {
          return sat( (t - a) / (b - a) );
        }
        
        vec4 spectrum_offset( float t ) {
          vec4 ret;
          float lo = step(t, 0.5);
          float hi = 1.0 - lo;
          float w = linterp( remap( t, 1.0 / 100.0, 5.0 / 6.0 ) );
          ret = vec4(lo, 1.0, hi, 1.) * vec4(1.0 - w, w, 1.0-w, 1.);
        
          return pow( ret, vec4(1.0 / 2.2) );
        }

        vec2 mouseOffset = 0.5 + vec2(mouse.x, mouse.y);
        const float max_distort = 0.25;
        const int num_iter = 6;
        const float reci_num_iter_f = 1.0 / float(num_iter);

        void main () {
          vec4 sumcol = vec4(0.0);
          vec4 sumw = vec4(0.0);	
          float dist = 1.0 - length(mouseOffset - uv);
          for ( int i=0; i < num_iter; ++i )
          {
            float tt = float(i) * reci_num_iter_f;
            vec4 w = spectrum_offset( tt );
            sumw += w;
            sumcol += w * texture2D( texture, 
              barrelDistortion(vTexCoords, 0.6 * max_distort * tt * dist * (u_displacementY + 3.0))
            );
          }

          
          gl_FragColor = vec4((sumcol / sumw).rgb, u_alpha);
        }`,
      attributes: {
        position: [-1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1],
      },

      uniforms: {
        texture: regl.prop('texture'),
        texCoords: [0, 0, 0, 0.5, 1, 0.5, 1, 0.5],
        matrix: regl.prop('matrix'),
        u_displacement: regl.prop('u_displacement'),
        u_displacementY: regl.prop('u_displacementY'),
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
          let x = 0.5 - mouse.x / window.innerWidth
          let y = 0.5 - mouse.y / window.innerHeight

          requestAnimationFrame(() => {
            TweenMax.to(sliderState, 2, {
              mouseX: x,
              mouseY: y,
              ease: Power3.easeOut,
            })
          })

          return [sliderState.mouseX, sliderState.mouseY]
        },
        // mousewheel: () => {
        //   return 0
        // },
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
          dstRGB: 'one minus src color',
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
        // color: [0, 0, 0, 0],
        depth: 1,
      })
      // drawFeedback()
      drawImg(
        meshes
          // .filter((m, i) => this.props.selectedIndex !== undefined ? i === this.props.selectedIndex : true)
          .filter((m, i) => {
            if (sliderState.x < 2) {
              return i < 3
            }
            return i > sliderState.x - 2 && i < sliderState.x + 1
          })
          .map((mesh, i) => {
            let k = i
            if (i === 0 && sliderState.x >= 2) {
              k = Math.floor(sliderState.x) - 1
            }
            if (i === 1 && sliderState.x >= 2) {
              k = Math.floor(sliderState.x)
            }
            if (i === 2 && sliderState.x >= 2) {
              k = Math.floor(sliderState.x) + 1
            }
            const meshProps = sliderState.props[k]
            return {
              texture: mesh.texture,
              u_alpha: meshProps.alpha,
              u_displacement: sliderState.displace,
              u_displacementY: meshProps.displace,
              matrix: getMatrix({
                image: images[k],
                width: window.innerWidth,
                height: window.innerHeight,
                offset: [k, meshProps.offsetY],
                scale: meshProps.scale,
                pan: sliderState.x,
                panSpeed: 1,
                mode: 'contain',
              }),
            }
          })
      )
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
        className="absolute bottom-0 left-0"
        width={this.props.selectedIndex ? 1200 : 600}
        height={this.props.selectedIndex ? 650 : 325}
        ref={el => (this.canvas = el)}
      />
    )
  }
}

export default Carousel
