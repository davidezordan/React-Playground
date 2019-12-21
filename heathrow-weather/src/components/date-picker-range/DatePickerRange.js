import React from 'react';

import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
 
const DatePickerForm = ({ onChange }) => (
  <SemanticDatepicker onChange={onChange} type='range' />
);

export default DatePickerForm;