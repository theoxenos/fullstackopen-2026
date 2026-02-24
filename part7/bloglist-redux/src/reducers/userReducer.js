import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login-service.js';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: (state, action) => {
      return initialState;
    },
  },
});

export const login = (username, password) => {
  return async (dispatch) => {
    const result = await loginService.login({ username, password });
    dispatch(setUser(result));
  };
};

export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;