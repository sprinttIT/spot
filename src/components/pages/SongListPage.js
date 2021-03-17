import './SongListPage.css';
import './Page.css';
import SongList from '../SongList';
import Header from '../Header';

const SongListPage = ({playlist, songs, onSongPlay, onLikeClicked, isPlaying, currentlyPlayingSong, duration}) => {
    return (
        <div className="page song-list-page">
            <Header backgroundImageUrl={playlist.imgSrc} title={playlist.name} number={songs.length} numberTitle="Songs" description={playlist.description} duration={duration}/>
            <div className="song-list-page-content">
                <SongList songs={songs} playlist={playlist} onSongPlay={onSongPlay} onLikeClicked={onLikeClicked} isPlaying={isPlaying} currentlyPlayingSong={currentlyPlayingSong}/>
            </div>
        </div>
    )
}

export default SongListPage
