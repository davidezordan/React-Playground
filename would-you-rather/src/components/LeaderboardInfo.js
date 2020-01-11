import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  questionsInfo: {
    color: '#969696',
    fontSize: 16,
  },
}));

const LeaderBoardInfo = ({ user, questions }) => {
  const classes = useStyles();

  const {
    optionTwoNumber,
    optionOneNumber,
    askedQuestionsNumber,
  } = questions;

  return (
    <div className={classes.root}>
      <>
        <span className={classes.userName}>{user.name}</span>
        <div className={classes.questionsInfo}>
          <p>
    Questions asked:
            <b>{` ${askedQuestionsNumber} `}</b>
            - Questions answered:
            {' '}
            <b>{` ${optionOneNumber + optionTwoNumber}`}</b>
            {' '}
          </p>
        </div>
        {' '}
      </>
      {' '}
    </div>
  );
};

LeaderBoardInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    answers: PropTypes.object,
  }).isRequired,
  questions: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default LeaderBoardInfo;
