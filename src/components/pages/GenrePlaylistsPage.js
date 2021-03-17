import Header from '../Header';
import Playlist from '../Playlist';
import './GenrePlaylistsPage.css';
import './Page.css';

const GenrePlaylistsPage = ({genre, playlists, onPlaylistDiveIn}) => {
    return (
        <div className="page genre-page">
            <Header backgroundImageUrl={genre.imgSrc} title={genre.title} number={playlists.length} numberTitle="playlists" />
            <div className="playlist-grid">
                {playlists.map((playlist) => (
                    <Playlist key={playlist.id} name={playlist.name} description={playlist.description} imgSrc={playlist.imgSrc} onPlaylistDiveIn={onPlaylistDiveIn} playlist={playlist}/>
                ))}
            </div>
        </div>
    )
}

export default GenrePlaylistsPage
