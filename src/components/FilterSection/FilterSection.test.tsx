import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react'
import { FilterSection } from './FilterSection';
import { filters } from '../../config/filters';

const datasourceFilters = new Set(['lorem', 'ipsum']);
const campaignFilters = new Set(['test']);

const props = {
  filters: {
    datasource: {
      ...filters.datasource,
      data: datasourceFilters,
    },
    campaign: {
      ...filters.campaign,
      data: campaignFilters,
    }
  },
  updateFilter: jest.fn(),
}

test('renders main page', () => {
  const { getByText } = render(<FilterSection {...props}/>);
  datasourceFilters.forEach(option => {
    let optionText = getByText(new RegExp(option, "i"));
    expect(optionText).toBeInTheDocument();
  })

  campaignFilters.forEach(option => {
    let optionText = getByText(new RegExp(option, "i"));
    expect(optionText).toBeInTheDocument();
  })
});

test('updates datasource select on change', () => {
  const { getAllByTestId } = render(<FilterSection {...props}/>);

  fireEvent.change(screen.getByTestId('datasource-select'), {
    target: { value: "ipsum" },
  });

  let options = getAllByTestId('datasource-option') as HTMLOptionElement[];
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeTruthy();
});

test('updates campaign select on change', () => {
  const { getAllByTestId } = render(<FilterSection {...props}/>);

  fireEvent.change(screen.getByTestId('campaign-select'), {
    target: { value: "test" },
  });

  let options = getAllByTestId('campaign-option') as HTMLOptionElement[];
  expect(options[0].selected).toBeTruthy();
});

test('calls update store on apply click', () => {
  render(<FilterSection {...props}/>);

  fireEvent.click(screen.getByTestId('apply'));

  expect(props.updateFilter).toHaveBeenCalledTimes(1);
});
