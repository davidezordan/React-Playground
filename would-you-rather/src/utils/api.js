import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
// eslint-disable-next-line import/extensions
} from './_DATA.js';

const getInitialData = () => Promise.all([
  _getUsers(),
  _getQuestions(),
]).then(([users, questions]) => ({
  users,
  questions,
}));

const saveQuestion = (info) => _saveQuestion(info);

const saveQuestionAnswer = (info) => _saveQuestionAnswer(info);

export { getInitialData, saveQuestion, saveQuestionAnswer };
