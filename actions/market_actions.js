import axios from 'axios';

import { FETCH_MARKETS } from "./types";
import config from "../config";

export const fetchMarkets = (callback) => async (dispatch) => {

    try {
        let { data } = await axios.get(config.marketsUrl);

        dispatch({
            type: FETCH_MARKETS,
            payload: data.markets,
        });

        callback();

    } catch(e) {
        // TODO error handling
        console.error(e);
    }

};
