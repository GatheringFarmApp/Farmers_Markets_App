import {
    FETCH_MARKETS,
} from '../actions/types';

const INITIAL_STATE = {
    markets: [],
};

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {

        case FETCH_MARKETS:
            return action.payload;

        default:
            return state;

    }
};
