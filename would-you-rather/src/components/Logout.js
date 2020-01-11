import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { handleLogoutUser } from '../actions/shared';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  buttonPanel: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Logout = ({ dispatch, history }) => {
  const classes = useStyles();

  const onLogoutClick = () => {
    dispatch(handleLogoutUser());
  };

  return (
    <div className={classes.root}>
      <p>Are you sure you want to Logout?</p>
      <div className={classes.buttonPanel}>
        <Button
          variant="contained"
          color="primary"
          onClick={onLogoutClick}
        >
            Yes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => { history.push('/'); }}
        >
            No
        </Button>
      </div>
    </div>
  );
};

Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ dispatch }) => (
  { dispatch }
);

export default connect(mapStateToProps)(Logout);
