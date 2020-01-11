import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import LeaderBoardInfo from './LeaderboardInfo';
import { compareLeaderboard, getQuestionVotes } from '../utils/questions-helpers';

const useStyles = makeStyles(() => ({
  leaderdboardItem: {
    width: '100%',
    maxWidth: 440,
    maxHeight: 70,
    padding: 10,
    display: 'flex',
    margin: '0 auto',
    border: '1px solid #dad7d7',
    borderRadius: 3,
  },
}));

const Leaderboard = ({ users, questions }) => {
  const classes = useStyles();

  const usersList = Object.keys(users).map((key) => users[key])
    .map((user) => ({ user, questions: getQuestionVotes(user, questions) }))
    .sort(compareLeaderboard);

  return (
    <>
      <h3 className="center">Leaderboard</h3>
      <ul>
        {usersList.map((user) => (
          <li key={user.user.id}>
            <div className={classes.leaderdboardItem}>
              <img
                src={user.user.avatarURL}
                alt={`Avatar of ${user.user.name}`}
                className="avatar"
              />
              <LeaderBoardInfo user={user.user} questions={user.questions} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({ users, questions }) => ({
  users,
  questions,
});

Leaderboard.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  questions: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Leaderboard);
