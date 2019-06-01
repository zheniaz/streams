import {
    
    FETCH_TODOS,
    FETCH_TODO,
    EDIT_TODO,
    DELETE_TODO,
} from "../actions/types";
import { IAction } from '../models/index';
import _ from "lodash";

export default (state: any = {}, action: IAction) => {
    switch (action.type) {
        case FETCH_TODOS:
            return {...state, ..._.mapKeys(action.payload, "id")};
        default:
            return state;
    }
}