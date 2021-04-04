import React from 'react';
import ReactDOM from 'react-dom';
import {SpeechProvider} from '@speechly/react-client';


import {Provider} from './context/context'
import App from './App';
import './index.css';

ReactDOM.render(
    <SpeechProvider appId='482aebe4-0f43-4e58-9fcf-b63d776491af' language='en-US'>
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>
    , document.getElementById('root'));


