import axios from 'axios';

import {FETCH_MARKETS} from "./types";

const MARKETS_URL = "https://raw.githubusercontent.com/GatheringFarmApp/MarketsMapData/master/markets.json";

export const fetchMarkets = (callback) => async (dispatch) => {

    try {
        let { data } = await axios.get(MARKETS_URL);

        dispatch({
            type: FETCH_MARKETS,
            payload: data.markets,
        });

        callback();

    } catch (e) {
        // TODO error handling
        console.error(e);
    }

};
