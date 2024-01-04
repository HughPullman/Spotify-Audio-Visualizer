import React, {useEffect} from 'react'
import './SearchResults.scss'
import CloseIcon from '@mui/icons-material/Close';
import Spotify from '../../apis/Spotify';

const SearchResults = (props) => {

    useEffect(() =>{
        props.open ? document.getElementById("searchResults").style.display = 'flex' : document.getElementById("searchResults").style.display = 'none';
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
    <div className='searchResults' id='searchResults'>
        <div className="searchTitle">
            <span>Tracks</span>
            <CloseIcon className='close' onClick={()=> props.close()}></CloseIcon>
        </div>
        {props.searchResults.map((track) =>{
            return (
                <div className="songSelector" key={track.id} onClick={()=> Spotify.playSelectedSong(track.uri)}>
                    <div className="icon">
                        <img src={track.img} alt="" />
                    </div>
                    <div className="text">
                        <span className='title'>{track.name}</span>
                        <span className='artist'>{track.artist}</span>
                    </div>
                    <div className="time">
                        <span>{formatDuration(track.duration)}</span>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default SearchResults