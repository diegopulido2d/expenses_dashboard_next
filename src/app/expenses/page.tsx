"use client";

import { useState } from "react";
import { useMyExpensesContext } from "@/context/context";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button, Table } from "react-bootstrap";
import AddExpenseModal from "@/components/addExpenseModal";
import Link from "next/link";

const ExpensesPage = () => {
  const { expenses } = useMyExpensesContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-8xl flex-col items-center justify-between py-20 px-16 dark:bg-black sm:items-start">
        <div className="w-full">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Expenses</h1>
            <div className="flex flex-col gap-3">
              <Button onClick={() => setShowModal(true)}>+ Add Expense</Button>
              <Link href="/" passHref>
                <Button variant="primary">← Back to Dashboard</Button>
              </Link>
            </div>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses?.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.id}</td>
                  <td>{exp.date}</td>
                  <td>{exp.description}</td>
                  <td>{exp.category}</td>
                  <td>{formatCurrency(exp.amount)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <AddExpenseModal
            show={showModal}
            onHide={() => setShowModal(false)}
          />
        </div>
      </main>
    </div>
  );
};

export default ExpensesPage;
