import axios from "axios";
import { PaymentType, ExpenseType, IncomeType } from "../types/transaction";

let API_URL: string,
  GOOGLE_LOGIN_URL: string,
  REFRESH_TOKEN_URL: string,
  BASE_USERS_URL: string,
  BASE_TRANSACTION_URL: string;

export const api = {
  configure: (apiUrl: string) => {
    API_URL = apiUrl;
    GOOGLE_LOGIN_URL = `${API_URL}/auth/google`;
    REFRESH_TOKEN_URL = `${API_URL}/auth/refreshtoken`;
    BASE_USERS_URL = `${API_URL}/users`;
    BASE_TRANSACTION_URL = `${API_URL}/transactions`;
  },
  authGoogleWithToken: async (token: string) => {
    const { accessToken, refreshToken, user } = await api.post(
      GOOGLE_LOGIN_URL,
      { token }
    );
    return { accessToken, refreshToken, user };
  },
  refreshToken: async (token: string) => {
    const { accessToken, refreshToken } = await api.post(REFRESH_TOKEN_URL, {
      refreshToken: token,
    });
    return { accessToken, refreshToken };
  },
  getCategories: async () => {
    const categories = await api.get(`${BASE_USERS_URL}/categories`);
    return categories;
  },
  getPaymentTypes: async () => {
    const paymentTypes = await api.get(`${BASE_USERS_URL}/sources`);
    return paymentTypes;
  },
  getFrequencies: async () => {
    const frequencies = await api.get(`${BASE_USERS_URL}/frequencies`);
    return frequencies;
  },
  addCategory: async (name: string) => {
    const category = await api.post(`${BASE_USERS_URL}/category`, { name });
    return category;
  },
  addPaymentType: async ({ name, paymentType }: PaymentType) => {
    const response = await api.post(`${BASE_USERS_URL}/source`, {
      name,
      paymentType,
    });
    return response;
  },
  addExpense: async (expense: Omit<ExpenseType, 'id'>) => {
    const addedExpense = await api.post(
      `${BASE_TRANSACTION_URL}/expense`,
      expense
    );
    return addedExpense;
  },
  addIncome: async (income: Omit<IncomeType, 'id'>) => {
    const addedIncome = await api.post(
      `${BASE_TRANSACTION_URL}/income`,
      income
    );
    return addedIncome;
  },
  getTransactions: async (from: Date, to: Date) => {
    const transactionsPromise = await Promise.all([
      api.get(
        `${BASE_TRANSACTION_URL}/incomes?from=${encodeURI(
          from.toISOString()
        )}&to=${encodeURI(to.toISOString())}`
      ),
      api.get(
        `${BASE_TRANSACTION_URL}/expenses?from=${encodeURI(
          from.toISOString()
        )}&to=${encodeURI(to.toISOString())}`
      ),
    ]);
    return {
      incomes: transactionsPromise[0],
      expenses: transactionsPromise[1],
    };
  },
  deleteTransaction: async (id: string) => {
    return axios.delete(`${BASE_TRANSACTION_URL}/${id}`).then((response) => response.data);
  },
  post: async (url: string, body: Record<string, any>) => {
    return axios.post(url, body).then((response) => response.data);
    //   .catch((error) => {
    //       console.log(error);
    //   });
  },
  get: async (url: string) => {
    return axios.get(url).then((response) => response.data);
    //   .catch(handleError)
  },
};
