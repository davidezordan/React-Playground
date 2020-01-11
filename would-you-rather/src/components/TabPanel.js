import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TabPanel = ({
  children, value, index, ...other
}) => (

  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`would-you-rather-questions-tabpanel-${index}`}
    aria-labelledby={`would-you-rather-questions-tab-${index}`}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...other}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </Typography>

);

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  index: PropTypes.any.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
};

export default TabPanel;
