import './SongListPage.css';
import './Page.css';
import SongList from '../SongList';
import Header from '../Header';

const LikedSongsPage = ({songs,onSongPlay,onLikeClicked,isPlaying,currentlyPlayingSong}) => {
    const image = "/liked_songs.jpg"
    let playlist = {
        "id": "liked-songs",
        "name": "Liked Songs",
        "imgSrc": image,
        "description": "All the songs you love in one place"
    }
    return (
        <div className="page song-list-page">
            <Header backgroundImageUrl={image} title="Liked Songs" number={songs.length} numberTitle="Songs"/>
            <div className="song-list-page-content">
                <SongList songs={songs} playlist={playlist} onSongPlay={onSongPlay} onLikeClicked={onLikeClicked} isPlaying={isPlaying} currentlyPlayingSong={currentlyPlayingSong}/>
            </div>
        </div>
    )
}

export default LikedSongsPage
