"use client";

import { useMyExpensesContext } from "@/context/context";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ExpensesByCategory = () => {
  const { expenses } = useMyExpensesContext();

  const chartData = (() => {
    if (!expenses?.length) return [];

    const now = new Date();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentYear = String(now.getFullYear());

    const currentMonthExpenses = expenses.filter((exp) => {
      const [year, month] = exp.date.split("-");
      return month === currentMonth && year === currentYear;
    });

    const totalPerCategory = currentMonthExpenses.reduce<
      Record<string, number>
    >((acc, exp) => {
      acc[exp.category] = (acc[exp.category] ?? 0) + exp.amount;
      return acc;
    }, {});

    return Object.entries(totalPerCategory)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);
  })();

  return (
    <Card className="!h-full">
      <Card.Header>
        <Card.Title className="mb-0">Spending by Category</Card.Title>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Bar dataKey="total" fill="#0d6efd" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default ExpensesByCategory;
