import React from 'react';
import { useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}));

const NoMatch = () => {
  const location = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>
        No match for
        <code>
          {` ${location.pathname}`}
        </code>
      </h3>
    </div>
  );
};

export default NoMatch;
