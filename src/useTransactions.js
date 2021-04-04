import React, { useContext} from 'react'
import {ExpenseTrackerContext} from './context/context';
import {incomeCategories, expenseCategories, resetCategories} from './constants/categories'

const useTransactions = (title) => {
    resetCategories();
    const {transactions} = useContext(ExpenseTrackerContext);
    const transactionsPerType = transactions.filter((t)=> t.type === title)
    const total = transactionsPerType.reduce((acc, currVal)=> acc += currVal.amount, 0);
    const categories = title === 'Income' ? incomeCategories : expenseCategories;

    transactionsPerType.forEach((t)=>{
        const category = categories.find((c)=> c.type === t.category);

        if(category) category.amount+=t.amount;
    });

    const filterdCategories = categories.filter((sc) => sc.amount > 0);
    
    const chartData = {
        datasets: [{
            data: filterdCategories.map((c)=> c.amount),
            backgroundColor:filterdCategories.map((c)=> c.color),
        }],
        labels: filterdCategories.map((c) => c.type),
    }

    return{ total, chartData}

}

export default useTransactions;