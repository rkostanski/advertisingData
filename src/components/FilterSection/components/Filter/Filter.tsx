import React from 'react';
import { IFilter } from './IFilter';

export const Filter = (props: IFilter): JSX.Element => {

  const { filterType, updateFilter, filterData } = props;
  const options = Array.from(filterData);

  return (
    <section className="sidebar-row">
      {filterType.toUpperCase()}:
      <select data-testid={`${filterType}-select`} multiple={true} name={filterType} onChange={updateFilter}>
        {options.map(
          (category: string) =>
            <option key={category} value={category} data-testid={`${filterType}-option`}>{category}</option>
        )}
      </select>
    </section>
  )
}