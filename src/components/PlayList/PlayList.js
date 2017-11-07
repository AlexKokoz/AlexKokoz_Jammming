import React, { Component } from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    };

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    };

    render() {
        return (
            <div className="Playlist">
            <input value={this.props.playlistName} onChange={this.handleNameChange}/>
            <TrackList tracks={this.props.playlistTracks} onRemoval={this.props.onRemoval} isRemoval={this.props.isRemoval}/>
            <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
          </div>
        );
    };
}

export default PlayList;