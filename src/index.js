import React from 'react';
import ReactDOM from 'react-dom';
import { lazy } from '@ozo/lazy-loader';
import ErrorBoundary from './components/ErrorBoundary';
import './styles.css';

const LinkDemo = lazy(() => import('./pages/Link'));

function App() {
    return (
        <ErrorBoundary>
            <div className="App">                
                <LinkDemo />
            </div>
        </ErrorBoundary>
    );
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
