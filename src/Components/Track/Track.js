import React from "react";
import { Preview } from "../Preview/Preview";
import "./Track.css";

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
  }

  renderAction() {
    return this.props.isRemoval ? (
      <button className="Track-action" onClick={this.removeTrack}>-</button>
    ) : (
      <button className="Track-action" onClick={this.addTrack}>+</button>
    );
  }

  addTrack() {
      this.props.onAdd(this.props.track)
  }

  removeTrack() {
      this.props.onRemove(this.props.track)
  }

  handlePreview(){
    console.log("Handle")
    this.props.onPreview(this.props.track)
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
          <Preview previewURL={this.props.track.previewURL} onPreview={this.handlePreview} showPreview={this.props.track.showPreview}/>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
