import { getActionDelay } from './helpers';

let users = {
  davidezordan: {
    id: 'davidezordan',
    name: 'Davide Zordan',
    avatarURL: 'https://pbs.twimg.com/profile_images/1125822003003437056/sJw4U5Fh_400x400.jpg',
    answers: {
      am8ehyc8byjqgar0jgpub9: 'optionTwo',
      loxhs1bqm25b708cmbf3g: 'optionTwo',
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
    answers: {
      vthrdm985a262al8qx3do: 'optionOne',
      xj352vofupe1dqz9emx13r: 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Drasner',
    avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
    answers: {
      xj352vofupe1dqz9emx13r: 'optionOne',
      vthrdm985a262al8qx3do: 'optionTwo',
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
};

let questions = {
  '8xf0y6ziyjabvozdd253nd': {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'davidezordan',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['davidezordan'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory',
    },
  },
  '6ni6ok3ym7mf1p33lnez': {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'sarahedo',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero',
    },
    optionTwo: {
      votes: ['sarahedo', 'davidezordan'],
      text: 'become a supervillain',
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'davidezordan',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic',
    },
    optionTwo: {
      votes: ['davidezordan'],
      text: 'be telepathic',
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'tylermcginnis',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'be a front-end developer',
    },
    optionTwo: {
      votes: ['davidezordan'],
      text: 'be a back-end developer',
    },
  },
  vthrdm985a262al8qx3do: {
    id: 'vthrdm985a262al8qx3do',
    author: 'tylermcginnis',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['tylermcginnis'],
      text: 'find $50 yourself',
    },
    optionTwo: {
      votes: ['sarahedo'],
      text: 'have your best friend find $500',
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'sarahedo',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['sarahedo'],
      text: 'write JavaScript',
    },
    optionTwo: {
      votes: ['tylermcginnis'],
      text: 'write Swift',
    },
  },
};

const generateUID = () => Math.random()
  .toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// eslint-disable-next-line no-underscore-dangle
export const _getUsers = () => new Promise((res) => {
  setTimeout(() => res({ ...users }), getActionDelay());
});

// eslint-disable-next-line no-underscore-dangle
export const _getQuestions = () => new Promise((res) => {
  setTimeout(() => res({ ...questions }), getActionDelay());
});

export const formatQuestion = ({ optionOneText, optionTwoText, author }) => ({
  id: generateUID(),
  timestamp: Date.now(),
  author,
  optionOne: {
    votes: [],
    text: optionOneText,
  },
  optionTwo: {
    votes: [],
    text: optionTwoText,
  },
});

// eslint-disable-next-line no-underscore-dangle
export const _saveQuestion = (question) => new Promise((res) => {
  const authedUser = question.author;
  const formattedQuestion = formatQuestion(question);
  // console.log(`_DATA.js - formatted question: ${JSON.stringify(formattedQuestion)}`);
  setTimeout(() => {
    questions = {
      ...questions,
      [formattedQuestion.id]: formattedQuestion,
    };
    users = {
      ...users,
      [authedUser]: {
        ...users[authedUser],
        questions: users[authedUser].questions.concat([formattedQuestion.id]),
      },
    };
    res(formattedQuestion);
  }, getActionDelay());
});

// eslint-disable-next-line no-underscore-dangle
export const _saveQuestionAnswer = ({ authedUser, qid, answer }) => new Promise((res) => {
  setTimeout(() => {
    users = {
      ...users,
      [authedUser]: {
        ...users[authedUser],
        answers: {
          ...users[authedUser].answers,
          [qid]: answer,
        },
      },
    };

    questions = {
      ...questions,
      [qid]: {
        ...questions[qid],
        [answer]: {
          ...questions[qid][answer],
          votes: questions[qid][answer].votes
            ? questions[qid][answer].votes.concat([authedUser]) : [authedUser],
        },
      },
    };

    res();
  }, getActionDelay());
});
