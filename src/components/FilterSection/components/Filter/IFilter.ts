import { EFilterType } from '../../../../enums/EFilterType';
import { IFilterDetails } from '../../../../../src/interfaces/IFilters';

export interface IFilter {
  filterType: EFilterType;
  updateFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterData: IFilterDetails['data'];
}