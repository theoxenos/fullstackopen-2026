import { QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './NotificationContext.jsx';
import { UserContextProvider } from './UserContextProvider.jsx';
import { queryClient } from '../queryClient.js';

export const AppProviders = ({ children }) => {
    return (
        <NotificationContextProvider>
            <UserContextProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </UserContextProvider>
        </NotificationContextProvider>
    );
};
