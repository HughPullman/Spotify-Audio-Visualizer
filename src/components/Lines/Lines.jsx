import { Center} from '@react-three/drei';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import Line from '../Line/Line';
import { useFrame } from '@react-three/fiber';
import { lerp } from 'three/src/math/MathUtils';


const Lines = (props) => {
    const linesRef = useRef(null);
    const [amplitudeBeat, setAmplitudeBeat] = useState(0.001);
    const [amplitudeTatum, setAmplitudeTatum] = useState(0.001);
    const [amplitudeSegment, setAmplitudeSegment] = useState(0.001);
    const [amplitudeSection, setAmplitudeSection] = useState(0.001);

    const linesCount = useMemo(() => 15, []);
    const linesList = useMemo(() => [... new Array(linesCount)], [linesCount]);

    const linesTatumsCount = useMemo(() => 10, []);
    const linesTatumsList = useMemo(() => [... new Array(linesTatumsCount)], [linesTatumsCount]);

    const linesSegmentCount = useMemo(() => 20, []);
    const linesSegmentList = useMemo(() => [... new Array(linesSegmentCount)], [linesSegmentCount]);

    const linesSectionCount = useMemo(() => 20, []);
    const linesSectionList = useMemo(() => [... new Array(linesSectionCount)], [linesSectionCount]);

    useFrame((state) =>{
        const time = state.clock.getElapsedTime();
        const lines = linesRef.current;
        if(!lines) return;

        lines.children.forEach((line) =>{
            line.children.forEach((lineOrPlane) =>{
                lineOrPlane.material.uniforms.uTime.value = time;
            });
        });
    });

    useEffect(() =>{
        if(!props.analysis.beats) return;
        const currentTime = props.progress/1000;
        for(let i = 0; i < props.analysis.beats.length; i ++){
            const beat = props.analysis.beats[i];
            if(beat.start >= currentTime && currentTime <= beat.start + beat.duration){
                for(let i = 0; i < 10; i++){
                    let amp = lerp(0.01, 1, i/10)
                    setTimeout(() =>{
                        setAmplitudeBeat(amp);
                    }, (beat.duration/20) *1000 * i)
                    
                }
                for(let i = 0; i < 10; i++){
                    let amp = lerp(1, 0.01, i/10)
                    setTimeout(() =>{
                        setAmplitudeBeat(amp);
                    }, ((beat.duration/20) *1000 * i) + beat.duration/2)
                    
                }
                return
            } 
        }
    }, [props.progress, props.analysis.beats])

    useEffect(() =>{
        if(!props.analysis.tatums) return;
        const currentTime = props.progress/1000;
        for(let i = 0; i < props.analysis.tatums.length; i ++){
            const tatum = props.analysis.tatums[i];
            if(tatum.start >= currentTime && currentTime <= tatum.start + tatum.duration){
                for(let i = 0; i < 10; i++){
                    let amp = lerp(0.01, 0.8, i/10)
                    setTimeout(() =>{
                        setAmplitudeTatum(amp);
                    }, (tatum.duration/20) *1000 * i )
                    
                }
                for(let i = 0; i < 10; i++){
                    let amp = lerp(0.8, 0.01, i/10)
                    setTimeout(() =>{
                        setAmplitudeTatum(amp);
                    }, ((tatum.duration/20) *1000 * i ) + tatum.duration/2)
                    
                }
                return
            } 
        }
    }, [props.progress, props.analysis.tatums])

    useEffect(() =>{
        if(!props.analysis.segments) return;
        const currentTime = props.progress/1000;
        for(let i = 0; i < props.analysis.segments.length; i ++){
            const segment = props.analysis.segments[i];
            if(segment.start >= currentTime && currentTime <= segment.start + segment.duration){
                for(let i = 0; i < 10; i++){
                    let amp = lerp(0.01, 1, i/10)
                    setTimeout(() =>{
                        setAmplitudeSegment(amp);
                    }, (segment.duration/20) *1000 * i )
                    
                }
                for(let i = 0; i < 10; i++){
                    let amp = lerp(1, 0.01, i/10)
                    setTimeout(() =>{
                        setAmplitudeSegment(amp);
                    }, ((segment.duration/20) *1000 * i) + segment.duration/2)
                    
                }
                return
            } 
        }
    }, [props.progress, props.analysis.segments])

    useEffect(() =>{
        if(!props.analysis.sections) return;
        const currentTime = props.progress/1000;
        for(let i = 0; i < props.analysis.sections.length; i ++){
            const section = props.analysis.sections[i];
            if(section.start >= currentTime && currentTime <= section.start + section.duration){
                let bps = section.tempo/60;
                for(let j = 0; j < section.duration; j += 1/bps){

                    setTimeout(() =>{
                        for(let i = 0; i < 10; i++){
                            let amp = lerp(0.01, 1/section.loudness*-10, i/10)
                            setTimeout(() =>{
                                setAmplitudeSection(amp);
                            }, (1/20 * bps) *1000 * i)
                            
                        }
                        for(let i = 0; i < 10; i++){
                            let amp = lerp(1/section.loudness*-10, 0.01, i/10)
                            setTimeout(() =>{
                                setAmplitudeSection(amp);
                            }, ((1/20* bps) *1000 * i) + ((1/20 * bps) *1000 * 10))
                            
                        }
                    }, 1000 * j);

                }
                return
            } 
        }
    }, [props.progress, props.analysis.sections])

  return (
    <Center>
        <group ref={linesRef}>
            {linesSectionList.map((_, index) => {
                return(
                    <Line index={(index)} amplitudeBeat={amplitudeSection} key={Line.key}/>
                )
            })}
            {linesSegmentList.map((_, index) => {
                return(
                    <Line index={(index + 20)} amplitudeBeat={amplitudeSegment} key={Line.key}/>
                )
            })}
            {linesList.map((_, index) => {
                return(
                    <Line index={index + 40} amplitudeBeat={amplitudeBeat} key={Line.key}/>
                )
            })}
            {linesTatumsList.map((_, index) => {
                return(
                    <Line index={(index + 55)} amplitudeBeat={amplitudeTatum} key={Line.key}/>
                )
            })}
        </group>
    </Center>
  )
}

export default Lines