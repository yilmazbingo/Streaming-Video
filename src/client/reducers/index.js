import { combineReducers } from "redux";
import authReducer from "./authReducers";
import { reducer as formReducer } from "redux-form";
import streamReducer from "./streamReducer";

// keyword for the formReducer has to be "form"
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamReducer,
});
