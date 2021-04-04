
import React, {useReducer, createContext} from 'react';
import contextReducer from './contextReducer'; 

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{
    "amount": 500,
    "category": "Car",
    "type": "Expense",
    "date": "2021-04-03",
    "id": "ea830792-643a-4709-973f-1891b3d670d3"
  }, 
  {
    "amount": 1515,
    "category": "Business",
    "type": "Income",
    "date": "2021-04-03",
    "id": "75677b1c-f1f6-4c77-8278-f2bf848304eb"
  }
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    // Action Creators
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    }

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    }

    const balance = transactions.reduce((acc, currVal)=>{
        return (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount)
    }, 0);

    

    return(
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )

}