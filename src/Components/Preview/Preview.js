import React from "react";
import "./Preview.css";

export class Preview extends React.Component {
  render() {
      console.log(this.props.showPreview)
    return (
      <div className="Preview-container">
          <button className="Preview-button" onClick={this.props.onPreview}>Preview</button>
        {this.props.showPreview && <audio className="Preview-audio" controls src={this.props.previewURL}></audio>}
      </div>
    );
  }
}
