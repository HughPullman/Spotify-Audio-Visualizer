import React from 'react'
import './AlbumCover.scss'

const AlbumCover = (props) => {
  return (
    <div className='albumCover'>
        <div className="top">
            <div className="image">
                <img src={props.current.img} alt="" />
            </div>
        </div>
        <div className="bottom">
            <div className="song">
                <span>{props.current.title}</span>
            </div>
            <div className="artist">
                <span>{props.current.artist}</span>
            </div>
            <div className="album">
                <span>{props.current.album}</span>
            </div>
        </div>
    </div>
  )
}

export default AlbumCover