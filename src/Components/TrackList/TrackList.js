import React from "react";
import "./TrackList.css";
import { Track } from "../Track/Track";


export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks ? this.props.tracks.map(track => {
                    return <Track track={track} onRemove={this.props.onRemove} 
                    onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} 
                     key={track.id} onPreview={this.props.onPreview}/>;
                }) : null
                }
            </div>
        );
    }
}
