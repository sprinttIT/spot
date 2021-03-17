import './NavigationItem.css';

const NavigationItem = ({name, imgSrc, isActive, text, onClick}) => {
    let classList = "navigation-item"
    if(isActive){
        classList += " active"
    }
    return (
        <div className={classList} onClick={() => onClick(name)}>
            <img src={imgSrc} />
            <h2>{text}</h2>
        </div>
    )
}

export default NavigationItem
