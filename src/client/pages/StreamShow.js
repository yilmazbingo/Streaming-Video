import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../actions";
// flv is downloading that video stream and then converting it to some file that actually can be played inside video player.
//it is like axios, reaches out some remote server, get some resource and then serve up that data to the app.

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    //always inside the constructor
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    //fetch stream adn then build the player
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  //if something goes wrong in componentDidMount and we cannot fetch the data, we wanna buildPlayer
  //or if in the future component fetch stream, we need to buildPlayer

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  //when we first render the component, we would not have videoRef so it would throw error
  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    //this url is where rtmp serves files
    //stream name comes from OBS. strem-key is STREAM_NAME
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  //when our component first rendered we are not showing the videoRef, only this div
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    //video has instrinsic height and width
    //controls prop Specifies that video" controls" should be displayed (such as a play/pause button etc).
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
