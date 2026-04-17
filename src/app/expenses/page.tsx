"use client";

import { useState, useMemo } from "react";
import { useMyExpensesContext } from "@/context/context";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button, Table, Form, InputGroup } from "react-bootstrap";
import AddExpenseModal from "@/components/addExpenseModal";
import Link from "next/link";
import { Expense } from "@/types/expenses";

type SortField = "amount" | "date" | "category";
type SortDirection = "asc" | "desc";

const ExpensesPage = () => {
  const { expenses } = useMyExpensesContext();
  const [showModal, setShowModal] = useState(false);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return " ↕";
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  const processedExpenses = useMemo(() => {
    if (!expenses) return [];

    // Filter by search query
    let result = expenses.filter((exp) =>
      exp.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    // Sort
    if (sortField) {
      result = [...result].sort((a: Expense, b: Expense) => {
        if (sortField === "amount") {
          return sortDirection === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        }
        if (sortField === "date") {
          return sortDirection === "asc"
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date);
        }
        if (sortField === "category") {
          return sortDirection === "asc"
            ? a.category.localeCompare(b.category)
            : b.category.localeCompare(a.category);
        }
        return 0;
      });
    }

    return result;
  }, [expenses, sortField, sortDirection, searchQuery]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-background">
      <main className="flex flex-1 w-full max-w-8xl flex-col items-center justify-between py-8 sm:py-10 px-10 sm:px-16 bg-background sm:items-start">
        <div className="w-full">
          <div className="d-flex justify-content-between sm:align-items-center mb-4 flex-col sm:flex-row gap-4 sm:gap-0">
            <div className="flex flex-col gap-3">
              <h1>Expenses</h1>
              {/* Search bar */}
              <InputGroup className="mb-4">
                <Form.Control
                  className="sm:!w-100"
                  placeholder="Search by description..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setSearchQuery(searchInput)
                  }
                />
                <Button
                  variant="primary"
                  onClick={() => setSearchQuery(searchInput)}
                >
                  Search
                </Button>
                {searchQuery && (
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setSearchInput("");
                      setSearchQuery("");
                    }}
                  >
                    Clear
                  </Button>
                )}
              </InputGroup>
            </div>
            <div className="flex flex-col gap-4 max-w-50">
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
                <th
                  onClick={() => handleSort("category")}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  Category{sortIcon("category")}
                </th>
                <th
                  onClick={() => handleSort("date")}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  Date{sortIcon("date")}
                </th>
                <th
                  onClick={() => handleSort("amount")}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  Amount{sortIcon("amount")}
                </th>
              </tr>
            </thead>
            <tbody>
              {processedExpenses.map((exp) => (
                <tr key={exp.id}>
                  <td>{exp.description}</td>
                  <td>{exp.category}</td>
                  <td>{exp.date}</td>
                  <td>{formatCurrency(exp.amount)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {processedExpenses.length === 0 && (
            <p className="text-center text-muted">No expenses found.</p>
          )}

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
