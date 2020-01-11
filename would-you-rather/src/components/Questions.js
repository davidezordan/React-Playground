import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { handleToggleQuestion } from '../actions/questions';
import VoteStatus from './VoteStatus';

const getVoteStatus = (question, authedUser) => (question.optionOne.votes.includes(authedUser)
  || question.optionTwo.votes.includes(authedUser));

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  buttonPanel: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  questionInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  voteDetails: {
    margin: 10,
  },
  voteDetailsSelected: {
    margin: 10,
    fontWeight: 'bold',
  },
}));

const Questions = ({
  match,
  questions,
  users,
  authedUser,
  dispatch,
}) => {
  const { id } = match.params;
  const classes = useStyles();
  const question = questions[id];

  if (!question) {
    return <div className={classes.root}><b>Question not found</b></div>;
  }

  const questionOneClick = () => {
    dispatch(handleToggleQuestion({ qid: id, authedUser, answer: 'optionOne' }));
  };

  const questionTwoClick = () => {
    dispatch(handleToggleQuestion({ qid: id, authedUser, answer: 'optionTwo' }));
  };

  return (
    <div className={classes.root}>
      <img
        src={users[question.author].avatarURL}
        alt={`Avatar of ${users[question.author].name}`}
        className="avatar"
      />
      <p>asked:</p>
      <b>Would you rather?</b>
      <div className={classes.buttonPanel}>
        <div className={classes.questionInfo}>
          <Button
            variant="contained"
            color="primary"
            onClick={questionOneClick}
            disabled={getVoteStatus(question, authedUser)}
          >
            {question.optionOne.text}
          </Button>
          <VoteStatus questionOption={question.optionOne} authedUser={authedUser} users={users} />
        </div>
        <div className={classes.questionInfo}>
          <Button
            variant="contained"
            color="secondary"
            onClick={questionTwoClick}
            disabled={getVoteStatus(question, authedUser)}
          >
            {question.optionTwo.text}
          </Button>
          <VoteStatus questionOption={question.optionTwo} authedUser={authedUser} users={users} />
        </div>
        <>
          {getVoteStatus(question, authedUser) ? <b>Thanks for your vote!</b> : null}
        </>
      </div>
    </div>
  );
};

Questions.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node,
    }).isRequired,
  }).isRequired,
  questions: PropTypes.objectOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/require-default-props
  users: PropTypes.objectOf(PropTypes.object),
  // eslint-disable-next-line react/require-default-props
  authedUser: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  questions,
  user,
  authedUser,
  users,
}) => ({
  questions,
  users,
  user,
  authedUser,
});

export default connect(mapStateToProps)(Questions);
