"use client";

import { useMyExpensesContext } from "@/context/context";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card, Col, Row } from "react-bootstrap";

const TopCategories = () => {
  const { expenses } = useMyExpensesContext();

  const topCategories = (() => {
    if (!expenses?.length) return [];

    const now = new Date();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    const currentYear = String(now.getFullYear());

    // Filter current month expenses
    const currentMonthExpenses = expenses.filter((exp) => {
      const [year, month] = exp.date.split("-");
      return month === currentMonth && year === currentYear;
    });

    // Group and sum by category
    const totalPerCategory = currentMonthExpenses.reduce<
      Record<string, number>
    >((acc, exp) => {
      acc[exp.category] = (acc[exp.category] ?? 0) + exp.amount;
      return acc;
    }, {});

    // Sort by amount and take top 3
    return Object.entries(totalPerCategory)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  })();

  return (
    <Row xs={1} md={3} className="g-4">
      {topCategories.map(([category, total], index) => (
        <Col key={category}>
          <Card className="h-100">
            <Card.Body>
              <Card.Subtitle className="text-muted mb-2">
                #{index + 1}
              </Card.Subtitle>
              <Card.Title>{category}</Card.Title>
              <Card.Text>{formatCurrency(total)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TopCategories;
