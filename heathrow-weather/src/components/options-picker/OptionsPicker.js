import React, { useState } from 'react';

import { Header, Segment, Button, Form, Radio } from "semantic-ui-react";
import DatePickerRange from '../date-picker-range/DatePickerRange';

const OptionPicker = ({ onSubmit }) => {
    const [ serieValue, setSerieValue ] = useState([]);
    const [ dateValue, setDateValue ] = useState('');

    const handleSerieChange = (e, { value }) => setSerieValue(value);

    const handleDateChange = (e, { value }) => setDateValue(value);

    const handleClick = (e, { value }) => {
        onSubmit({ serie: serieValue, date: dateValue });
    };

    return (
        <Segment>
            <Form>
                <Form.Field required>
                    <Header as="h4">Date range:</Header>
                    <DatePickerRange fluid onChange={handleDateChange} />
                </Form.Field>

                <Form.Field>
                    <Radio
                        label='Temp max (°C)'
                        name='radioGroup'
                        value='tmax_C'
                        checked={serieValue === 'tmax_C'}
                        onChange={handleSerieChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Radio
                        label='Temp min (°C)'
                        name='radioGroup'
                        value='tmin_C'
                        checked={serieValue === 'tmin_C'}
                        onChange={handleSerieChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Radio
                        label='Rain max (mm)'
                        name='radioGroup'
                        value='rain_mm'
                        checked={serieValue === 'rain_mm'}
                        onChange={handleSerieChange}
                    />
                </Form.Field>

                <Form.Field>
                    <Radio
                        label='Sunshine hours'
                        name='radioGroup'
                        value='sunshine_hours'
                        checked={serieValue === 'sunshine_hours'}
                        onChange={handleSerieChange}
                    />
                </Form.Field>
                
                <Button fluid onClick={handleClick}>Display</Button>

            </Form>
        </Segment>
    );
}

export default OptionPicker;