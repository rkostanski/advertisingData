import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';
import { IChartSection } from './IChartSection';

export const ChartSection = (props: IChartSection):JSX.Element => {

  if (props.data.length === 0) return <p>s</p>;
  const values = [];

  for (let i = 0; i <= props.data.length -1; i += 1) {
    values.push({
      name: props.data[i].date,
      clicks: props.data[i].clicks,
      impressions: props.data[i].impressions,
    })
  }

  return  (
    <LineChart
        width={500}
        height={300}
        data={values}
        margin={{
          top: 50, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="clicks" stroke="#8884d8"/>
        <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
      </LineChart>
  )
}