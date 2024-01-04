import React, { useEffect, useState } from 'react'
import './SelectedPlaylist.scss'
import CloseIcon from '@mui/icons-material/Close';
import Spotify from '../../apis/Spotify';

const SelectedPlaylist = (props) => {


  useEffect(() =>{
    props.open ? document.getElementById("selectedPlaylist").style.display = 'flex' : document.getElementById("selectedPlaylist").style.display = 'none';
  }, [props.open])

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
    <div className='selectedPlaylist' id='selectedPlaylist'>
        <div className="maintitle">
          Your Top Songs 2023
          <CloseIcon className='close' onClick={()=> props.close()}></CloseIcon>
        </div>
        <div className="tracks">
          {props.playlist.map((song) =>{
            return(
              <div className="song" key={song.id} onClick={()=> Spotify.play(song.id)}>
                <div className="left">
                  <img src={song.img} alt="" />
                  <div className="title">
                    <span>{song.title}</span>
                    <div className="artist"><span>{song.artist}</span></div>
                  </div>
                </div>
                <div className="length">
                  {formatDuration(song.duration)}
                </div>
            </div>
            )
          })}
        </div>
    </div>
  )
}

export default SelectedPlaylist