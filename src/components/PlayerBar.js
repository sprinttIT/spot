import './PlayerBar.css';

const PlayerBar = ({timePassed, totalTime, percentage, onPlayerBarClick}) => {

    return (
        <div className="player-bar">
            <h3>{timePassed}</h3>
            <div className="bar-stripe" onClick={onPlayerBarClick}>
                <div className="passed-time-stripe" style={{width: `${percentage}%`}} />
            </div>
            <h3>{totalTime}</h3>
        </div>
    )
}

export default PlayerBar
