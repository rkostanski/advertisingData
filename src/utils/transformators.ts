import { IAdvertisingDBData } from '../interfaces/IAdvertisingDBData';

export const mapAdvertisingData = (data: IAdvertisingDBData[]): Map<string, IAdvertisingDBData[]> => {
  const mappedAdvertisingData: Map<string, IAdvertisingDBData[]> = new Map();

  data.forEach((row: IAdvertisingDBData) => {
    const events = mappedAdvertisingData.get(row.date);
    const nextEvent = events ? [...events, { ...row }] : [{ ...row }];

    mappedAdvertisingData.set(row.date, nextEvent);
  })

  return mappedAdvertisingData;
}