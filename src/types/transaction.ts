interface TransactionType {
  id: string;
  date: string;
  amount: number;
  isRecurrent: boolean;
  frequencyId?: string;
  details?: string;
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
export type ExpenseType = {
  category: string
} & TransactionType
export type IncomeType = Omit<TransactionType, "category">;
