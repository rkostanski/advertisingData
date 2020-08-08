import React from 'react';
import {render } from '@testing-library/react'
import { ChartSection } from './ChartSection';
import { filterData, calculateStats } from './helpers';
import mockedData from '../../__mocks__/advertisingData.json';

const data = new Map();
data.set(mockedData[0].date, [mockedData[0]])
data.set(mockedData[0].date, [mockedData[1]])

const props = {
  data: data,
  datasourceFilter: [],
  campaignFilter: [],
}

test('renders main page', () => {
  const component = render(<ChartSection {...props}/>)
  expect(component.container).toMatchSnapshot()
});

describe('#filterData', () => {
  it('return not changed array if no filters passed', () => {
    expect(filterData(mockedData, [], [])).toStrictEqual(mockedData);
  })

  it('return filtered array by provided filters', () => {
    expect(filterData(mockedData, ['Google Analytics'], [])).not.toStrictEqual(mockedData);
    expect(filterData(mockedData, ['Google Analytics'], [])).toStrictEqual([mockedData[0]]);
    expect(filterData(mockedData, ['Google Analytics'], ['New General Campaign - UK - Desktop'])).toStrictEqual([]);
    expect(filterData(mockedData, ['Google Adwords'], ['New General Campaign - UK - Desktop'])).toStrictEqual([mockedData[1]]);
    expect(filterData(mockedData, [], ['New General Campaign - UK - Desktop'])).toStrictEqual([mockedData[1]]);
    expect(filterData(mockedData, ['Google'], ['Adwords'])).toStrictEqual([]);
  })
});

describe('#calculateStats', () => {
  it('return not changed array if no filters passed', () => {
    expect(calculateStats(mockedData)).toStrictEqual(
      {
        clicks: mockedData[0].clicks + mockedData[1].clicks,
        impressions: mockedData[0].impressions + mockedData[1].impressions
      }
    );
  })

})