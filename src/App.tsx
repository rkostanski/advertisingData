import React from 'react';
import './App.css';
import { IFilters } from './interfaces/IFilters';

import { EInput } from './enums/EInput';
import { FilterSection } from './components/FilterSection/FilterSection';
import { advertisingDataService } from './services/advertisingDataService';
import { IAdvertisingDBData } from './interfaces/IAdvertisingDBData';
import { setFiltersData } from './utils/helpers';

function App() {
  const [advertisingData, setAdvertisingData] = React.useState<IAdvertisingDBData[]>([])


  React.useEffect(() => {
    setAdvertisingData(advertisingDataService.getData())
  }, []);

  const filters: IFilters = {
    datasource: {
      label: 'Datasource',
      type: EInput.MULTISELECT,
      data: new Set(),
    },
    campaign: {
      label: 'Campaign',
      type: EInput.SELECT,
      data: new Set(),
    }
  }

  return (
    <div className="App">
      <FilterSection filters={setFiltersData(advertisingData, filters)}></FilterSection>
    </div>
  );
}

export default App;
