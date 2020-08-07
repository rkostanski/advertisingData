import React from 'react';
import { EInput } from '../../enums/EInput';
import { IFilterSection } from './IFilterSection';

type TOptions = string;

export const FilterSection = (props: IFilterSection):JSX.Element => {

  const {filters} = props;

  const createSelectOptions = (data: Set<string>): TOptions[] => {
    const options: TOptions[] = [];

    data.forEach((filter: string) => options.push(filter))

    return [...options];
  }

  const renderFilter = (filterType: 'datasource' | 'campaign', inputType: EInput) => {
    const isMulti = inputType === EInput.MULTISELECT;
    const selectOptions = createSelectOptions(filters[filterType].data);

    return (
      <select multiple={isMulti}>
        {selectOptions.map((category:string) => <option value={category}>{category}</option>)}
      </select>
    )
  }

  return (
    <div>
      {renderFilter('datasource', filters.datasource.type)}
      {renderFilter('campaign', filters.campaign.type)}
      <button>Apply</button>
    </div>
  )
}