import { createContext, useReducer } from 'react';
import blogService from '../services/blog-service.js';

const UserContext = createContext(null);

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'CLEAR_USER':
            return null;
        default:
            return state;
    }
};

export const UserContextProvider = ({ children }) => {
    const [user, userDispatch] = useReducer(userReducer, null);

    return (
        <UserContext.Provider value={{ user, userDispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export const setUser = (user) => {
    if (user) {
        blogService.setToken(user.token);
        localStorage.setItem('user', JSON.stringify(user));
    }
    return { type: 'SET_USER', payload: user };
};

export const clearUser = () => {
    blogService.setToken(null);
    localStorage.clear();
    return { type: 'CLEAR_USER' };
};

export const initializeUser = () => {
    console.log('initializeUser');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        blogService.setToken(storedUser.token);
        return { type: 'SET_USER', payload: storedUser };
    }
    return { type: 'CLEAR_USER' };
};

export default UserContext;
