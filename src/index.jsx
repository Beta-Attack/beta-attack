import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import reset from './style/reset.css';
import style from './style/style.scss';

render(<App />, document.getElementById('container'));
