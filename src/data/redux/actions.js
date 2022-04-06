export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';

export const setUserEmail = email => dispatch => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  });
};
export const setUserPassword = password => dispatch => {
  dispatch({
    type: SET_USER_PASSWORD,
    payload: password,
  });
};
