import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../constants/constants';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const AuthReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
      
    default:
      return state;
  }
};

export default AuthReducers;
