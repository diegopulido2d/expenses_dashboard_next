"use client";

import { useMyExpensesContext } from "@/context/context";
import { formatCurrency } from "@/utils/formatCurrency";
import { Card, Col, Row, Button } from "react-bootstrap";
import Link from "next/link";

const RecentExpenses = () => {
  const { expenses } = useMyExpensesContext();

  const recentExpenses = (() => {
    if (!expenses?.length) return [];

    return [...expenses]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  })();

  return (
    <Card>
      <Card.Header>
        <Card.Title className="mb-0">Recent Expenses</Card.Title>
      </Card.Header>
      <Card.Body>
        {recentExpenses.map((exp) => (
          <Row key={exp.id} className="py-2 border-bottom align-items-center">
            <Col>
              <p className="mb-0 text-muted small">{exp.date}</p>
              <p className="mb-0 fw-bold">{exp.description}</p>
              <p className="mb-0 text-muted">{exp.category}</p>
            </Col>
            <Col xs="auto">
              <p className="mb-0 fw-bold">{formatCurrency(exp.amount)}</p>
            </Col>
          </Row>
        ))}
      </Card.Body>
      <Card.Footer>
        <Link href="/expenses" passHref>
          <Button variant="primary" className="w-100">
            View All Expenses
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default RecentExpenses;
