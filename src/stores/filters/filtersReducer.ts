import { UPDATE_FILTERS } from './filtersActionTypes';

let localState:any = {
  datasource: [],
  campaign: [],
};

export default function filtersReducer(state = localState, action:any) {
  switch (action.type) {
    case UPDATE_FILTERS:
      localState = {
        ...state,
        campaign: [
          ...action.payload.campaign
        ],
        datasource: [
          ...action.payload.datasource
        ]
      }
      break;
    default:
      localState = state;
  }

  return localState;
}