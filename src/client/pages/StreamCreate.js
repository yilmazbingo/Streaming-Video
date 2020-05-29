import React from "react";
import { connect } from "react-redux";
import { createStream } from "../actions";
import StreamForm from "../components/StreamForm";

// class StreamCreate extends React.Component {
//   onSubmit = (formValues) => {
//     this.props.createStream(formValues);
//   };

//   render() {
//     return (
//       <div>
//         <h3>Create a Stream</h3>
//         <StreamForm onSubmit={this.onSubmit} />
//       </div>
//     );
//   }
// }

const StreamCreate = (props) => {
  const onSubmit = (formValues) => {
    props.createStream(formValues);
  };

  return (
    <div>
      <h3>Create Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

export default connect(null, { createStream })(StreamCreate);
