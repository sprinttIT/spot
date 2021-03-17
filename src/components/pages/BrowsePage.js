import Genre from '../Genre';
import './BrowsePage.css';
import './Page.css';

const BrowsePage = ({genres,onGenreClicked}) => {
    return (
        <div className="page browse-page">
            <h1>Genres</h1>
            <div className="genres">
                {genres.map((genre) => 
                    (<Genre key={genre.id} image={genre.imgSrc} title={genre.title} genre={genre} onGenreClicked={onGenreClicked}/>)
                )}
            </div>
            <div className="padding" />

        </div>
    )
}

export default BrowsePage
