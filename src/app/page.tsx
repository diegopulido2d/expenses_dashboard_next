import MonthlyTotals from "@/components/monthlyTotals";
import TopCategories from "@/components/topCategories";
import RecentExpenses from "@/components/recentExpenses";
import ExpensesByCategory from "@/components/expensesByCategory";
import { Col, Row } from "react-bootstrap";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-8xl flex-col items-center justify-between py-20 px-16 dark:bg-black sm:items-start">
        <div className="w-full flex flex-col gap-4">
          <Row>
            <Col md={8}>
              <TopCategories />
            </Col>
            <Col md={4}>
              <MonthlyTotals />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <ExpensesByCategory />
            </Col>
            <Col md={4}>
              <RecentExpenses />
            </Col>
          </Row>
        </div>
      </main>
    </div>
  );
}
