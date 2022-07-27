import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from './services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

/* O código abaixo tem a mesma função que o do Omit 
interface TransactionInput {
    title: string;
    amount: number;
    type: string;
    category: string;
}
-> Esse aqui também
type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;*/

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionContextdata {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
}

//Cria um componente de contexto
export const TransactionsContext = createContext<TransactionContextdata>(
    {} as TransactionContextdata
);


/*Cria um componente React que recebe a propriedade children para que possa receber conteúdo react dentro dele
e dentro deste componente é onde é feita a requisição para a API e em seguida retorna o COMPONENTE DE CONTEXTO
contendo todos os CONTEÚDOS(entende-se nesse caso como os outros componentes presente no arquivo "App.tsx") para
renderizar dentro do "App.tsx" juntamente com os dados que foram carregados da API que estão sendo compartilhados
através do atributo value do COMPONENTE DE CONTEXTO
*/
export function TransactionProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, []);

    function createTransaction(transaction : TransactionInput) {
        api.post('/transactions', transaction)
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
};