"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Expense } from "@/types/expenses";
import { getExpenses } from "@/data/getExpenses";

interface MyExpensesContextType {
  expenses: Expense[] | undefined;
  setExpenses: React.Dispatch<React.SetStateAction<Expense[] | undefined>>;
}

const MyExpensesContext = createContext<MyExpensesContextType | null>(null);

export function MyExpensesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expenses, setExpenses] = useState<Expense[]>();
  useEffect(() => {
    getExpenses().then((data) => setExpenses(data));
  }, []);
  return (
    <MyExpensesContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </MyExpensesContext.Provider>
  );
}

export const useMyExpensesContext = () => {
  const context = useContext(MyExpensesContext);
  if (!context)
    throw new Error(
      "useMyExpensesContext must be used within MyExpensesProvider",
    );
  return context;
};
