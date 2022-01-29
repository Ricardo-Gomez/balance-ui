import { selector, selectorFamily } from "recoil";
import {
  incomesState,
  expensesState,
  budgetState,
  transactionsDateRangeState,
  currentTransactionIdState,
} from "./atoms";
import { DateTime } from "luxon";
import { api } from "../../api";
import { ExpenseType, IncomeType } from "../../types/transaction";

export const transactionInfoQuery = selectorFamily({
  key: "transactionInfoQuery",
  get:
    (transId) =>
    ({ get }) => {
      const incomes = get(incomesState);
      const expenses = get(expensesState);

      const transactions = incomes.concat(expenses);
      const selected = transactions.find((t) => t.id === transId);

      return selected;
    },
});

export const currentTransactionInfoQuery = selector({
  key: "currentTransactionInfoQuery",
  get: ({ get }) => get(transactionInfoQuery(get(currentTransactionIdState))),
});

export const incomesOrderByDate = selector({
  key: "incomesOrderByDate",
  get: ({ get }) => {
    const incomes = get(incomesState);
    const orderedIncomesDesc =
      incomes === []
        ? []
        : [...incomes].sort((a, b) => {
            return (
              DateTime.fromISO(b.date).toMillis() -
              DateTime.fromISO(a.date).toMillis()
            );
          });

    const orderedIncomesAsc = [...orderedIncomesDesc].reverse();
    return {
      orderedIncomesAsc,
      orderedIncomesDesc,
    };
  },
});

export const expensesOrderByDate = selector({
  key: "expensesOrderByDate",
  get: ({ get }) => {
    const expenses = get(expensesState);
    const orderedExpensesDesc =
      expenses === []
        ? []
        : [...expenses].sort((a, b) => {
            return (
              DateTime.fromISO(b.date).toMillis() -
              DateTime.fromISO(a.date).toMillis()
            );
          });

    const orderedExpensesAsc = [...orderedExpensesDesc].reverse();
    return {
      orderedExpensesAsc,
      orderedExpensesDesc,
    };
  },
});

export const transactionsQueryByDate = selector({
  key: "transactionsQueryByDate",
  get: async ({ get }) => {
    const dates = get(transactionsDateRangeState);

    console.log(dates);
    let fetchedIncomes: IncomeType[];
    let fetchedExpenses: ExpenseType[];

    try {
      const { expenses, incomes } = await api.getTransactions(
        dates[0],
        dates[1]
      );
      fetchedIncomes = incomes;
      fetchedExpenses = expenses;

      return {
        incomes: fetchedIncomes,
        expenses: fetchedExpenses,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error Fetching transactions");
    }
  },
});

export const transactionsStatsState = selector({
  key: "transactionsStatsState",
  get: ({ get }) => {
    const incomes = get(incomesState);
    const expenses = get(expensesState);

    const budget = get(budgetState);
    const incomesBalance = incomes.reduce((t, c) => t + c.amount, 0).toFixed(2);
    const expensesBalance = expenses
      .reduce((t, c) => t + c.amount, 0)
      .toFixed(2);

    const budgetAvailable = budget - parseFloat(expensesBalance);
    const budgetSpent = budget - parseFloat(expensesBalance);

    const mostUsedCategories = new Map<string, number>();
    expenses.forEach((e) => {
      if (!mostUsedCategories.has(e.category)) {
        mostUsedCategories.set(e.category, 1);
      } else {
        const sum: number = mostUsedCategories.get(e.category) || 0;
        mostUsedCategories.set(e.category, sum + 1);
      }
    });

    return {
      incomesBalance,
      expensesBalance,
      budgetAvailable,
      budgetSpent,
      mostUsedCategories,
    };
  },
});
