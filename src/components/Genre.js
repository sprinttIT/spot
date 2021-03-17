import './Genre.css';


const Genre = ({image, title, genre, onGenreClicked}) => {
    return (
        <div className="genre" onClick={() => onGenreClicked(genre)}>
            <img src={image} />
            <div className="filter-layer" />
            <div className="text-layer">
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default Genre
