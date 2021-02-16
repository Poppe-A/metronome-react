import React, { Component } from 'react';
import './AddSongForm.css';

class addSongForm extends Component {

    handleText = (event) => {
        this.setState({songTitle: event.target.value})
    }

    componentDidMount() {
        console.log("component did mount")
    }

    componentDidUpdate(prevProps) {
        //Typical usage, don't forget to compare the props
        if (this.props.songEdition.title !== prevProps.songEdition.title) {
          console.log("different name")
          this.setState({songTitle: this.props.songEdition.title})
        }
       }

  


    render () {
        return (
            <div className="AddSongMod">
                <p className={"FormTitle"}>{this.props.songEdition.id ? "Edit Song" : "Add Song"}</p>
                {/* <form onSubmit={this.handleSubmit}> */}
                <form className="AddSongForm">
                    <label className="AddSongLabel">
                        <p>Title :</p>
                        <input type="text" value={this.props.songEdition.title || ""} onChange={this.props.changeEditionName} />
                    </label>
                    <label className="AddSongLabel">
                        <p>Tempo :</p>
                        <input type="text" value={this.props.songEdition.tempo || ""} onChange={this.props.changeEditionTempo} />
                    </label>
                    <label className="AddSongLabel">
                        <p>Time signature :</p>
                        <input type="text" value={this.props.songEdition.timeSignature || ""} onChange={this.props.changeEditionSignature} />
                    </label>
                    <input type="submit" value={this.props.songEdition.id ? "Update" : "Create"} />
                </form>
              
            </div>
        )
    }
    
    
};

export default addSongForm;