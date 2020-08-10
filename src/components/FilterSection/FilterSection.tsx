import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../../stores/filters/filtersActions';
import { EInput } from '../../enums/EInput';
import { EFilterType } from '../../enums/EFilterType';
import { IFilterSection } from './IFilterSection';
import './FilterSectionStyles.scss';

export const FilterSection = (props: IFilterSection): JSX.Element => {
  const [datasourceFilter, setDatasourceFilter] = React.useState<string[]>([])
  const [campaignFilter, setCampaignFilter] = React.useState<string[]>([])
  const { filters } = props;

  const applyFilters = () => props.updateFilter(datasourceFilter, campaignFilter);

  const updateFilter = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option: HTMLOptionElement) => option.selected)
      .map((option: HTMLOptionElement) => option.value);

    if (e.target.name === EFilterType.datasource) {
      return setDatasourceFilter(selectedOptions)
    }

    if (e.target.name === EFilterType.campaign) {
      return setCampaignFilter(selectedOptions)
    }
  }

  const createSelectOptions = (data: Set<string>): string[] => {
    let options: string[] = [];

    data.forEach((filter: string) => options.push(filter));
    return [...options];
  }

  const renderFilter = (filterType: EFilterType, inputType: EInput): JSX.Element => {
    const isMulti = inputType === EInput.MULTISELECT;
    const selectOptions = createSelectOptions(filters[filterType].data);

    return (
      <select data-testid={`${filterType}-select`} multiple={isMulti} name={filterType} onChange={updateFilter}>
        {selectOptions.map((category: string) => <option key={category} value={category} data-testid={`${filterType}-option`}>{category}</option>)}
      </select>
    )
  }

  return (
    <div className="sidebar">
      {filters.datasource.data.size !== 0 && (
        <section className="sidebar-row">
          Datasource:

          {renderFilter(EFilterType.datasource, filters.datasource.type)}
        </section>
      )}

    {filters.campaign.data.size !== 0 && (
      <section className="sidebar-row">
        Campaign:
        {renderFilter(EFilterType.campaign, filters.campaign.type)}
      </section>
    )}

      <button onClick={applyFilters} data-testid='apply'>Apply Filters</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  updateFilter: (datasourceFilter: string[], campaignFilter: string[]) => dispatch(updateFilter(datasourceFilter, campaignFilter))
})

export default connect(undefined, mapDispatchToProps)(FilterSection);