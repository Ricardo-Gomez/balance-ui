import { atom } from "recoil";
import { DateTime } from "luxon";
import { ExpenseType, IncomeType } from "../../types/transaction";

const defaultIncomesState: IncomeType[] = [
  {
    amount: 0,
    date: DateTime.fromJSDate(new Date()).toISODate(),
    id: "",
    isRecurrent: false,
    source: { id: "", name: "", paymentType: "Other" },
  },
];
const defaultExpensesState: ExpenseType[] = [
  {
    amount: 0,
    date: DateTime.fromJSDate(new Date()).toISODate(),
    category: "",
    id: "",
    isRecurrent: false,
    source: { id: "", name: "", paymentType: "Other" },
  },
];

export const transactionsDateRangeState = atom({
  key: "transactionsDateRangeState",
  default: [
    DateTime.now().startOf("month").toJSDate(),
    DateTime.now().toJSDate(),
  ],
});
export const incomesState = atom({
  key: "incomesState",
  default: defaultIncomesState,
});

export const expensesState = atom({
  key: "expensesState",
  default: defaultExpensesState,
});

export const currentTransactionIdState = atom({
  key: "currentTransactionIdState",
  default: null,
});

export const selectedTransactionState = atom({
  key: "selectedTransactionState",
  default: {},
});

export const budgetState = atom({
  key: "budgetState",
  default: 10000,
});
