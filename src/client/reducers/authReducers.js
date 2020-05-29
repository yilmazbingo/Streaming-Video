import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INITIAL_STATE = { isSignedIn: null, userId: null };

//wehen our app is boots up, reducer is called one time. if we do not set initial-satate would be undefined
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };

    default:
      return state;
  }
};
