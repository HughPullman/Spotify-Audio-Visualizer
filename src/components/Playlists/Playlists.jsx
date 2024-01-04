import React, { useCallback, useState } from 'react';
import './Playlists.scss';
import Spotify from '../../apis/Spotify';

const Playlists = (props) => {
    
  return (
    <div className='playlists'>
        <div className="playlistTitle">
            <span>Playlists</span>
        </div>
        {props.playlists.map((playlist) =>{
            return(
                <div className="playlistSelector" key={playlist.id} onClick={()=> props.getPlaylist(playlist.id, playlist.playlistUri)}>
                    <div className="icon">
                        <img src={playlist.img} alt="" />
                    </div>
                    <div className="text">
                        <span className='title'>{playlist.name}</span>
                        <span className='songs'>{playlist.tracks} Songs</span>
                    </div>
                </div>
                )
            })}
    </div>
  )
}

export default Playlists