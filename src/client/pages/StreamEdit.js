import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../actions";
import StreamForm from "../components/StreamForm";

class StreamEdit extends React.Component {
  //With React-Router each component needs to be designed to work in isolation means it fetches its own data. We cannot assume that any given component will get access to some data that might have been loaded up previously inside the application.

  //that is why we fetched the data first, otherwise redux store would be empty so mapStateToProps would return undefined value.
  //when component is mounted, we alread populate the store
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    //---initialValues special prop of reduxForm
    //---all the props passed from this component will be attached to initialValues
    //---we need to make sure that we update only the title and description. so we do not post other data
    //...because if you are making validation for posted data and  u receive data that you do not expect, validation will throw error.
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
// ownProps object is a reference to the props object that shows up in StreamEdit component
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
