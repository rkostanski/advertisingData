import data from '../db/data.json';
import { IAdvertisingDBData } from '../interfaces/IAdvertisingDBData';

export abstract class advertisingDataService {

  public static getData():IAdvertisingDBData[] {
    return data as IAdvertisingDBData[];
  }

}