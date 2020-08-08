import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Legend, Tooltip,
} from 'recharts';
import { connect } from 'react-redux';
import { filterData, calculateStats } from './helpers';
import { IFilterReducer } from '../../stores/filters/interfaces';
import { IChartSection, IChartData } from './IChartSection';

export const ChartSection = (props: IChartSection): JSX.Element | null => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<IChartData[]>([]);

  React.useEffect(() => {
    let chartData: IChartData[] = [];
    props.data.forEach((data, key) => {

      let eventsCollection = data;
      if(filtersSet([...props.datasourceFilter, ...props.campaignFilter])) {
        eventsCollection = filterData(data, props.datasourceFilter, props.campaignFilter);
      }

      const preparedChartData = {
        ...calculateStats(eventsCollection),
        name: key
      }
      chartData = [...chartData, { ...preparedChartData }]
    });

    setData(chartData);
    setLoading(false);
  }, [props.data, props.datasourceFilter, props.campaignFilter]);

  const filtersSet = (filters: string[]):boolean => !!filters.length;

  return (
    <div>
      {!loading && (
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 50, right: 30, left: 20, bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
          <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
        </LineChart>
      )}
    </div>
  )
}

const mapStateToProps = (state: { filters: IFilterReducer }) => ({
  datasourceFilter: state.filters.datasource,
  campaignFilter: state.filters.campaign,
})

export default connect(mapStateToProps)(ChartSection)