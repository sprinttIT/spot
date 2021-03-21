import React, { useState } from 'react'



const Song = ({liked, title, artist, album, releaseDate, song, playlist, onSongPlay, onLikeClicked, isPlaying, currentlyPlayingSong, songs}) => {
    
    return (
        <tr>
            <td className="play-pause-button">
                <button onClick={()=> {onSongPlay(playlist, song)}}> 
                    <img src={(isPlaying && (currentlyPlayingSong == title)) ? "/pause_line_icon.png" : "/play_line_icon.png"} />
                </button>
            </td>
            <td>
                <button className="like-button" onClick={()=> {onLikeClicked(song)}}>
                    <img src={liked ? "/liked.png" : "/not_liked.png"} />
                </button>
            </td>
            <td>{title}</td>
            <td>{artist}</td>
            <td>{album}</td>
            <td>{releaseDate}</td>
        </tr>
    )
}

export default Song
