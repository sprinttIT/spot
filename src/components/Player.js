import { ReactSVG } from 'react-svg';
import './Player.css';
import PlayerBar from './PlayerBar';
import VolumeBar from './VolumeBar';


const Player = ({currentlyPlayingDetails, songSecondsPassed, songTotalSeconds, isPlaying, togglePlay, onPlayerBarClick, volume, onVolumeBarClick, onPrevClick, onNextClick}) => {
    return (
        <div className="player">
            <div className="player-left-part">
                {currentlyPlayingDetails.playlistImageSrc? <img src={currentlyPlayingDetails.playlistImageSrc} /> : ""}
                <div className="song-name-and-artist">
                    <h2>{currentlyPlayingDetails.song}</h2>
                    <h3>{currentlyPlayingDetails.artist}</h3>
                </div>
            </div>
            <div className="player-center-part">
                <div className="player-controls">
                    <button onClick={() => onPrevClick()}>
                        <img src="/controller_icons/bar_prev.png" />
                    </button>
                    <button onClick={() => togglePlay()}>
                        <img src={isPlaying ? "/controller_icons/bar_pause.png" : "/controller_icons/bar_play.png"}/>
                    </button>
                    <button onClick={() => onNextClick()}>
                        <img src="/controller_icons/bar_next.png" />
                    </button>
                </div>
                <div className="player-bar">
                    <PlayerBar timePassed={formatTime(songSecondsPassed)} totalTime={formatTime(songTotalSeconds)} percentage={songSecondsPassed/songTotalSeconds*100} onPlayerBarClick={onPlayerBarClick}/>
                </div>
            </div>
            <div className="player-right-part">
                <VolumeBar volume={volume} onVolumeBarClick={onVolumeBarClick} />
            </div>
        </div>
    )
}

const formatTime = (seconds) =>{
    let minutes = Math.floor(seconds / 60)
    seconds = Math.floor(seconds % 60)
    let additionalZero = ""
    if (seconds < 10){
        additionalZero = "0"
    }
    return `${minutes}:${additionalZero}${seconds}`
}

export default Player
