"use client";

import { useState } from "react";
import { useMyExpensesContext } from "@/context/context";
import { Expense } from "@/types/expenses";
import { Button, Form, Modal } from "react-bootstrap";

interface AddExpenseModalProps {
  show: boolean;
  onHide: () => void;
}

const AddExpenseModal = ({ show, onHide }: AddExpenseModalProps) => {
  const { expenses, setExpenses } = useMyExpensesContext();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newExpense: Expense = {
      id: (expenses?.length ?? 0) + 1,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
      description: form.description,
    };

    setExpenses((prev) => [...(prev ?? []), newExpense]);
    setForm({ amount: "", category: "", date: "", description: "" });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Expense
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExpenseModal;
