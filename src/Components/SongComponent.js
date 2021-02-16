import React from 'react';

import './SongComponent.css'

const songComponent = (props) => {
    const selectedClass = props.isSelected ? "selectedSong" : "";

    return (
    <div className={"Song " + selectedClass} onClick={() => props.selectSong(props.id)}>
        <div className="SongLabels">
            <p className="SongName">{props.name}</p>
            <p className="songTempo">{props.tempo + " BPM"}</p>
        </div>
        <div className="SongOption" onClick={(e) => props.editSong(e, props.name, props.tempo, props.timeSignature, props.id)}></div>
    </div>
    )
};

export default songComponent;
