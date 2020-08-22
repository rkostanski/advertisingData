import React from 'react';
import { Provider } from 'react-redux';
import ChartSection from './components/ChartSection/ChartSection';
import FilterSection from './components/FilterSection/FilterSection';
import store from './stores/rootStore';
import { advertisingDataService } from './services/advertisingDataService';
import { setFilters } from './utils/helpers';
import { mapAdvertisingData } from './utils/transformators';
import { IAdvertisingDBData } from './interfaces/IAdvertisingDBData';
import { IFilters } from './interfaces/IFilters';
import { filters } from './config/filters';
import './App.scss';

function App() {
  const [availableFilters, setAvailableFilters] = React.useState<IFilters>(filters);
  const [advertisingData, setAdvertisingData] = React.useState<Map<string, IAdvertisingDBData[]>>(new Map());

  React.useEffect(() => {
    const advertisingData = advertisingDataService.getData();
    const mappedAdvertisingData = mapAdvertisingData(advertisingData);

    setAdvertisingData(mappedAdvertisingData);
    setAvailableFilters({ ...setFilters(advertisingData, availableFilters) });
  }, []);

  return (
    <Provider store={store}>
      <div className="app">
        <div className="app-wrapper">
          <FilterSection filters={availableFilters} />
          {advertisingData.size !== 0 && (<ChartSection initialData={advertisingData} />)}
        </div>
      </div>
    </Provider>
  );
}

export default App;
