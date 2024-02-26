import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudget } from "./context/BugetContextApi";
import AddExpenseModal from "./components/AddExpenseModal";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = useBudget();

  function openAddExpenseModal(budgetId) {
    setShowExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowBudgetModal(true)}>
            Add Budgets
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridAutoColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (curr, acc) => curr + acc.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                openAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() =>
                  setViewExpenseModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            openAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setViewExpenseModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => {
          setShowExpenseModal(false);
        }}
      />
      <ViewExpensesModal
      budgetId={viewExpenseModalBudgetId}
      handleClose={() => setViewExpenseModalBudgetId()}
       />
    </>
  );
}

export default App;
