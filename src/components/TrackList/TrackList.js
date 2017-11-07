import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
    render() {        
        return (
            <div className="TrackList">                       
                {this.props.tracks.map((track, i) => <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemoval={this.props.onRemoval} isRemoval={this.props.isRemoval}/> )}
            </div>
        );
    };
}

export default TrackList;