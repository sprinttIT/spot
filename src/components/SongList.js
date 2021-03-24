import React from 'react'
import Song from './Song'
import './SongList.css';

const SongList = ({songs, playlist, onSongPlay, onLikeClicked, isPlaying, currentlyPlayingSong}) => {
    return (
        <table className="song-list-table" cellspacing="0">
            <tr>
                <th></th>
                <th></th>
                <th>TITLE</th>
                <th>ARTIST</th>
                <th>ALBUM</th>
                <th>RELEASE DATE</th>
            </tr>
            {songs.map((song) => (
                <Song key={song.id} liked={song.liked} title={song.title} artist={song.artist} album={song.album} releaseDate={song.releaseDate} song={song} playlist={playlist} onSongPlay={onSongPlay} onLikeClicked={onLikeClicked} isPlaying={isPlaying} currentlyPlayingSong={currentlyPlayingSong} songs={songs}/>
            ))}               
        </table>
    )
}

export default SongList
