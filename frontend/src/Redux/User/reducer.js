import { getToken, saveData } from "../../Utils/localstorage";
import {
  FETCH_USER_ERROR,
  FETCH_USER_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_LOGIN_SUCCESS,
  USER_LOGOUT,
  SET_ERROR,
  SET_USER,
  SET_TOKEN,
} from "./actionTypes";

const init = {
  user: {},
  isLoading: false,
  isError: false,
  register: false,
  isAuth: false,
  error: null,
  token: getToken("token") || null,
};

export const authReducer = (state = init, { type, payload }) => {
  // console.log(type, payload);
  switch (type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        register: true,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        register: false,
        error: payload,
      };
    case FETCH_USER_LOADING:
      return {
        ...state,
        isLoading: true,
        isError: false,
        register: false,
        error: null,
      };
    case FETCH_LOGIN_SUCCESS:
      let data = payload;
      saveData("token", data);
      return {
        ...state,
        isLoading: true,
        isError: false,
        isAuth: true,
        token: data,
        error: null,
      };
    case USER_LOGOUT:
      saveData("token", null);
      return {
        ...state,
        token: null,
        user: {},
      };
    case SET_ERROR:
      return {
        ...state,
        isError: false,
        error: null,
        register: false,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: null,
        user: {},
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
