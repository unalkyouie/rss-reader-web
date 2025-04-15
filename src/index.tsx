/// <reference types="react" />
/// <reference types="react-dom" />

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Starting to mount app...');

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  console.log('Root created, rendering app...');
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log('Render called');
} else {
  console.error('Root element not found');
}

