import React, { useMemo } from 'react'

import vertexShader from "../../shaders/vertexShader.glsl";
import fragmentShader from "../../shaders/fragmentShader.glsl";

const Line = (props) => {

    const uniforms = useMemo(() =>{
        return{
            uOffset: {value: props.index * 11},
        };
    }, [props.index])
  return (
    <>  
        <mesh position-z={-props.index * 0.15}>
            <boxGeometry args={[5, 0.025, 0.02, 32, 1 , 1]}/>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    </>
  )
}

export default Line