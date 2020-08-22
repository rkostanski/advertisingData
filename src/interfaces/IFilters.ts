
export interface IFilters {
  datasource: IFilterDetails;
  campaign: IFilterDetails;
}

export interface IFilterDetails {
  label: string;
  data: Set<string>;
}