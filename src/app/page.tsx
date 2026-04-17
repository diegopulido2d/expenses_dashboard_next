import MonthlyTotals from "@/components/monthlyTotals";
import TopCategories from "@/components/topCategories";
import RecentExpenses from "@/components/recentExpenses";
import ExpensesByCategory from "@/components/expensesByCategory";
import { Col, Row } from "react-bootstrap";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans bg-background ">
      <main className="flex flex-1 w-full max-w-8xl flex-col items-center justify-between py-8 sm:py-20 px-10 sm:px-16 bg-background sm:items-start">
        <div className="w-full flex flex-col gap-4">
          <Row className="gap-4 sm:!gap-0">
            <Col md={8}>
              <TopCategories />
            </Col>
            <Col md={4}>
              <MonthlyTotals />
            </Col>
          </Row>
          <Row className="gap-4 sm:!gap-0">
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
