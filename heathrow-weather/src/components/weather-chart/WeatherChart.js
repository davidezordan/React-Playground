import React, { useState, useEffect } from 'react';
import getData from '../../data/DataService.js'

import { Segment } from 'semantic-ui-react';
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  FlexibleXYPlot,
  LineMarkSeries
} from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

const WeatherChart = ({ requiredSeries }) => {
  const [ height, setHeight ] = useState(0);

  const updateWindowDimensions = () => {
    setHeight(window.innerHeight);
  };

  useEffect(() => {
      updateWindowDimensions();
      window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    }
  }, []);

  const { serie, date } = requiredSeries;

  if (!serie || (date.length !== 2)) {
    return <Segment>Please select chart options</Segment>;
  }

  const graphData = getData(date[0], date[1], serie);
  if (!graphData || graphData.length === 0) {
    return <Segment>No data available</Segment>;
  }

  return (
    <Segment>
      <FlexibleXYPlot
        xType="time"
        height={height * 0.6}
        yType="linear"
        xDistance={150}>

        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />

        <LineMarkSeries
          className="linemark-series-example"
          style={{
            strokeWidth: '3px'
          }}
          lineStyle={{stroke: 'red'}}
          markStyle={{stroke: 'blue'}}
          data={graphData}
          animation
          />
      </FlexibleXYPlot>
    </Segment>
  );
}

export default WeatherChart;