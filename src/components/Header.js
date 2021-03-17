import './Header.css';


const Header = ({backgroundImageUrl, title, number, numberTitle, description, duration}) => {
    return (
        <div className="page-header" style={{backgroundImage: ` url(${backgroundImageUrl})`}}>
            <div className="overlay" />
            <div className="text-overlay">
                <div className="playlist-name-row">
                    <h1>{title}</h1>
                    <h1>{number} <span className="small">{numberTitle}</span></h1>
                </div>
                <div className="playlist-desc-row">
                    <h3>{description}</h3>
                    <h3>{duration}</h3>
                </div>
            </div>                
        </div>
    )
}

export default Header
