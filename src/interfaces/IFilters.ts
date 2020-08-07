import { EInput } from '../enums/EInput';

export interface IFilters {
  datasource: IFilterDetails;
  campaign: IFilterDetails;
}

interface IFilterDetails {
  label: string;
  type: EInput;
  data: Set<string>;
}