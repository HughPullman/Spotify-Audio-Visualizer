import React, { useState } from 'react'
import './AudioVisualizer.scss';
import {Canvas} from "@react-three/fiber";
import Scene from '../Scene/Scene';

const AudioVisualizer = (props) => {
  const [scene, setScene] = useState(0);

  return (
    <div className='audiovisualizer'>
      {/* <button onClick={() => setScene(0)} className='lineBtn'>Lines</button>
      <button onClick={() => setScene(1)} className='sphereBtn'>Sphere</button> */}
      <Canvas camera={
       { 
        fov:45,
        near: 1,
        far:3000,
        position: [0,4,-12],
      }
      }>
        <Scene analysis={props.analysis} progress={props.progress} scene={scene}></Scene>
      </Canvas>
    </div>
  )
}

export default AudioVisualizer