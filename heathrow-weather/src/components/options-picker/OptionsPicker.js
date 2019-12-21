import React from 'react';

import { Header, Segment, Button, Form, Radio } from "semantic-ui-react";
import DatePickerRange from '../date-picker-range/DatePickerRange';

class OptionPicker extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = { serieValue: '', dateValue: [] };

        this.handleSerieChange = (e, { value }) => this.setState({ serieValue: value });

        this.handleDateChange = (e, { value }) => this.setState({ dateValue: value });

        this.handleClick = (e, { value }) => {
            const { serieValue, dateValue } = this.state;
            props.onSubmit({ serie: serieValue, date: dateValue });
        };
    }

    render() {
        const { serieValue } = this.state;

        return (
            <Segment>
                <Form>
                    <Form.Field required>
                        <Header as="h4">Date range:</Header>
                        <DatePickerRange fluid onChange={this.handleDateChange} />
                    </Form.Field>

                    <Form.Field>
                        <Radio
                            label='Temp max (°C)'
                            name='radioGroup'
                            value='tmax_C'
                            checked={serieValue === 'tmax_C'}
                            onChange={this.handleSerieChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Radio
                            label='Temp min (°C)'
                            name='radioGroup'
                            value='tmin_C'
                            checked={serieValue === 'tmin_C'}
                            onChange={this.handleSerieChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Radio
                            label='Rain max (mm)'
                            name='radioGroup'
                            value='rain_mm'
                            checked={serieValue === 'rain_mm'}
                            onChange={this.handleSerieChange}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Radio
                            label='Sunshine hours'
                            name='radioGroup'
                            value='sunshine_hours'
                            checked={serieValue === 'sunshine_hours'}
                            onChange={this.handleSerieChange}
                        />
                    </Form.Field>
                    
                    <Button fluid onClick={this.handleClick}>Display</Button>

                </Form>
            </Segment>
        );
    }
}

export default OptionPicker;