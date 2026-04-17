"use client";

import { useState } from "react";
import { useMyExpensesContext } from "@/context/context";
import { Expense } from "@/types/expenses";
import { Button, Form, Modal } from "react-bootstrap";
import { categories } from "@/constants/categories";

interface AddExpenseModalProps {
  show: boolean;
  onHide: () => void;
}

const AddExpenseModal = ({ show, onHide }: AddExpenseModalProps) => {
  const { expenses, setExpenses } = useMyExpensesContext();

  const [form, setForm] = useState({
    amount: "",
    category: categories[0],
    date: "",
    description: "",
  });

  // Handler for text/number/date inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for select dropdown
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }

    const newExpense: Expense = {
      id: (expenses?.length ?? 0) + 1,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
      description: form.description,
    };

    setExpenses((prev) => [...(prev ?? []), newExpense]);
    setForm({
      amount: "",
      category: categories[0],
      date: "",
      description: "",
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              required
            />
          </Form.Group>

          <div className="flex w-full gap-3">
            <Form.Group className="mb-3 w-[50%]">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 w-[50%]">
              <Form.Label>Date</Form.Label>
              <Form.Control
                name="date"
                type="date"
                value={form.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={form.category}
              onChange={handleSelectChange}
              required
            >
              {categories.map((category: string) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Expense
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
