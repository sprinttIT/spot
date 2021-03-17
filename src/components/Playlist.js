import './Playlist.css';

const Playlist = ({name, description, imgSrc, onPlaylistDiveIn, playlist}) => {
    return (
        <div className="playlist" onClick={() => {onPlaylistDiveIn(playlist)}}>
            <img src={imgSrc} />
            <h2>{name}</h2>
            <h3>{description}</h3>
        </div>
    )
}

export default Playlist
