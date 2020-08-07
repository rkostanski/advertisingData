import React from 'react';
import { EInput } from '../../enums/EInput';
import { IFilterSection } from './IFilterSection';
import './FilterSectionStyles.scss'

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
        {selectOptions.map((category:string) => <option key={category} value={category}>{category}</option>)}
      </select>
    )
  }

  return (
    <div className="sidebar">
      Filter dimension values:
      <section className="sidebar-row">
        Datasource: [clear]

        {renderFilter('datasource', filters.datasource.type)}
        <button>Apply</button>
      </section>

      <section className="sidebar-row">
        Campaign:
        {renderFilter('campaign', filters.campaign.type)}
      </section>
    </div>
  )
}