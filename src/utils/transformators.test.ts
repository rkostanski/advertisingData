import { mapAdvertisingData } from './transformators';
import mockedData from '../__mocks__/advertisingData.json';

test('#mapAdvertisingData', () => {
  const result = new Map();
  result.set(mockedData[0].date, [mockedData[0]]);

  expect(mapAdvertisingData([mockedData[0]])).toEqual(result);
  expect(mapAdvertisingData([])).toEqual(new Map ());
});
