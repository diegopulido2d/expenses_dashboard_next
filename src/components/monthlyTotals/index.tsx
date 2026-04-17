"use client";

import { useMyExpensesContext } from "@/context/context";
import { Card } from "react-bootstrap";

const MonthlyTotals = () => {
  const { expenses } = useMyExpensesContext();

  const totalSpent = expenses?.reduce((acc, exp) => acc + exp.amount, 0) ?? 0;
  const formattedTotal = totalSpent.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>Monthly Total</Card.Title>
        <Card.Text>{formattedTotal}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MonthlyTotals;
