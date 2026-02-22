import {createSlice} from "@reduxjs/toolkit";

const initialState = '';

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationText: (state, action) => {
            return action.payload;
        },
        removeNotificationText: (state, action) => {
            return initialState;
        }
    }
});

export const {setNotificationText, removeNotificationText} = notificationSlice.actions;

let notificationTimerId = 0;

export const showNotification = (message, durationInSeconds = 5) => {
    return (dispatch) => {
        if (notificationTimerId) {
            clearTimeout(notificationTimerId);
        }

        dispatch(setNotificationText(message));

        notificationTimerId = setTimeout(() => {
            dispatch(removeNotificationText());
        }, durationInSeconds * 1_000);
    };
};

export default notificationSlice.reducer;