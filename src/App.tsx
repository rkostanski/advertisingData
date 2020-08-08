import React from 'react';
import { Provider } from 'react-redux';
import ChartSection from './components/ChartSection/ChartSection';
import FilterSection from './components/FilterSection/FilterSection';
import store from './stores/rootStore';
import { advertisingDataService } from './services/advertisingDataService';
import { setFiltersData } from './utils/helpers';
import { IAdvertisingDBData } from './interfaces/IAdvertisingDBData';
import { IFilters } from './interfaces/IFilters';
import { EInput } from './enums/EInput';
import './App.scss';

const filters: IFilters = {
  datasource: {
    label: 'Datasource',
    type: EInput.MULTISELECT,
    data: new Set(),
  },
  campaign: {
    label: 'Campaign',
    type: EInput.MULTISELECT,
    data: new Set(),
  }
}

function App() {
  const [availableFilters, setAvailableFilters] = React.useState<IFilters>(filters);
  const [advertisingData, setAdvertisingData] = React.useState<Map<string, IAdvertisingDBData[]>>(new Map());

  React.useEffect(() => {
    const advertisingData = advertisingDataService.getData();
    const mappedAdvertisingData: Map<string, IAdvertisingDBData[]> = new Map();

    advertisingData.forEach((row: IAdvertisingDBData) => {
      const events = mappedAdvertisingData.get(row.date);
      const nextEvent = events ? [...events, { ...row }] : [{ ...row }];

      mappedAdvertisingData.set(row.date, nextEvent);
    })

    setAdvertisingData(mappedAdvertisingData);
    setAvailableFilters({ ...setFiltersData(advertisingData, availableFilters) });
  }, []);

  return (
    <Provider store={store}>
      <div className="app">
        <div className="app-wrapper">
          <FilterSection filters={availableFilters} />
          {advertisingData.size === 0 ? (<p>loading</p>) : (<ChartSection data={advertisingData} />)}
        </div>
      </div>
    </Provider>
  );
}

export default App;
