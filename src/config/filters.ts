import { IFilters } from '../interfaces/IFilters';
import { EInput } from '../enums/EInput';

export const filters: IFilters = {
  datasource: {
    label: 'Datasource',
    type: EInput.MULTISELECT,
    data: new Set(),
  },
  campaign: {
    label: 'Campaign',
    type: EInput.MULTISELECT,
    data: new Set(),
  },
};
