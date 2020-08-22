import React from 'react';
import { connect } from 'react-redux';
import { Filter } from './components/Filter/Filter';
import { updateFilter } from '../../stores/filters/filtersActions';
import { IFilterSection } from './IFilterSection';
import { EFilterType } from '../../enums/EFilterType';
import './FilterSectionStyles.scss';

type TSelectedOptions = string[];

export const FilterSection = (props: IFilterSection): JSX.Element => {
  const [datasourceFilter, setDatasourceFilter] = React.useState<TSelectedOptions>([])
  const [campaignFilter, setCampaignFilter] = React.useState<TSelectedOptions>([])
  const { filters } = props;

  const selectedOptions = (options: HTMLOptionsCollection): TSelectedOptions => (
    Array.from(options)
      .filter((option: HTMLOptionElement) => option.selected)
      .map((option: HTMLOptionElement) => option.value)
  )

  const updateDatasourceFilter = (e: React.ChangeEvent<HTMLSelectElement>):void => setDatasourceFilter(selectedOptions(e.target.options))
  const updateCompaniesFilter = (e: React.ChangeEvent<HTMLSelectElement>):void => setCampaignFilter(selectedOptions(e.target.options))
  const applyFilters = () => props.updateFilter(datasourceFilter, campaignFilter);

  return (
    <div className="sidebar">
      {filters.datasource.data.size !== 0 && (
        <Filter
          filterType={EFilterType.datasource}
          updateFilter={updateDatasourceFilter}
          filterData={filters[EFilterType.datasource].data}
        />
      )}

    {filters.campaign.data.size !== 0 && (
      <Filter
        filterType={EFilterType.campaign}
        updateFilter={updateCompaniesFilter}
        filterData={filters[EFilterType.campaign].data}
      />
    )}

      <button onClick={applyFilters} data-testid='apply'>Apply Filters</button>
    </div>
  )
}

const mapDispatchToProps = (dispatch: Function) => ({
  updateFilter: (
    datasourceFilter: string[], campaignFilter: string[]
  ) => dispatch(updateFilter(datasourceFilter, campaignFilter))
})

export default connect(undefined, mapDispatchToProps)(FilterSection);