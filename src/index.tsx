import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {StyledEngineProvider} from '@mui/material/styles';
import Demo from './Demo';
import Header from './Header';

// @ts-ignore
ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <Header/>
            <Demo/>
        </StyledEngineProvider>
    </React.StrictMode>
);
