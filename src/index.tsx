import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import './styles/normalize.css';
import './styles/style.css'

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
