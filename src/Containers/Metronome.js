import React, { Component } from 'react';

import SongListComponent from '../Components/SongListComponent';
import Blinker from '../Components/Blinker';
import Modal from '../Components/Ui/Modal'
import './Metronome.css'
import AddSongForm from '../Components/AddSongForm';


class Metronome extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {ce que je veux}
    // }

    state = {
        songList: [
            {"title":"INTRO","tempo":105, timeSignature:3, "id":7557452, isSelected: false},
            {"title":"BROOMS","tempo":120, timeSignature:4, "id":1561561, isSelected: false},
            {"title":"CHURCH","tempo":179, timeSignature:3, "id":11111111, isSelected: false},
            {"title":"ERATO","tempo":180, timeSignature:3, "id":8787878, isSelected: false},
            {"title":"COLD","tempo":140, timeSignature:3, "id":2222222, isSelected: false},
            {"title":"GORGO","tempo":138, timeSignature:4, "id":3333333 ,isSelected: false},
            {"title":"RAFTER","tempo":143, timeSignature:3, "id":45464564, isSelected: false},
            {"title":"TWO STEPS","tempo":167, timeSignature:4, "id":2592952,isSelected: false},
            {"title":"MACHINIST","tempo":160, timeSignature:4, "id":89898989,isSelected: false},        
            {"title":"TESTSONG1","tempo":123, timeSignature:3, "id":135464464,isSelected: false},        
            {"title":"TESTSONG2","tempo":40, timeSignature:5, "id":1785249,isSelected: false},        
            {"title":"TESTSONG3","tempo":230, timeSignature:4, "id":9784568,isSelected: false},        
        ],
        selectedSongId: null,
        timeSignature: 4,
        tempoToPlay: null,
        tempoPlaying: false,
        showModal: false,
        songEdition: {
            title: null,
            tempo: null,
            timeSignature: null,
            id: null
        }
    }

    toggleTempoPlaying = () => {
        this.setState({tempoPlaying: !this.state.tempoPlaying});
    };

   selectSong = id => {
        const tempSongList = [...this.state.songList];
        if(this.state.selectedSongId) {
            tempSongList.find(song =>  song.id === this.state.selectedSongId).isSelected = false;
        }
        const newSeletedindex = tempSongList.findIndex(song =>  song.id === id);
        tempSongList[newSeletedindex].isSelected = true;

        this.setState({
            songList: tempSongList, 
            selectedSongId: tempSongList[newSeletedindex].id, 
            tempoToPlay: tempSongList[newSeletedindex].tempo,
            timeSignature:tempSongList[newSeletedindex].timeSignature,
        })
   }

   // ADD OR EDIT SONG / MODAL

   editSong = (event, title, tempo, timeSignature, id) => {
        console.log("editSong func", title);
        this.openModal(title, tempo, timeSignature, id);
        console.log("ok ",title, tempo);
        event.stopPropagation();
   }

   addSong = () => {
       this.openModal(null, null, null);
   }

   closeModal = () => {
       console.log("close modale")
        this.setState({
            songEdition: {
                title: null,
                tempo: null,
                timeSignature: null,
                id: null
            },
        showModal: false
        })
   }

   openModal = (title, tempo, timeSignature, id) => {
        this.setState({
            showModal: true,
            songEdition: {
                title: title || null,
                tempo: tempo || null,
                timeSignature: timeSignature || null,
                id: id || null
            }
        });
   }

   changeEditionName = (event) => {
        const songEdit = {...this.state.songEdition};
        songEdit.title = event.target.value;
        this.setState({songEdition: songEdit});
   }

   changeEditionTempo = (event) => {
    const songEdit = {...this.state.songEdition};
    songEdit.tempo = event.target.value;
    this.setState({songEdition: songEdit});
    }

    changeEditionSignature = (event) => {
        const songEdit = {...this.state.songEdition};
        songEdit.timeSignature = event.target.value;
        this.setState({songEdition: songEdit});
    }

    render () {
        const imgClass = this.state.tempoPlaying ? "soundOn" : "soundOff"

        return (
            <div className="MetronomeWindow">
                <h1>MY SETLIST METRONOME</h1>
                    <Modal show={this.state.showModal} close={this.closeModal}>
                        <AddSongForm 
                            songEdition={this.state.songEdition} 
                            changeEditionName={this.changeEditionName} 
                            changeEditionTempo={this.changeEditionTempo}
                            changeEditionSignature={this.changeEditionSignature}
                            submitValue="Update Song">
                        </AddSongForm>
                    </Modal>
                    <Blinker 
                        timeSignature={this.state.timeSignature}
                        tempoToPlay={this.state.tempoToPlay}
                        playSound={this.state.tempoPlaying}
                        tempoOnOff={this.toggleTempoPlaying}
                    ></Blinker>
                    <SongListComponent 
                        songList={this.state.songList} 
                        selectSong={this.selectSong}
                        editSong={this.editSong}
                        addSong={this.addSong}>
                    </SongListComponent>
                    <div id='toggleSound' className={imgClass} onClick={this.toggleTempoPlaying}/>

            </div>
        );
    }
}

export default Metronome;