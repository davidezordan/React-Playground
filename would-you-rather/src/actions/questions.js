import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { getActionDelay } from '../utils/helpers';


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const toggleQuestion = ({ qid, authedUser, answer }) => ({
  type: TOGGLE_QUESTION,
  question: { qid, authedUser, answer },
});

export const handleToggleQuestion = (info) => ((dispatch) => {
  dispatch(showLoading());

  setTimeout(() => {
    dispatch(toggleQuestion(info));

    saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleToggleQuestion: ', e);
        dispatch(toggleQuestion(info));
        alert('There was an error saving the question data. Try again.');
        dispatch(hideLoading());
      });
    dispatch(hideLoading());
  }, getActionDelay() / 2);
});

const addQuestion = (question) => ({
  type: ADD_QUESTION,
  question,
});

export const handleAddQuestion = ({ optionOneText, optionTwoText }) => ((dispatch, getState) => {
  const { authedUser } = getState();
  dispatch(showLoading());

  return saveQuestion({ optionOneText, optionTwoText, author: authedUser })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()));
});
