import { Expense } from "@/types/expenses";

export const getExpenses = (): Promise<Expense[]> => {
  return fetch("./expenses.json")
    .then((response) => {
      if (!response.ok) throw new Error("Local file not found");
      return response.json();
    })
    .then((data: Expense[]) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });
};
