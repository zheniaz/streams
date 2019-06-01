import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM 
} from "../actions/types";
import _ from "lodash";
import { IAction } from "../models";

const INITIAL_STATE = {
    description: "",
    id: 0,
    title: "",
    userId: 0
}

export default (state: any = {}, action: IAction) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, "id")};
        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM: 
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        default: 
            return state;
    }
}