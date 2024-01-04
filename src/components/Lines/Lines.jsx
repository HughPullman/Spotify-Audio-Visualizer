import { Center} from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import Line from '../Line/Line';


const Lines = () => {
    const linesRef = useRef(null);

    const linesCount = useMemo(() => 50, []);
    const linesList = useMemo(() => [... new Array(linesCount)], [linesCount]);

  return (
    <Center>
        <group ref={linesRef}>
            {linesList.map((_, index) => {
                return(
                    <Line index={index}/>
                )
            })}
        </group>
    </Center>
  )
}

export default Lines