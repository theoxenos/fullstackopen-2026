import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AppProviders } from "./contexts/AppProviders.jsx";
import { BrowserRouter as Router } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AppProviders>
            <Router>
                <App/>
            </Router>
            <ReactQueryDevtools/>
        </AppProviders>
    </StrictMode>,
);
