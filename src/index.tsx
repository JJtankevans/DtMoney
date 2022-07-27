import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer, Model } from 'miragejs';

const rootElement = document.getElementById('root');

createServer({

  //O mirage tem um "banco de dados" inbutido nele que permite a criação de uma tabela chamada transaction que é do tipo model
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-04-05 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: -1100,
          createdAt: new Date('2022-04-14 09:00:00'),
        },    
      ]
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    /*O request pega as informações do formulário que são enviadas, pelo axios, para esta rota lá do index
    do componente NewTransactionModal e como elas chega como uma string é necessário o JSON.parse para
    transformar em JSON em seguida usa-se o schema pata inserir um novo dado na tabela transaction criada lá em cima*/
    this.post('/transactions', (schema, request)=> {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
});

const root = ReactDOM.createRoot(rootElement!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

