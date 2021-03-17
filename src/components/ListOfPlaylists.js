import Playlist from './Playlist';
import './ListOfPlaylists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'

const ListOfPlaylists = ({name, title, playlists, page, onPlaylistPageChange, onPlaylistDiveIn}) => {
    return (
        <div className="list-of-playlists">
            <div className="list-of-playlists-title-row">
                <h1>{title}</h1>
                <div className="list-of-playlists-arrows">
                    <FontAwesomeIcon color={page==2 ? "black" : "#ccc"} icon={faAngleLeft} onClick={() => onPlaylistPageChange(name,1)}/>
                    <FontAwesomeIcon color={page==2 ? "#ccc" : "black"} icon={faAngleRight} onClick={() => onPlaylistPageChange(name,2)}/>
                </div>
            </div>
            <div className="playlists-container">
                <div className={page == 1 ? "playlists-wrapper" : "playlists-wrapper page2"}>
                    <div className="playlists-sub-container">
                        {playlists.map((playlist) => (
                            <Playlist key={playlist.id} name={playlist.name} description={playlist.description} imgSrc={playlist.imgSrc} onPlaylistDiveIn={onPlaylistDiveIn} playlist={playlist}/>
                        ))} 
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ListOfPlaylists
