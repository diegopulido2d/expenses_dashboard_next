"use client";

import { useMyExpensesContext } from "@/context/context";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card } from "react-bootstrap";

const MonthlyTotals = () => {
  const { expenses } = useMyExpensesContext();

  const totalSpent = expenses?.reduce((acc, exp) => acc + exp.amount, 0) ?? 0;

  // Average per day
  const averagePerDay = (() => {
    if (!expenses?.length) return 0;

    const totalPerDay = expenses.reduce<Record<string, number>>((acc, exp) => {
      acc[exp.date] = (acc[exp.date] ?? 0) + exp.amount;
      return acc;
    }, {});

    const days = Object.values(totalPerDay);
    return days.reduce((acc, day) => acc + day, 0) / days.length;
  })();

  // Transactions in the current month
  const currentMonthTransactions = (() => {
    if (!expenses?.length) return 0;

    const now = new Date();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentYear = String(now.getFullYear());

    return expenses.filter((exp) => {
      const [year, month] = exp.date.split("-");
      return month === currentMonth && year === currentYear;
    }).length;
  })();

  return (
    <Card className="h-full">
      <Card.Body>
        <Card.Title>Monthly Total</Card.Title>
        <Card.Text>{formatCurrency(totalSpent)}</Card.Text>
        <Card.Title>Daily Average</Card.Title>
        <Card.Text>{formatCurrency(averagePerDay)}</Card.Text>
        <Card.Title>Transactions This Month</Card.Title>
        <Card.Text>{currentMonthTransactions}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MonthlyTotals;
