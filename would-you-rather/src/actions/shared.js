import { showLoading, hideLoading } from 'react-redux-loading';
import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser, logoutUser } from './authedUser';

const handleInitialData = () => async (dispatch) => {
  dispatch(showLoading());

  const { users, questions } = await getInitialData();
  dispatch(hideLoading());
  dispatch(receiveUsers(users));

  dispatch(receiveQuestions(questions));
};

const handleLoginData = () => async (dispatch) => {
  dispatch(showLoading());

  const { users } = await getInitialData();
  dispatch(hideLoading());
  dispatch(receiveUsers(users));
};

const handleSetUser = (userId) => async (dispatch) => {
  dispatch(showLoading());

  dispatch(setAuthedUser(userId));

  dispatch(hideLoading());
};

const handleLogoutUser = () => async (dispatch) => {
  dispatch(showLoading());

  dispatch(logoutUser());

  dispatch(hideLoading());
};

export {
  handleInitialData,
  handleLoginData,
  handleSetUser,
  handleLogoutUser,
};
