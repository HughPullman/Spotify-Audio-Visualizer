import React from 'react'
import './AudioVisualizer.scss';
import {Canvas} from "@react-three/fiber";
import Scene from '../Scene/Scene';

const AudioVisualizer = () => {
  return (
    <div className='audiovisualizer'>
      <Canvas camera={
       { 
        fov:45,
        near: 0.1,
        far:300,
        position: [0,4,-4]
      }
      }>
        <Scene></Scene>
      </Canvas>
    </div>
  )
}

export default AudioVisualizer