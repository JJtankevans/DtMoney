import { FormEvent, useState, useContext } from 'react';
import { TransactionsContext } from '../../TransactionsContext';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';


import { Container, TransactionTypeContainer, RadioBox } from './styles';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    //pega por desestruturação
    const { createTransaction } = useContext(TransactionsContext);
    
    const [title, setTitlte] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');

    const [type, setType] = useState('deposit');
    
    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault()

        await createTransaction({
            title,
            amount,
            category,
            type
        });

        //Necessário resetar os valores dos campos antes de fechar o modal
        setTitlte('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        //Fecha o modal
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type='button' onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input 
                    placeholder='Título' 
                    value={title} 
                    onChange={event => setTitlte(event.target.value)}
                />
                <input 
                    type="number" 
                    placeholder='Valor' 
                    value={amount} 
                    onChange={event=> setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type='button'
                        onClick={() => {setType('deposit'); }}
                        isActive= { type === 'deposit' }
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox >
                    <RadioBox 
                        type='button'
                        onClick={() => {setType('withdraw'); }}
                        isActive= { type === 'withdraw' }
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saida" />
                        <span>Saída</span>
                    </RadioBox >
                </TransactionTypeContainer>

                <input 
                    placeholder='Cartegoria' 
                    value={category}
                    onChange={event=> setCategory(event.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}