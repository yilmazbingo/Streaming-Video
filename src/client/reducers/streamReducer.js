import _ from "lodash";
import {
  FETCH_STREAM,
  FETCH_STREAMS,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
} from "../actions/types";

//our state is object and includes key=id, value=payload
export default (state = {}, action) => {
  switch (action.type) {
    // When we fetch all the streams, response will be an array but our state is an object. We need to merge them.
    //we are saying use "id" as the key. id:{object itself including id }
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

// the reason why we are spreading ...state, is to create a new object. We have to return a new object from the reducer. If we do not return a brand new object, redux is going to assume that we did not update anything from the reducer.
