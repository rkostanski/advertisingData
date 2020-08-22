import { setFilters } from './helpers';
import { filters } from '../config/filters';
import mockedData from '../__mocks__/advertisingData.json';

test('#setFilters', () => {
  const {campaign, datasource} = setFilters(mockedData, filters);
  expect(campaign.data.has(mockedData[0].campaign)).toBeTruthy();
  expect(campaign.data.has(mockedData[1].campaign)).toBeTruthy();
  expect(campaign.data.has(mockedData[0].datasource)).toBeFalsy();

  expect(datasource.data.has(mockedData[0].datasource)).toBeTruthy();
  expect(datasource.data.has(mockedData[1].datasource)).toBeTruthy();
  expect(datasource.data.has(mockedData[0].campaign)).toBeFalsy();
})