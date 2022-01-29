import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Icon,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import { TFunction } from "react-i18next";
import { FiCheck, FiXCircle } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";

type TableListTypes = {
  tableCaption: string;
  values: [];
  headers: string[];
  t: TFunction;
};

export const TableList: React.FC<TableListTypes> = ({
  tableCaption,
  values,
  headers,
  t,
}) => {
  return (
    <Table variant='simple' size='sm'>
      <TableCaption placement='top'>{tableCaption}</TableCaption>
      <Thead>
        <Tr>
          {headers.map((h) =>
            h === "amount" ? (
              <Th isNumeric key={h}>{t(h, { ns: "forms" })}</Th>
            ) : (
              <Th isTruncated key={h}>{t(h, { ns: "forms" })}</Th>
            )
          )}
        </Tr>
      </Thead>
      <Tbody>
        {values.map((value, i) => (
          <Tr key={i}>
            {headers.map((h) => {
              if (h === "date") {
                return (
                  <Td key={`${value[h]}_${i}`}>
                    {t("date", { date: new Date(value[h]), ns: "dashboard" })}
                  </Td>
                );
              }
              if (h === "isRecurrent") {
                return (
                  <Td key={`${value[h]}_${i}`}>
                    {value[h] ? (
                      <Icon as={FiCheck} color='green' />
                    ) : (
                      <Icon as={FiXCircle} color='red' />
                    )}
                  </Td>
                );
              }
              if (h === "amount") {
                return (
                  <Td isNumeric key={`${value[h]}_${i}`}>
                    <Tag
                      colorScheme={tableCaption === t('incomes', {ns: 'dashboard'}) ? "green" : "red"}
                    >
                      <TagLeftIcon as={MdAttachMoney} />
                      <TagLabel>{value[h]}</TagLabel>
                    </Tag>
                  </Td>
                );
              }
              return <Td isTruncated key={`${value[h]}_${i}`}>{value[h]}</Td>;
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
