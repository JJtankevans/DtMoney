import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer } from 'miragejs';

const rootElement = document.getElementById('root');

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]
    })
  }
});

const root = ReactDOM.createRoot(rootElement!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

