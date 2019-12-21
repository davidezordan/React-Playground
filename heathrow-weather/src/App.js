import React from 'react';
import { Container, Header, Grid } from "semantic-ui-react";

import WeatherChart from './components/weather-chart/WeatherChart';
import OptionsPicker from './components/options-picker/OptionsPicker';

class App extends React.PureComponent {

  state = { requiredSeries: {} };
  onSubmit = (options) => this.setState({ requiredSeries: options });
  
  render() {
    const { requiredSeries } = this.state;

    return (
      <Container style={{margin: 20}}>

        <Header as="h3">Heathrow weather station information</Header>
    
        <Grid columns={2} stackable>
    
          <Grid.Column width={10}>
            <WeatherChart requiredSeries={requiredSeries}/>
          </Grid.Column>
    
          <Grid.Column width={6}>
            <OptionsPicker onSubmit={this.onSubmit}/>
          </Grid.Column>
    
        </Grid>
  
      </Container>
    );
  }
}

export default App;