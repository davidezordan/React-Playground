/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel';
import { getQuestionsCategories } from '../utils/questions-helpers';
import QuestionsList from './QuestionsList';

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const QuestionsBoard = ({ questions, authedUser }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const questionCategories = getQuestionsCategories(authedUser, questions);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Would you rather?" centered>
          <Tab label="Unanswered questions" {...a11yProps(0)} />
          <Tab label="Answered questions" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <QuestionsList questions={questionCategories.unAnsweredQuestions} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <QuestionsList questions={questionCategories.answeredQuestions} />
      </TabPanel>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questions,
  authedUser,
});

QuestionsBoard.propTypes = {
  questions: PropTypes.objectOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/require-default-props
  authedUser: PropTypes.string,
};

export default connect(mapStateToProps)(QuestionsBoard);
