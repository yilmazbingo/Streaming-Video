import streams from "../../api-server/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

//we create stream when we submit the form.
//we are returning an arrow function which will be dispatched by redux-thunk
// that is why we are passing dispatch and it is async for thunk
export const createStream = (formValues) => async (dispatch, getState) => {
  try {
    //when we are creating a new stream, we are adding the userId property to the store.
    const { userId } = await getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId });
    dispatch({ type: CREATE_STREAM, payload: response.data });
    //programmatically navigation after we successfully submitted the form
    history.push("/");
  } catch (e) {
    console.log(e);
  }
};

export const fetchStreams = () => async (dispatch) => {
  try {
    const response = await streams.get("/streams");
    dispatch({ type: FETCH_STREAMS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: response.data });
};

//--PUT will replace all the properties with the one you posted:
//--so properties that you do not update will be dropped off
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push("/");
};

//when  we delete, we get nothing back but id
//we use this id to find the item in the state and omit it with lodash
export const deleteStream = (id) => async (dispatch) => {
  try {
    await streams.delete(`/streams/${id}`);
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push("/");
  } catch (e) {
    console.log(e.message);
  }
};
