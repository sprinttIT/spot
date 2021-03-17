import './Navigation.css';
import NavigationItem from './NavigationItem';

const Navigation = ({selectedNavItem, onClick} ) => {
    return (
        <div className="navigation">
            <div className="logo">
                <img  src='/spotify_logo.png' alt="spotify logo"/>
            </div>
            <NavigationItem name="home" imgSrc="/home_icon.png" isActive={selectedNavItem == "home"} text="Home" onClick={onClick}/>
            <NavigationItem name="browse" imgSrc="/browse_icon.png" isActive={selectedNavItem == "browse"} text="Browse" onClick={onClick}/>
            <NavigationItem name="liked-songs" imgSrc="/liked_songs_icon.png" isActive={selectedNavItem == "liked-songs"} text="Liked Songs" onClick={onClick}/>
        </div>
    )
}

export default Navigation
