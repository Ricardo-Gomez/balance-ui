import {
  Flex,
  Icon,
  Tag,
  TagCloseButton,
  TagLabel,
  SimpleGrid,
  Text,
  CloseButton,
  Heading,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AddPaymentSource } from "../Forms";
import { categories, paymentTypes } from "../../recoil/userData";
import { AddCategory } from "../Forms/AddCategory";
import { api } from "../../api";
import { BsCreditCard } from "react-icons/bs";
import { GiMoneyStack, GiSideswipe } from "react-icons/gi";

const Settings: React.FC = () => {
  const setCategory = useSetRecoilState(categories);
  const setPaymentTypes = useSetRecoilState(paymentTypes);
  const categoriesState = useRecoilValue(categories);
  const paymentTypesState = useRecoilValue(paymentTypes);

  const handleDeleteCategory = async (id: string) => {
    const category = await api.deleteCategory(id);
    const categories = categoriesState.filter((c) => c.id !== category.id);
    setCategory(categories);
  };
  const handleDeletePaymentType = async (id: string) => {
    const paymentType = await api.deletePaymentType(id);
    const paymentTypes = paymentTypesState.filter(
      (p) => p.id !== paymentType.id
    );
    setPaymentTypes(paymentTypes);
  };
  const { t } = useTranslation(["forms", "appContainer"]);
  return (
    <Flex flexWrap='wrap'>
      <Flex
        p={5}
        shadow='md'
        borderWidth='1px'
        flexDir='column'
        flex='50%'
        maxH='500px'
      >
        <Heading size='lg' textAlign='center'>
          {t("paymentMethods")}
        </Heading>
        <AddPaymentSource t={t} />
        <Box overflow='auto'>
          <SimpleGrid mt='1em' columns={4} spacingX='10px' spacingY='5px'>
            {paymentTypesState.map((payment) => {
              if (payment.paymentType.toLocaleLowerCase() !== "cash") {
                return (
                  <Flex
                    key={payment.id}
                    padding='1'
                    margin='1'
                    alignItems='center'
                    flexFlow='column'
                    border='1px'
                  >
                    <CloseButton
                      alignSelf='end'
                      size='sm'
                      onClick={() => handleDeletePaymentType(payment.id)}
                    />
                    {payment.paymentType.toLocaleLowerCase() === "card" ? (
                      <Icon color='teal' as={BsCreditCard} />
                    ) : payment.paymentType.toLocaleLowerCase() === "cash" ? (
                      <Icon color='teal' as={GiMoneyStack} />
                    ) : (
                      <Icon color='teal' as={GiSideswipe} />
                    )}
                    <Text>{payment.name}</Text>
                  </Flex>
                );
              }
            })}
          </SimpleGrid>
        </Box>
      </Flex>
      <Flex
        p={5}
        shadow='md'
        borderWidth='1px'
        flexDir='column'
        flex='50%'
        maxH='500px'
        overflow='auto'
      >
        <Heading size='lg' textAlign='center'>
          {t("categories")}
        </Heading>
        <AddCategory t={t} />
        <Box mt='1em'>
          {categoriesState.map((cat) => (
            <Tag size='md' key={cat.id} variant='outline' m='5px'>
              <TagLabel>{cat.name}</TagLabel>
              <TagCloseButton onClick={() => handleDeleteCategory(cat.id)} />
            </Tag>
          ))}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Settings;
