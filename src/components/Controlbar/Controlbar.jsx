import React, { useEffect, useState } from 'react'
import './Controlbar.scss'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Slider } from '@mui/material';
import Spotify from '../../apis/Spotify';

const Controlbar = (props) => {

    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState('off');
    const [play, setPlay] = useState(false);
    const [volume, setVolume] = useState(51);
    const [songDuration, setSongDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [repeatCount, setRepeatCount] = useState(0);
    const [repeatNo, setRepeatNo] = useState(false);

    useEffect(() =>{
        setSongDuration(props.current.duration);
        setPosition(props.current.progress);
        setPlay(props.current.isPlaying);
    }, [props])

    useEffect(() =>{
        setTimeout(() =>{
            setRepeat(props.playbackState.repeat);
            setShuffle(props.playbackState.shuffle);
        }, 3000)
    },[])

    useEffect(() =>{
        setTimeout(()=>{
            Spotify.setPlayVolume(volume);
        },300)
    },[volume]);

    const volumeChange = (event, newVolume) =>{
        setVolume(newVolume);
    }

    const repeatChange = () =>{
        if(repeatCount < 2){
            setRepeatCount(repeatCount + 1);
        } else{
            setRepeatCount(0)
        }
        switch(repeatCount){
            case 0:
                setRepeat('off')
                break;
            case 1:
                setRepeat('context')
                break;
            case 2:
                setRepeat('track')
                break;
            default:
                setRepeat('off')
        }

        Spotify.setRepeatMode(repeat);
    }

    useEffect(() =>{
        if(!shuffle){
            document.getElementById("shuffleBtn").style.color = 'var(--first-color)';
        } else{
            document.getElementById("shuffleBtn").style.color = 'var(--fourth-color)';
        }

        if(repeat === 'context'){
            document.getElementById("repeatBtn").style.color = 'var(--fourth-color)';
            setRepeatNo(false);
        } else if(repeat ==='track'){
            document.getElementById("repeatBtn").style.color = 'var(--first-color)';
            setRepeatNo(false);
        } else{
            document.getElementById("repeatBtn").style.color = 'var(--first-color)';
            setRepeatNo(true);
        }

    },[repeat, shuffle])

    const changePosition = (value) =>{
        setPosition(value);
        Spotify.seekPosition(value);
    }

    const toggleShuffle = () =>{
        if(shuffle === true){
            setShuffle(false)
        } else{
            setShuffle(true)
        }
        Spotify.toggleShuffle(shuffle);
    }

    const changePlayback = () =>{
        if(play){
            Spotify.pausePlayback();
        } else{
            Spotify.resumePlayback();
        }
    }

    function formatDuration(value) {
        const minute = Math.floor(value / 60000);
        const seconds = ((value % 60000)/1000).toFixed(0);
        return (
            seconds == 60 ?
            (minute+1) + ":00" :
            minute + ":" + (seconds < 10 ? "0" : "") + seconds
          );
      }

  return (
    <div className='controlbar'>
        <div className="volume">
                {volume < 50 ? <VolumeDownIcon className='iconVolume'></VolumeDownIcon> : <VolumeUpIcon className='iconVolume'></VolumeUpIcon>}
                <Slider  aria-label="Volume"  defaultValue={50} value={volume} onChange={volumeChange} className='volumeSlider'></Slider>
            </div>
        <div className="top">
            <div className="shuffle">
                <button onClick={() => toggleShuffle()}><ShuffleIcon  id="shuffleBtn" className='iconSmall'></ShuffleIcon></button>
            </div>
            <div className="rewind">
                <button><SkipPreviousIcon className='iconLarge' onClick={()=> Spotify.previousSong()}></SkipPreviousIcon></button>
            </div>
            <div className="play">
                <button onClick={() => changePlayback()}>{play ? <PauseCircleIcon className='iconLarge'></PauseCircleIcon> :<PlayCircleIcon className='iconLarge'></PlayCircleIcon>}</button>
            </div>
            <div className="skip">
                <button><SkipNextIcon className='iconLarge' onClick={()=> Spotify.nextSong()}></SkipNextIcon></button>
            </div>
            <div className="repeat">
                <button onClick={() => repeatChange()}><RepeatIcon  id="repeatBtn" className='iconSmall'></RepeatIcon>{repeatNo ? <span className='repeatOne'>1</span> : <></>}</button>
            </div>
        </div>
        <div className="bottom">
            <span className='times'>{formatDuration(position)}</span>
            <Slider aria-label="time-indicator" size='small' min={0} step={1} max={songDuration} value={position} onChange={(_,value) => changePosition(value)} className='musicSlider'></Slider>
            <span className='times'>- {formatDuration(songDuration - position)}</span>
        </div>
        
    </div>
  )
}

export default Controlbar