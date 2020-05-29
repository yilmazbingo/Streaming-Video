import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
//initialization of auth will be called only when the app boots up
//to track the auth status we have to connect to the store again.

class GoogleAuth extends React.Component {
  componentDidMount() {
    //client:auth2 is a library to be laoded
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          //this will return GoogleAuth object. this will check if user is signed in or not.
          //it is also used to sing user out.
          this.auth = window.gapi.auth2.getAuthInstance();

          //onAuthChange is called with a boolean
          //we pass the status of the client
          this.onAuthChange(this.auth.isSignedIn.get());

          //this listens to onAuthChange.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //this is where we dispatch the status to the store
  //isSigned in is from the redux store
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //storin currentUser's id
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  //this is done by the google
  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

//By default, a connected component receives props.dispatch and can dispatch actions itself.
//connect can accept an argument called mapDispatchToProps, which lets you create functions that dispatch when called, and pass those functions as props to your component.
//isntead of props.dispatch(action) props.signIn
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
