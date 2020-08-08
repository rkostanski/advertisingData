import filtersReducer from './filtersReducer';
import { UPDATE_FILTERS } from './filtersActionTypes';

describe('#filtersReducer', () => {

  test('ACTION: UPDATE_FILTERS - should add new values to filters', () => {
    const tmpReducer = filtersReducer(undefined, {
      type: UPDATE_FILTERS,
      payload: {
        datasource: ['test', 'test2'],
        campaign: ['lorem']
      },
    });

    expect(tmpReducer).toEqual({campaign: ['lorem'], datasource: ['test', 'test2']});
  });

  test('ACTION: UPDATE_FILTERS - should remove new values to filters', () => {
    const tmpReducer = filtersReducer({
      datasource: ['test', 'test2'],
      campaign: ['lorem']
    }, {
      type: UPDATE_FILTERS,
      payload: {
        datasource: [],
        campaign: []
      },
    });

    expect(tmpReducer).toEqual({campaign: [], datasource: []});
  });
}); 
