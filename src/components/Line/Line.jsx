import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from "three";

const lineGeometry = new THREE.BoxGeometry(5, 0.03, 0.02, 128, 1 , 1);

const Line = (props) => {
    const materialRef = useRef(null);

    const uniforms = useMemo(() =>{
        return{
            uOffset: {value: props.index * 11},
            uTime: {value: 0},
            uAmp: {value: 0.001}
        };
    }, [props.index])


    useEffect(() =>{
        materialRef.current.uniforms.uAmp.value = props.amplitudeBeat;
    }, [props.amplitudeBeat])


  return (
    <group>  
        <mesh position-z={-props.index * 0.15} geometry={lineGeometry}>
            <shaderMaterial
                ref={materialRef}
                vertexShader={`
                vec4 mod289(vec4 x)
                {
                return x - floor(x * (1.0 / 289.0)) * 289.0;
                }
        
                vec4 permute(vec4 x)
                {
                return mod289(((x*34.0)+10.0)*x);
                }
        
                vec4 taylorInvSqrt(vec4 r)
                {
                return 1.79284291400159 - 0.85373472095314 * r;
                }
        
                vec2 fade(vec2 t) {
                return t*t*t*(t*(t*6.0-15.0)+10.0);
                }
        
                // Classic Perlin noise
                float cnoise(vec2 P)
                {
                vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
                vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
                Pi = mod289(Pi); // To avoid truncation effects in permutation
                vec4 ix = Pi.xzxz;
                vec4 iy = Pi.yyww;
                vec4 fx = Pf.xzxz;
                vec4 fy = Pf.yyww;
        
                vec4 i = permute(permute(ix) + iy);
        
                vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
                vec4 gy = abs(gx) - 0.5 ;
                vec4 tx = floor(gx + 0.5);
                gx = gx - tx;
        
                vec2 g00 = vec2(gx.x,gy.x);
                vec2 g10 = vec2(gx.y,gy.y);
                vec2 g01 = vec2(gx.z,gy.z);
                vec2 g11 = vec2(gx.w,gy.w);
        
                vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
                g00 *= norm.x;  
                g01 *= norm.y;  
                g10 *= norm.z;  
                g11 *= norm.w;  
        
                float n00 = dot(g00, vec2(fx.x, fy.x));
                float n10 = dot(g10, vec2(fx.y, fy.y));
                float n01 = dot(g01, vec2(fx.z, fy.z));
                float n11 = dot(g11, vec2(fx.w, fy.w));
        
                vec2 fade_xy = fade(Pf.xy);
                vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
                float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
                return 2.3 * n_xy;
                }
        
                // Classic Perlin noise, periodic variant
                float pnoise(vec2 P, vec2 rep)
                {
                vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
                vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
                Pi = mod(Pi, rep.xyxy); // To create noise with explicit period
                Pi = mod289(Pi);        // To avoid truncation effects in permutation
                vec4 ix = Pi.xzxz;
                vec4 iy = Pi.yyww;
                vec4 fx = Pf.xzxz;
                vec4 fy = Pf.yyww;
        
                vec4 i = permute(permute(ix) + iy);
        
                vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
                vec4 gy = abs(gx) - 0.5 ;
                vec4 tx = floor(gx + 0.5);
                gx = gx - tx;
        
                vec2 g00 = vec2(gx.x,gy.x);
                vec2 g10 = vec2(gx.y,gy.y);
                vec2 g01 = vec2(gx.z,gy.z);
                vec2 g11 = vec2(gx.w,gy.w);
        
                vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
                g00 *= norm.x;  
                g01 *= norm.y;  
                g10 *= norm.z;  
                g11 *= norm.w;  
        
                float n00 = dot(g00, vec2(fx.x, fy.x));
                float n10 = dot(g10, vec2(fx.y, fy.y));
                float n01 = dot(g01, vec2(fx.z, fy.z));
                float n11 = dot(g11, vec2(fx.w, fy.w));
        
                vec2 fade_xy = fade(Pf.xy);
                vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
                float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
                return 2.3 * n_xy;
                }
        
                uniform float uOffset;
                uniform float uTime;
                uniform float uAmp;
                
                void main(){
                    vec3 pos = position;
                
                    float flatnessAmplitude = pow(1.0 - abs(uv.x - 0.5) * 2.0, 2.5);
                
                    pos.y += cnoise(vec2(pos.x + uOffset, uTime) * 1.0) * 0.018;
                    pos.y += pow(cnoise(vec2(pos.x + uOffset, uTime * 0.5) * 2.5) + 1.0, 1.2) * 0.1 * flatnessAmplitude;
                    pos.y += pow(cnoise(vec2(pos.x + uOffset, uTime * 0.15) * 2.5) + 1.0, 1.2) * uAmp * flatnessAmplitude;
                
                    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
                }
                `}
                fragmentShader={`
                    void main(){
                        float brightness = 0.95;
                        vec3 color = vec3(0.114,0.725,0.329) * brightness;
                        gl_FragColor = vec4(color, 1.0);
                    }
                `}
                uniforms={uniforms}
            />
        </mesh>
    </group>
  )
}

export default Line