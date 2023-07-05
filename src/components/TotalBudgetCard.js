import React from "react";
import BudgetCard from "./BudgetCard";
import { useBudget } from "../context/BugetContextApi";

const TotalBudgetCard = (props) => {
  const { expenses, budgets } = useBudget();

  const amount = expenses.reduce((curr, acc) => curr + acc.amount, 0);

  const max = budgets.reduce((curr, acc) => curr + acc.max, 0);

  if (max === 0) return null;

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
};

export default TotalBudgetCard;
