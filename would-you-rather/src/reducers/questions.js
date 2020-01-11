import { ADD_QUESTION, RECEIVE_QUESTIONS, TOGGLE_QUESTION } from '../actions/questions';

const questions = (state = {}, action) => {
  const { question } = action;

  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case ADD_QUESTION:
      return {
        ...state,
        [question.id]: question,
      };

    case TOGGLE_QUESTION:
      return {
        ...state,
        [question.qid]: {
          ...state[question.qid],
          [question.answer]: {
            ...state[question.qid][question.answer],
            votes: [...state[question.qid][question.answer].votes, question.authedUser],
          },
        },
      };
    default:
      return state;
  }
};

export default questions;
