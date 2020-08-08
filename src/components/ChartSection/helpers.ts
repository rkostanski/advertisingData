import { IAdvertisingDBData } from '../../interfaces/IAdvertisingDBData';

export const calculateStats = (val: IAdvertisingDBData[]): { clicks: number; impressions: number}   => {
  return val.reduce((
    acc: { clicks: number; impressions: number},
    curr: IAdvertisingDBData
  ) => ({
    clicks: acc.clicks + Number(curr.clicks),
    impressions: acc.impressions + Number(curr.impressions),
  }), {
    clicks: 0,
    impressions: 0,
  })
}

export const filterData = (
  data: IAdvertisingDBData[],
  datasourceFilter: string[],
  campaignFilter: string[],
): IAdvertisingDBData[] => (
  data.filter((event: IAdvertisingDBData) =>
    eventInFilters(datasourceFilter, event.datasource)
    && eventInFilters(campaignFilter, event.campaign)
  )
)

const eventInFilters = (filters: string[], event: string): boolean =>
    filters.length ? filters.includes(event) : true