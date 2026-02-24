import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: () => {
      return initialState;
    },
  },
});

const { clearNotification, setNotification } = notificationSlice.actions;

let notificationId = null;

export const showNotification = (notification) => {
  return async (dispatch) => {
    dispatch(setNotification(notification));

    if (notificationId) {
      clearTimeout(notificationId);
    }

    notificationId = setTimeout(() => {
      dispatch(clearNotification());
    }, 5_000);
  };
};
export default notificationSlice.reducer;