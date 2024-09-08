import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app';
import { Provider } from 'react-redux';
import {ErrorBoundary} from "./shared/routing/ErrorBoundary";
import {Info} from "./pages/info/Info";
import NotFound from "./pages/not-found";
import {store} from "./shared/store";
import {Auth} from "./pages/auth";
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                path: '/info',
                element: <Info />,
            },
            {
                path: '/auth',
                element: <Auth />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);
