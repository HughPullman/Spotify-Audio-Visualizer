import React from 'react'
import './Scene.scss'
import {OrbitControls} from "@react-three/drei";
import Lines from '../Lines/Lines';

const Scene = () => {
  return (
    <>
        <OrbitControls/>
        
        <Lines/>
    </>
  )
}

export default Scene