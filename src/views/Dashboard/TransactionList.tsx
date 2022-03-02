import React from "react";
import {
  Flex,
  Icon,
  Stack,
  Text,
  Tag,
  StackProps,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { BsCreditCard } from "react-icons/bs";
import {
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { GiMoneyStack, GiSideswipe } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { useRecoilCallback } from "recoil";
import { transactionInfoQuery } from "../../recoil/transactions";
import { Modal } from "../Common/Modal";

type RowData = {
  amount: number;
  source: { name: string; paymentType: string };
  date: string;
  id?: string;
};
type TransactionListProps = StackProps & {
  type: "Expenses" | "Incomes";
  limit: number;
  data: RowData[];
};

type TransactionRowProps = StackProps &
  RowData & {
    type: "Expenses" | "Incomes";
  };

export const TransactionList: React.FC<TransactionListProps> = ({
  type,
  limit,
  data,
  ...props
}) => {
  const { t } = useTranslation("dashboard");
  const renderList = () => {
    if (data.length === 0) {
      return (
        <Text align='center' shadow='md'>
          {t("noTransactions", { type: t(type.toLocaleLowerCase()) })}
        </Text>
      );
    }

    return data.map((t) => (
      <TransactionRow
        key={t.id}
        id={t.id}
        type={type}
        amount={t.amount}
        source={t.source}
        date={t.date}
        {...props}
      />
    ));
  };
  return (
    <Box maxH='300px' shadow={data.length === 0 ? "md" : "none"}>
      <Stack direction='column' align='stretch' spacing='1px' rounded='md'>
        <Text
          textAlign='center'
          p='2'
          fontSize='md'
          fontWeight='medium'
          bg={props.bg}
        >
          {t("latestTransaction", { type: t(type.toLocaleLowerCase()) })}
        </Text>
        {renderList()}
      </Stack>
    </Box>
  );
};

const TransactionRow: React.FC<TransactionRowProps> = ({
  id,
  amount,
  date,
  source,
  type,
  ...props
}) => {
  const { t } = useTranslation("dashboard");
  // const changeTransaction = useRecoilCallback(
  //   ({ snapshot }) =>
  //     async (transId) => {
  //       const tq = await snapshot.getPromise(transactionInfoQuery(transId));
  //       console.log("tq", tq);
  //     }
  // );

  return (
    <Stack direction='row' align='center' p='1' rounded='base' {...props}>
      <Flex alignSelf='center'>
        {source.paymentType.toLocaleLowerCase() === "card" ? (
          <Icon boxSize='2em' color='teal' as={BsCreditCard} />
        ) : source.paymentType.toLocaleLowerCase() === "cash" ? (
          <Icon boxSize='2em' color='teal' as={GiMoneyStack} />
        ) : (
          <Icon boxSize='2em' color='teal' as={GiSideswipe} />
        )}
      </Flex>
      <Stack direction='column' align='center' flexGrow={1}>
        <Text fontSize='small' fontWeight='semibold' maxW='100px' isTruncated>
          {source.name}
        </Text>
        <Text fontSize='x-small' fontWeight='semibold' color='gray'>
          {t("dateMedWeekday", { date: new Date(date) })}
        </Text>
      </Stack>
      <Flex>
        <Tag
          justifySelf='end'
          colorScheme={type === "Incomes" ? "green" : "red"}
          size='sm'
        >
          ${amount.toFixed(2)}
        </Tag>
      </Flex>
      <IconButton
        variant='ghost'
        colorScheme='red'
        aria-label='Delete'
        icon={<IoIosRemoveCircleOutline fontSize={"2em"} />}
      />
    </Stack>
  );
};
