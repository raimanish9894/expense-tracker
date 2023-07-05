import React ,{ useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudget(){
    return useContext(BudgetContext)
}

export const BudgetProvider = ({ children }) => {

    const [ budgets, setBudgets ] = useLocalStorage("budgets",[]);
    const[ expenses, setExpenses ] = useLocalStorage("expenses",[]);
    
    function getBudgetExpenses(budgetId){
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    function addBudget({name, max}){
        setBudgets(prevBudget => {
            if(prevBudget.find(budget => budget.name === name)){
                return prevBudget
            }
            return [...prevBudget, { id: uuidV4(), name, max} ]
        })
    }

    function addExpense({description, amount, budgetId}){
        setExpenses(prevExpense => {
            return [...prevExpense, { id: uuidV4(), description, amount, budgetId} ]
        })
    }

    function deleteBudget({id}){
        setBudgets(prevBudget => {
            return prevBudget.filter(budget => budget.id !== id)
        })
    }

    function deleteExpense({id}){
        setExpenses(prevExpense => {
            return prevExpense.filter(expense => expense.id !== id)
        })
    }

    return <BudgetContext.Provider value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>
        {children}
    </BudgetContext.Provider>
}