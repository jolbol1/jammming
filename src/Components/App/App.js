import "./App.css";
import React from "react";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import Spotify from "../../util/Spotify";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.previewTrack = this.previewTrack.bind(this);
  }

  addTrack(track) {
    if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      return;
    }
    this.setState({
      playlistTracks: this.state.playlistTracks.concat([
        {
          name: track.name,
          artist: track.artist,
          album: track.album,
          id: track.id,
          uri: track.uri,
          previewURL: track.previewURL,
          showPreview: track.showPreview
        },
      ]),
      searchResults: this.state.searchResults.filter(
        (savedTrack) => track.id !== savedTrack.id
      ),
    });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  removeTrack(track) {
    let playlistTracks = this.state.playlistTracks.filter((savedTrack) => {
      return savedTrack.id !== track.id;
    });
    this.setState({
      playlistTracks: playlistTracks,
    });
  }

  previewTrack(track) {
    console.log("Click", track)
    if (
      this.state.searchResults.find((savedTrack) => savedTrack.id === track.id)
    ) {
      let searchResults = this.state.searchResults.map((savedTrack) => {
        if(savedTrack.id === track.id) {
          savedTrack.showPreview = !track.showPreview;
        }
        return savedTrack;
      })
      this.setState({
        searchResults: searchResults
      })
    } else if (
      this.state.playlistTracks.find((savedTrack) => savedTrack.id === track.id)
    ) {
      let playlistTracks = this.state.playlistTracks.map((savedTrack) => {
        if(savedTrack.id === track.id) {
          savedTrack.showPreview = !track.showPreview;
        }
        return savedTrack;
      })
      this.setState({
        playlistTracks: playlistTracks
      })
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({
        searchResults: searchResults,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onPreview={this.previewTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onPreview={this.previewTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}
