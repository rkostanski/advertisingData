import { IFilters } from '../../interfaces/IFilters';

export interface IFilterSection {
  filters: IFilters;
  updateFilter: (datasourceFilter: string[], campaignFilter: string[]) => void
}