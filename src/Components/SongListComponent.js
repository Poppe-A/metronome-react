import React from 'react';
import SongComponent from './SongComponent';
import './SongListComponent.css';


const songListComponent = (props) => (
    <div className="SongListContainer">
        <div className="SongList">
            {/* <div className="ArrowContainer">
                <div className="TopArrow"></div>
                <div className="BottomArrow"></div>
            </div> */}
            {props.songList.map(song => (
                <SongComponent 
                    key={song.id} 
                    id={song.id}
                    name={song.title} 
                    tempo={song.tempo}
                    timeSignature={song.timeSignature}
                    selectSong={props.selectSong}
                    isSelected={song.isSelected}
                    editSong={props.editSong}
                />
        ))}
        </div>
        <div className="AddSong" onClick={props.addSong}>
            Add a song
        </div>
    </div>
    
);

export default songListComponent;
