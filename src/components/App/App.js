import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],

      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };

  addTrack(track) {
    if (this.state.playlistTracks.every(function (playlistTrack) {
       return track.id !== playlistTrack.id })) {
      this.setState({ playlistTracks: this.state.playlistTracks.concat(track) });
    }
  };

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.slice();
    newPlaylistTracks.splice(newPlaylistTracks.indexOf(track), 1);
    this.setState({ playlistTracks: newPlaylistTracks });
  };

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  };

  savePlaylist() {    
    let trackURIs = this.state.playlistTracks.map(track => track.uri );
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({playlistName: "New Playlist", playlistTracks: []})
    });
  };

  search(searchTerm) {
    Spotify.search(searchTerm).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  };

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} isRemoval={false} />
            <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemoval={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} isRemoval={true} />
          </div>
        </div>
      </div>
    );
  };
}

export default App;


