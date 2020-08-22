import { IAdvertisingDBData } from '../interfaces/IAdvertisingDBData';
import { IFilters } from '../interfaces/IFilters';

export const setFilters = (data: IAdvertisingDBData[], filters: IFilters): IFilters  => {
  data.forEach(element => {
    filters.datasource.data.add(element.datasource);
    filters.campaign.data.add(element.campaign);
  });

  return filters;
}