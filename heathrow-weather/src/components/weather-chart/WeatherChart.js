import React from 'react';
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

class WeatherChart extends React.Component {
  state = {
    useCanvas: false,
    height: 0,
    width: 0
  };  

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  render = () => {
    const { requiredSeries } = this.props;
    const { height } = this.state;

    if (!requiredSeries.serie || (requiredSeries.date.length !== 2)) {
      return <Segment>Please select chart options</Segment>;
    }

    const graphData = getData(requiredSeries.date[0], requiredSeries.date[1], requiredSeries.serie);
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
}

export default WeatherChart;