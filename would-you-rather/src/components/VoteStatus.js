import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const getVoteStatusClass = (questionOption, classes, authedUser) => (
  questionOption.votes.includes(authedUser)
    ? classes.voteDetailsSelected
    : classes.voteDetails
);

const getVotesPercentage = (questionOption, users) => (
  Math.floor((questionOption.votes.length / Object.keys(users).length) * 100)
);

const useStyles = makeStyles(() => ({
  voteDetails: {
    margin: 10,
  },
  voteDetailsSelected: {
    margin: 10,
    fontWeight: 'bold',
  },
}));

// eslint-disable-next-line react/prop-types
const VoteStatus = ({ questionOption, users, authedUser }) => {
  const classes = useStyles();

  return (
    <div className={getVoteStatusClass(questionOption, classes, authedUser)}>
      <p>
        {questionOption.votes.length}
        {' '}
    total votes
      </p>
      <p>
        {getVotesPercentage(questionOption, users)}
        {' '}
    %
      </p>
    </div>
  );
};

export default VoteStatus;
