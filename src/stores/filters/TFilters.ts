import { UPDATE_FILTERS } from './filtersActionTypes';
import { IFilterReducer } from './IFilters';

export interface TUpdateAction {
  type: typeof UPDATE_FILTERS;
  payload: IFilterReducer;
};
