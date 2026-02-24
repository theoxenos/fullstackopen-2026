import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ContextProviders from "./components/contexts/ContextProviders.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ContextProviders>
        <App/>
    </ContextProviders>,
);
