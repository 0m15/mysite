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
} from '../utils/choreography'

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
    
    const preload = async () => {
      const loaded = []
      let i = 0;
      for (const img of images) {
        const image = await loadImage(img.url, (loaded, total) => {
          this.props.onPreloadProgress(i, images.length)
          i++
        })
        loaded.push(image)
      }
      return loaded
    }    
    
    preload().then((loaded) => {
      console.log('loaded', loaded)
      this.renderGl(loaded)

      if (this.props.selectedIndex !== undefined) {
        openProject({
          index: this.props.selectedIndex,
        })
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
      closeProject()
    }
  }

  renderGl = images => {
    const regl = (this.regl = _regl({
      pixelRatio: 1,
    }))
    const meshes = images.map(img => ({
      texture: regl.texture({
        data: img,
      }),
    }))

    const feedBackTexture = regl.texture({
      copy: true,
      min: 'linear',
      mag: 'linear',
    })

    const drawFeedback = regl({
      frag: `
      precision lowp float;
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
      precision lowp float;
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
      vert: `
        precision lowp float;
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
      frag: `
      precision lowp float;
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
      precision lowp float;
      attribute vec2 position;
      uniform mat4 matrix;
      varying vec2 uv;

      float barrelPower = 1.1;
      
      vec4 distort(vec4 p) {
        vec2 v = p.xy * p.w;
        // Convert to polar coords:
        float radius = length(v);
        
        if (radius > 0.0) {
          float theta = atan(v.y, v.x);
          
          // Distort:
          radius = pow(radius, barrelPower);

          // Convert back to Cartesian:
          v.x = radius * cos(theta);
          v.y = radius * sin(theta);
          p.xy = v.xy * 1.0;
        }
        return p;
      }

      void main () {
        uv = position.xy * .5 + .5;
        // float dist = sin(uv.y * 3.14 + t * 0.1) * 0.02;
        vec2 pos = vec2(position.x, position.y);
        gl_Position = distort(matrix * vec4(pos, 0, 1));
        // gl_Position = matrix * vec4(position, 0, 1);
      }`,
      frag: `
        precision lowp float;
        uniform sampler2D texture;
        uniform vec2 resolution;
        uniform float t;
        uniform float mousewheel;
        uniform float u_noise;
        uniform float u_alpha;
        uniform float u_displacement;
        uniform float u_displacementY;
        uniform vec2 mouse;
        uniform float u_speed;  
        varying vec2 uv;
        varying float v_rand;

        float cubicPulse( float c, float w, float x ){
          x = abs(x - c);
          if( x > w ) return 0.0;
          x /= w;
          return 1.0 - x * x * (3.0 - 2.0 * x);
        }

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
          float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );
          ret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);
        
          return pow( ret, vec4(1.0/2.2) );
        }

        vec4 barrel_blur() {
          // vec2 uv=(gl_FragCoord.xy/resolution.xy*.5)+.25;
          vec4 a1=texture2D(texture, barrelDistortion(uv,0.0));
          vec4 a2=texture2D(texture, barrelDistortion(uv,0.2));
          vec4 a3=texture2D(texture, barrelDistortion(uv,0.4));
          vec4 a4=texture2D(texture, barrelDistortion(uv,0.6));
          
          vec4 a5=texture2D(texture, barrelDistortion(uv,0.8));
          vec4 a6=texture2D(texture, barrelDistortion(uv,1.0));
          vec4 a7=texture2D(texture, barrelDistortion(uv,1.2));
          vec4 a8=texture2D(texture, barrelDistortion(uv,1.4));
          
          vec4 a9=texture2D(texture, barrelDistortion(uv,1.6));
          vec4 a10=texture2D(texture, barrelDistortion(uv,1.8));
          vec4 a11=texture2D(texture, barrelDistortion(uv,2.0));
          vec4 a12=texture2D(texture, barrelDistortion(uv,2.2));

          vec4 tx=(a1+a2+a3+a4+a5+a6+a7+a8+a9+a10+a11+a12)/12.;
          return tx;
        }
        
        vec2 mouseOffset = vec2(mouse.x, mouse.y);

        const float max_distort = 0.125;
        const int num_iter = 8;
        const float reci_num_iter_f = 1.0 / float(num_iter);

        void main () {
          vec4 sumcol = vec4(0.0);
          vec4 sumw = vec4(0.0);	
          for ( int i=0; i<num_iter;++i )
          {
            float tt = float(i) * reci_num_iter_f;
            vec4 w = spectrum_offset( tt );
            sumw += w;
            sumcol += w * texture2D( texture, barrelDistortion(barrelDistortion(uv, u_displacementY * 0.1), .6 * max_distort * tt * u_displacementY ) );
          }
          
          // vec4 blur = barrelBlur();
          gl_FragColor = vec4((sumcol / sumw).rgb, u_alpha);
        }`,
      attributes: {
        position: [-1, 1, 1, 1, -1, -1, 1, 1, 1, -1, -1, -1],
      },

      uniforms: {
        texture: regl.prop('texture'),
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
            TweenMax.to(sliderState, 1, {
              mouseX: x,
              mouseY: y,
              ease: Back.easeOut,
            }).play()
          })
          return [sliderState.mouseX, sliderState.mouseY]
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
        color: [0, 0, 0, 0],
        depth: 1,
      })
      // drawFeedback()
      drawImg(
        meshes.map((mesh, i) => {
          const meshProps = sliderState.props[i]
          return {
            texture: mesh.texture,
            u_text: mesh.text,
            u_speed: 0.1,
            u_displacement: sliderState.displace,
            u_displacementY: sliderState.displaceY,
            u_alpha: meshProps.alpha,
            u_noise: 4.0,
            matrix: getMatrix({
              image: images[i],
              width: window.innerWidth,
              height: window.innerHeight,
              offset: [i, meshProps.offsetY],
              scale: meshProps.scale,
              pan: sliderState.x,
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
      //       u_pan: sliderState.x,
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
