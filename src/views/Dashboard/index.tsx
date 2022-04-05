import React, { useEffect } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  useColorModeValue,
  HStack,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  expensesState,
  incomesState,
  transactionsStatsState,
  incomesOrderByDate,
  expensesOrderByDate,
  transactionsDateRangeState,
  transactionsQueryByDate,
} from "../../recoil/transactions";
import { TransactionList } from "./TransactionList";
import { ExpenseType, IncomeType } from "../../types/transaction";
import { api } from "../../api";

const Dashboard: React.FC = () => {
  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const [incomes, setIncomes] = useRecoilState(incomesState);
  const [expenses,setExpenses] = useRecoilState(expensesState);
  const { expensesBalance, budgetAvailable, incomesBalance, generalBalance } = useRecoilValue(
    transactionsStatsState
  );
  const { orderedIncomesDesc } = useRecoilValue(incomesOrderByDate);
  const { orderedExpensesDesc } = useRecoilValue(expensesOrderByDate);
  const dates = useRecoilValue(transactionsDateRangeState);
  const {incomes: incomesQuery, expenses: expensesQuery} = useRecoilValue(transactionsQueryByDate);

  const { t } = useTranslation(["dashboard", "forms"]);

  const handleDeleteTransaction = async (
    id: string,
    type: "Incomes" | "Expenses"
  ) => {
    await api.deleteTransaction(id).then((deleted) => {
      console.log(deleted)
      if (type === "Expenses") {
        const t = expenses.filter((t) => t.id !== id); // must find a way to improve performance
        setExpenses(t as ExpenseType[]);
      } else {
        const t = incomes.filter((t) => t.id !== id);
        setIncomes(t as IncomeType[]);
      }
    });
  };

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      if (isMounted) {
        setIncomes(incomesQuery);
        setExpenses(expensesQuery);
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
  }, [incomesQuery, expensesQuery, setExpenses, setIncomes]);

  return (
    <Grid w={"100%"} templateColumns='repeat(6, 1fr)' gap={2}>
      <GridItem rowSpan={1} colSpan={2}>
        <Stat boxShadow='md' bg={bg} rounded='md' p='.5em'>
          <StatLabel>{t("incomes")}</StatLabel>
          <StatNumber>$ {incomesBalance}</StatNumber>
          <StatHelpText>
            {t("date", { date: new Date(dates[0]) })} -{" "}
            {t("date", { date: new Date(dates[1]) })}
          </StatHelpText>
        </Stat>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Stat boxShadow='md' bg={bg} rounded='md' p='.5em'>
          <StatLabel>{t("expenses")}</StatLabel>
          <StatNumber>$ {expensesBalance}</StatNumber>
          <StatHelpText>
            {t("date", { date: dates[0] })} -{t("date", { date: dates[1] })}
          </StatHelpText>
        </Stat>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2}>
        <Stat boxShadow='md' bg={bg} rounded='md' p='.5em'>
          <StatLabel>{t("Balance")}</StatLabel>
          <StatNumber color={generalBalance > 0 ? 'green.200' : 'red.200'}>$ {generalBalance}</StatNumber>
          <StatHelpText>{t("totalBalance")}</StatHelpText>
        </Stat>
      </GridItem>
      {/* <GridItem rowSpan={1} colSpan={2}>
        <Stat boxShadow='md' bg={bg} rounded='md' p='.5em'>
          <StatLabel>{t("budget")}</StatLabel>
          <StatNumber>$ {budgetAvailable}</StatNumber>
          <StatHelpText>{t("budgetAvailable")}</StatHelpText>
        </Stat>
      </GridItem> */}
      <GridItem colSpan={[6, 3]} rowSpan={1}>
        <TransactionList
          handleDelete={handleDeleteTransaction}
          w='100%'
          data={orderedIncomesDesc}
          bg={bg}
          type='Incomes'
          limit={10}
        />
      </GridItem>
      <GridItem colSpan={[6, 3]} rowSpan={1}>
        <TransactionList
          handleDelete={handleDeleteTransaction}
          w='100%'
          data={orderedExpensesDesc}
          bg={bg}
          type='Expenses'
          limit={10}
        />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
