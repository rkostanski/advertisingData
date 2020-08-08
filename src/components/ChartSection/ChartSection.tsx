import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Legend, Tooltip,
} from 'recharts';
import { IChartSection } from './IChartSection';
import { connect } from 'react-redux';
import { IAdvertisingDBData } from '../../interfaces/IAdvertisingDBData';

interface IChartData {
  name: string;
  clicks: number;
  impressions: number;
}

export const ChartSection = (props: IChartSection): JSX.Element => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<IChartData[]>([]);

  React.useEffect(() => {
    let chartData: IChartData[] = [];
    props.data.forEach((data, key) => {

      let eventsCollection = data;
      if(filtersSet([...props.datasourceFilter, ...props.campaignFilter])) {
        eventsCollection = data.filter((event: IAdvertisingDBData) =>
          eventInFilters(props.datasourceFilter, event.datasource)
          && eventInFilters(props.campaignFilter, event.campaign)
        );
      }

      const updatedEvents = {
        ...calculateStats(eventsCollection),
        name: key
      }
      chartData = [...chartData, { ...updatedEvents }]
    });

    setData(chartData);
    setLoading(false);
  }, [props.data, props.datasourceFilter, props.campaignFilter]);

  const calculateStats = (val: IAdvertisingDBData[]): { clicks: number; impressions: number}   => {
    return val.reduce((
      acc: { clicks: number; impressions: number},
      curr: IAdvertisingDBData
    ) => ({
      clicks: acc.clicks + Number(curr.clicks),
      impressions: acc.impressions + Number(curr.impressions),
    }), {
      clicks: 0,
      impressions: 0,
    })
  }

  const eventInFilters = (filters: string[], event: string) =>
    filters.length ? filters.includes(event) : true

  const filtersSet = (filters: string[]) => filters.length;

  if (loading) return <p>Loading</p>
  return (
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
  )
}

const mapStateToProps = (state: any) => ({
  datasourceFilter: state.filters.datasource,
  campaignFilter: state.filters.campaign,
})

export default connect(mapStateToProps)(ChartSection)