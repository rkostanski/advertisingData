import { UPDATE_FILTERS } from './filtersActionTypes';
import { TUpdateAction } from './types';
import { IFilterReducer } from './interfaces';

let localState:IFilterReducer = {
  datasource: [],
  campaign: [],
};

export default function filtersReducer(state = localState, action: TUpdateAction) {
  switch (action.type) {
    case UPDATE_FILTERS:
      localState = {
        ...state,
        campaign: [
          ...action.payload.campaign,
        ],
        datasource: [
          ...action.payload.datasource,
        ],
      }
      break;
    default:
      localState = state;
  }

  return localState;
}