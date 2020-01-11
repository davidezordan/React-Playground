import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
  questionItem: {
    width: '100%',
    maxWidth: 700,
    maxHeight: 60,
    padding: 10,
    display: 'flex',
    margin: '0 auto',
    border: '1px solid #dad7d7',
    borderRadius: 3,
    justifyContent: 'center',
  },
}));

const QuestionsList = ({ questions }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ul>
        {
          questions && questions.length > 0
            ? questions.map((question) => (
              <li key={question.id}>
                <div className={classes.questionItem}>
                  <Link to={`/questions/${question.id}`}>
                    {`${question.optionOne.text} / ${question.optionTwo.text}`}
                  </Link>
                </div>
              </li>
            ))

            : <p><b>No questions available</b></p>
        }
      </ul>
    </div>
  );
};

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default QuestionsList;
