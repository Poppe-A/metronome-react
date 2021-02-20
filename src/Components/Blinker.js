import React, { Component } from 'react';

import './Blinker.css';
import click from '../click.mp3';
import Uifx from 'uifx';
import Aux from '../hoc/Aux';
import timerWorker from '../Workers/timer.worker.js';

class Blinker extends Component {
    constructor(props) {
        super(props)
        this.timer = null;
        this.ac = new AudioContext();
        
        this.audio = new Uifx(click);

        this.state = {
            blinkerParts : this.initBlinkerPart(this.props.timeSignature || 4),
            count: 0,
            tempo: null,
            timeSignature: this.props.timeSignature || 4
        }
        //first commit with web audio api. already implemented, but for test purpose
    }

    //audio api

    clamp = (v, min, max) => {
        return Math.min(max, Math.max(min, v));
      }
      
      clampTempo = (t) => {
        return this.clamp(t, 30, 300);
      }
      
       getTempo = () => {
        // return clampTempo(parseFloat($("input").value));
        return this.clampTempo(130);
      }
      
      
       setupTempo = () => {
        var buf = this.ac.createBuffer(1, this.ac.sampleRate * 2, this.ac.sampleRate);
        var channel = buf.getChannelData(0);
        var phase = 0;
        var amp = 1;
        var duration_frames = this.ac.sampleRate / 50;
        const f = 330;
      
        for (var i = 0; i < duration_frames; i++) {
          channel[i] = Math.sin(phase) * amp;
          phase += 2 * Math.PI * f / this.ac.sampleRate;
          if (phase > 2 * Math.PI) {
            phase -= 2 * Math.PI;
          }
          amp -= 1 / duration_frames;
        }
      
        var source = this.ac.createBufferSource();
        source.buffer = buf;
        // source.loop = true;
        //source.loopEnd = 1 / (this.getTempo() / 60);
        source.connect(this.ac.destination);
        // source.onended(() => console.log("ended"))
        var a = new Promise((resolve, reject) => {
            console.log("start")
            source.start(1);
            resolve("lol")
        });
        a.then(b => {
            console.log("ok");
        })
      }



    initBlinkerPart = (timeSignature) => {
        let blinkerParts = [];
        
        for(var i=0; i<timeSignature; i++) {
            blinkerParts.push({bipped: false})
        }
        return blinkerParts;
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.timeSignature !== this.state.timeSignature) {
            this.setState({
                blinkerParts : this.initBlinkerPart(this.props.timeSignature),
                timeSignature: this.props.timeSignature
            });
        }

        if(this.props.tempoToPlay !== this.state.tempo) {
            this.setState({
                blinkerParts : this.initBlinkerPart(this.props.timeSignature),
                tempo: this.props.tempoToPlay,
                count: 0
            });
        }

        if(prevState.tempo !== this.state.tempo) {
            this.setupTempo();
            //this.startTempo();
        }
    }

    startTempo = () => {
        var a = document.getElementById("Blinker");
        console.log("Blinker ", a)
        let blinkTime = (60000/this.state.tempo);
        clearInterval(this.timer);
        
        this.timer = setInterval(
            this.bipBlink,
            blinkTime
        )
        this.bipBlink(0);
    }

    bipBlink = (defaultTempo) => {
        console.log(" count ", this.state.count)
        let tempBlinkerparts = [...this.state.blinkerParts];
        let tempCount = defaultTempo ? defaultTempo : this.state.count;
        console.log("bipblink parts count", defaultTempo, tempCount);
        if(tempCount > 0) {
            tempBlinkerparts[tempCount-1].bipped = false;
        } else {
            tempBlinkerparts[this.state.timeSignature -1].bipped = false;
        }

        tempBlinkerparts[tempCount].bipped = true;
        tempCount = (tempCount === this.state.timeSignature -1) ? 0 : tempCount + 1;
    
        this.setState({
            blinkerParts: tempBlinkerparts,
            count: tempCount
        })
        
        if(this.props.playSound) {
            //this.audio.play();
        }
    }

    render() { 
        // console.log("render blinker", this.state)
        const tabTodisplay = this.state.blinkerParts.map((el, index) => {
        const bippedClass = el.bipped ? "bipped" : "";
            return <div 
                className={"blinkerPart " + bippedClass} 
                id={"blinkerPart" + index} 
                key={index}>
            </div>
        });
        
        return (
            <Aux>
                <div id='Blinker'>
                    {tabTodisplay}
                </div>
            </Aux>
            
        )
    }
}

export default Blinker;