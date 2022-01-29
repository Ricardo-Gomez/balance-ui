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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
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

const Dashboard: React.FC = () => {
  const bg = useColorModeValue("gray.100", "whiteAlpha.200");
  const setIncomes = useSetRecoilState(incomesState);
  const setExpenses = useSetRecoilState(expensesState);
  const {
    expensesBalance,
    budgetAvailable,
    incomesBalance,
  } = useRecoilValue(transactionsStatsState);
  const { orderedIncomesDesc } = useRecoilValue(incomesOrderByDate);
  const { orderedExpensesDesc } = useRecoilValue(expensesOrderByDate);
  const dates = useRecoilValue(transactionsDateRangeState);
  const transactions = useRecoilValue(transactionsQueryByDate);

  const { t } = useTranslation(["dashboard", "forms"]);

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      if (isMounted) {
        setIncomes(transactions.incomes);
        setExpenses(transactions.expenses);
      }
    };
    getData();
    return () => {
      isMounted = false;
    };
  }, [transactions, setExpenses, setIncomes]);

  return (
    <HStack align='start' spacing='15px'>
      <SimpleGrid columns={2} spacingX='15px' spacingY='20px'>
        <Stat boxShadow='md' bg={bg} rounded='md' p='.5em'>
          <StatLabel>{t("incomes")}</StatLabel>
          <StatNumber>$ {incomesBalance}</StatNumber>
          <StatHelpText>
            {t("date", { date: new Date(dates[0]) })} -{" "}
            {t("date", { date: new Date(dates[1]) })}
          </StatHelpText>
          <StatHelpText>
            <StatArrow type='increase' />
            23%
          </StatHelpText>
        </Stat>
        <Stat boxShadow='md' bg={bg} rounded='md' p='.5em'>
          <StatLabel>{t("expenses")}</StatLabel>
          <StatNumber>$ {expensesBalance}</StatNumber>
          <StatHelpText>
            {t("date", { date: dates[0] })} -{t("date", { date: dates[1] })}
          </StatHelpText>
          <StatHelpText>
            <StatArrow type='decrease' />
            23%
          </StatHelpText>
        </Stat>
        <Stat boxShadow='md' bg={bg} rounded='md' p='.5em'>
          <StatLabel>{t("budget")}</StatLabel>
          <StatNumber>$ {budgetAvailable}</StatNumber>
          <StatHelpText>{t("budgetAvailable")}</StatHelpText>
        </Stat>
      </SimpleGrid>
      <SimpleGrid columns={2} spacingX='15px' spacingY='20px'>
        <TransactionList
          data={orderedIncomesDesc}
          bg={bg}
          type='Income'
          limit={10}
        />
        <TransactionList
          data={orderedExpensesDesc}
          bg={bg}
          type='Expense'
          limit={10}
        />
      </SimpleGrid>
    </HStack>
  );
};

export default Dashboard;
