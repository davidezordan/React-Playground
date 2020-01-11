export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export const setAuthedUser = (id) => ({
  type: SET_AUTHED_USER,
  id,
});

export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
