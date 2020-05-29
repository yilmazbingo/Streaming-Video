import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../actions";
import styled from "styled-components";

class StreamList extends React.Component {
  //every component should fetch its own data
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    //streams that created by me has edit and delete buttons
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <StyledDiv className="content">
            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
            <div className="description">{stream.description}</div>
          </StyledDiv>
        </div>
      );
    });
  }

  //show createStream link if the user is signed in
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <StyledH2>Streams</StyledH2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

//we are converting streams object into the array.
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);

const StyledH2 = styled.h2`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledDiv = styled.div`
  a {
    color: green !important;
  }
`;
