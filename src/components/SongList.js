import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect} from 'react'
import Song from './Song'
import './SongList.css';

const SongList = ({songs, playlist, onSongPlay, onLikeClicked, isPlaying, currentlyPlayingSong}) => {

    const [filterText, setFilterText] = useState("")
    const [filteredSongs, setFilteredSongs] = useState(undefined)

    useEffect(() => {
        if(filterText){
            setFilteredSongs(songs.filter((song) => (
                song.title.toLowerCase().includes(filterText) | song.artist.toLowerCase().includes(filterText) | song.album.toLowerCase().includes(filterText)
            )))
        }else{
            setFilteredSongs(undefined)
        }

    }, [filterText])

    const onFilterInputChange = (e) => {
        setFilterText(e.target.value.toLowerCase())
    }

    const getSongComponent = (song) => {
        return (
            <Song key={song.id} liked={song.liked} title={song.title} artist={song.artist} album={song.album} releaseDate={song.releaseDate} song={song} playlist={playlist} onSongPlay={onSongPlay} onLikeClicked={onLikeClicked} isPlaying={isPlaying} currentlyPlayingSong={currentlyPlayingSong} songs={songs}/>
        )
    }

    return (
        <div className="song-list-table"> 
            <div className="filter-songs">
                <FontAwesomeIcon icon={faSearch} color="#646464" />
                <input type="text" placeholder="Filter" onChange={onFilterInputChange} />
            </div>
            <table cellspacing="0">
                <tr>
                    <th></th>
                    <th></th>
                    <th>TITLE</th>
                    <th>ARTIST</th>
                    <th>ALBUM</th>
                    <th>RELEASE DATE</th>
                </tr>
                {filteredSongs === undefined ? songs.map((song) => getSongComponent(song)) : filteredSongs.map((song) => getSongComponent(song))}               
            </table>
        </div>
    )
}

export default SongList
