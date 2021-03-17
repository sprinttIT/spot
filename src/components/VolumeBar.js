import './VolumeBar.css';

const VolumeBar = ({volume, onVolumeBarClick}) => {
    return (
        <div className="volume-bar">
            <img src="/volume.png" className="volume-icon" />
            <div className="volume-bar-back-stripe" onClick={onVolumeBarClick}>
                <div className="volume-stripe" style={{width: `${volume*100}%`}} />
            </div>
        </div>
    )
}

export default VolumeBar
