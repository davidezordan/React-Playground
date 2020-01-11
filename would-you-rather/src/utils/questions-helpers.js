const sortQuestions = (from, to) => (new Date(to.timestamp) - new Date(from.timestamp));

const getQuestionsArray = (questions) => Object.keys(questions).map((key) => questions[key]);

const getQuestionsCategories = (authedUser, questions) => {
  const questionsList = getQuestionsArray(questions);
  const returnValue = { answeredQuestions: [], unAnsweredQuestions: [] };

  if (questionsList && questionsList.length > 0) {
    returnValue.answeredQuestions = questionsList
      .filter((q) => q.optionOne.votes.includes(authedUser)
      || q.optionTwo.votes.includes(authedUser)).sort(sortQuestions);

    returnValue.unAnsweredQuestions = questionsList
      .filter((q) => !q.optionOne.votes.includes(authedUser)
      && !q.optionTwo.votes.includes(authedUser)).sort(sortQuestions);
  }

  return returnValue;
};

const getQuestionVotes = (user, questions) => {
  const questionsList = getQuestionsArray(questions);
  const returnValue = { askedQuestionsNumber: 0, optionOneNumber: 0, optionTwoNumber: 0 };

  if (questionsList && questionsList.length > 0) {
    returnValue.askedQuestionsNumber = questionsList.filter((q) => q.author === user.id).length;
    returnValue.optionOneNumber = questionsList
      .filter((q) => q.optionOne.votes.includes(user.id)).length;
    returnValue.optionTwoNumber = questionsList
      .filter((q) => q.optionTwo.votes.includes(user.id)).length;
  }

  return returnValue;
};

const compareLeaderboard = (user, nextUser) => {
  const userQ = user.questions; const nUserQ = nextUser.questions;
  const tUserQ = userQ.askedQuestionsNumber + userQ.optionOneNumber + userQ.optionTwoNumber;
  const tNextUserQ = nUserQ.askedQuestionsNumber + nUserQ.optionOneNumber + nUserQ.optionTwoNumber;

  // eslint-disable-next-line no-nested-ternary
  return (tUserQ < tNextUserQ) ? 1 : (tUserQ === tNextUserQ ? 0 : -1);
};

export { getQuestionVotes, compareLeaderboard, getQuestionsCategories };
