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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-background ">
      <main className="flex flex-1 w-full max-w-8xl flex-col items-center justify-between py-8 sm:py-10 px-10 sm:px-16 bg-background sm:items-start">
        <div className="w-full">
          <div className="d-flex justify-content-between sm:align-items-center mb-4 flex-col sm:flex-row gap-4 sm:gap-0">
            <h1>Expenses</h1>
            <div className="flex flex-col gap-3 max-w-50">
              <Button onClick={() => setShowModal(true)}>+ Add Expense</Button>
              <Link href="/" passHref className="w-full">
                <Button variant="primary" className="w-full">
                  ← Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses?.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.description}</td>
                  <td>{exp.category}</td>
                  <td>{exp.date}</td>
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
