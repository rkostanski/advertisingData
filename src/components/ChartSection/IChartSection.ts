import { IAdvertisingDBData } from '../../interfaces/IAdvertisingDBData';

export interface IChartData {
  name: string;
  clicks: number;
  impressions: number;
}
export interface IChartSection {
  data: Map<string, IAdvertisingDBData[]>;
  datasourceFilter: string[];
  campaignFilter: string[];
};
