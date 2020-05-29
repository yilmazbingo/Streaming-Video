import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import history from "../history";
import { fetchStream, deleteStream } from "../actions";

//every component should fetches its own data
class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    //React.Fragment is invisible element has no effect on DOM
    //we can shorten as <></> but we dont use this because some linters do not think this is a valid syntax
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }
  //onDismiss is passed from parent to keep Modal more reusable
  // we are calling the functions here to pass the results of the functions. because we want to pass jsx
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
