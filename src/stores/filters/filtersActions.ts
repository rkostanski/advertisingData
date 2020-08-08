import {UPDATE_FILTERS} from './filtersActionTypes';

export const updateFilter = (datasourceFilter: string[], campaignFilter: string[]) => {
  return {
    type: UPDATE_FILTERS,
    payload: {
      datasource: datasourceFilter,
      campaign: campaignFilter,
    }
  }
}