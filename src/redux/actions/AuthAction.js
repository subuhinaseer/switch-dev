import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../constants/constants';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
  
});
