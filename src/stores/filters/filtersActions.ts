import {UPDATE_FILTERS} from './filtersActionTypes';
import { TUpdateAction } from './TFilters';

export const updateFilter = (
  datasourceFilter: string[], campaignFilter: string[]
): TUpdateAction => ({
    type: UPDATE_FILTERS,
    payload: {
      datasource: datasourceFilter,
      campaign: campaignFilter,
  }}
);
