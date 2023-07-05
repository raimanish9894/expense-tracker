import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudget, UNCATEGORIZED_BUDGET_ID } from '../context/BugetContextApi'

const UncategorizedBudgetCard = (props) => {

    const { getBudgetExpenses } = useBudget();

    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((curr, acc) => curr + acc.amount, 0) 

    if(amount === 0) return null


  return (
    <BudgetCard amount={amount} name="Uncategorized" gray {...props} />
  )
}

export default UncategorizedBudgetCard