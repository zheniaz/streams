import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM, 
    FETCH_TODO,
    FETCH_TODOS
} from "./types";
import streams from "../apis/streams";
import history from "../history";

export const signIn = (userId: number) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = (formValues: any) => async (dispatch: any, getState: any) => {
    const {userId} = getState().auth;
    const response = await streams.post("/streams", { ...formValues, userId});

    dispatch({ type: CREATE_STREAM, payload: response.data })
    history.push("/streams");
}

export const fetchStreams = () => async (dispatch: any) => {
    const response = await streams.get("/streams");

    dispatch({type: FETCH_STREAMS, payload: response.data});
}

export const fetchStream = (id: any) => async (dispatch: any) => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({type: FETCH_STREAM, payload: response.data});
}

export const editStream = (id: number, formValues: any) => async (dispatch: any) => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({type: EDIT_STREAM, payload: response.data});
    history.push("/streams");
}

export const deleteStream = (id: any) => async (dispatch: any) => {
    await streams.delete(`/streams/${id}`);

    dispatch({type: DELETE_STREAM, payload: id});
    history.push("/streams");
}

export const fetchTodos = () => async (dispatch: any) => {
    const response = await streams.get("/todos");
    dispatch({type: FETCH_TODOS, payload: response.data});
}