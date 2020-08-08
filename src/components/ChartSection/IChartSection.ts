import { IAdvertisingDBData } from '../../interfaces/IAdvertisingDBData';

export interface IChartSection {
  data: Map<string, IAdvertisingDBData[]>;
  datasourceFilter: string[];
  campaignFilter: string[];
}