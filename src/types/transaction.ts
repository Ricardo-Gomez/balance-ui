type TransactionType = {
  id: string;
  date: string;
  amount: number;
  isRecurrent: boolean;
  frequencyId?: string;
  details?: string;
  category: string;
  source: Source;
};
export type Source = {
  id: string;
  name: string;
  paymentType: 'Cash' | 'Card' | 'Other';
}
export type PaymentType = {
  paymentType: string;
  name: string;
};
export type ExpenseType = TransactionType;
export type IncomeType = Omit<TransactionType, "category">;
