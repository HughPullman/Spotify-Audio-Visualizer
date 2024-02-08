import React from 'react'
import './Scene.scss'
import {OrbitControls} from "@react-three/drei";
import Lines from '../Lines/Lines';
import Sphere from '../Sphere/Sphere';

const Scene = (props) => {
  return (
    <>
        <OrbitControls />
        {/* <Lines analysis={props.analysis} progress={props.progress}/> */}
        <Sphere analysis={props.analysis} progress={props.progress}/>
        
    </>
  )
}

export default Scene