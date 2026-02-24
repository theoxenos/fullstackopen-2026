import { createContext, useReducer } from "react";
import { NotificationType } from "../constants/enums.js";

export const NotificationActions = {
    SET_NOTIFICATION: 'SET_NOTIFICATION',
    CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION'
};

const initialState = {};

const notificationReducer = (state, action) => {
    switch (action.type) {
        case NotificationActions.SET_NOTIFICATION:
            return action.payload;
        case NotificationActions.CLEAR_NOTIFICATION:
            return initialState;
        default:
            return state;
    }
};

const NotificationContext = createContext(null);

export const NotificationContextProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, initialState);

    const setNotification = (payload) => dispatch({ type: NotificationActions.SET_NOTIFICATION, payload });
    const clearNotification = () => dispatch({ type: NotificationActions.CLEAR_NOTIFICATION });

    const showNotification = (message, type = NotificationType.SUCCESS) => {
        setNotification({ type, message });

        setTimeout(() => clearNotification(), 3_000);
    };

    return (
        <NotificationContext.Provider value={{ notification, showNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;