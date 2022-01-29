import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  NumberInputField,
  NumberInput,
  InputGroup,
  VStack,
  StackDivider,
  Grid,
  Switch,
  useToast,
} from "@chakra-ui/react";
import DatePicker from "react-date-picker";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { queryFrequenciesValue, categories, paymentTypes } from "../../recoil/userData";
import { expensesState, incomesState } from "../../recoil/transactions";
import { InputSelect } from "../Common/InputSelect";
import { api } from "../../api";
import { ExpenseType } from "../../types/transaction";

type FormValues = ExpenseType;
// {
//   category: string;
//   source: string;
//   amount: string;
//   date: Date;
//   isRecurrent: boolean;
//   frequencyId?: string;
//   details?: string;
// };
type TransactionFormProps = {
  formType: "Expense" | "Income";
  t: Function;
};

export const TransactionForm = ({ formType, t }: TransactionFormProps) => {
  const {
    handleSubmit,
    register,
    unregister,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const {frequencies} = useRecoilValue(queryFrequenciesValue);
  const categoriesState = useRecoilValue(categories);
  const paymentTypesState = useRecoilValue(paymentTypes);
  const setIncome = useSetRecoilState(incomesState);
  const setExpense = useSetRecoilState(expensesState);
  const toast = useToast();

  const [dateValue, setDateValue] = React.useState(new Date());
  const [amountValue, setAmountValue] = React.useState("0");
  const [isRecurrentChecked, setIsRecurrentChecked] = React.useState(false);

  const toggleFrequency = (show: boolean) => {
    setIsRecurrentChecked(show);
    if (!show) {
      unregister("frequency");
    }
  };
  register("date", { required: true, value: dateValue, valueAsDate: true });
  register("amount", {
    required: true,
    value: amountValue,
    validate: (value) =>
      Number(value) > 0 || t("validation.amountMissing", { ns: "forms" }),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (formType === "Expense") {
        console.log(values);
        const expense = await api.addExpense(values);
        setExpense((oldList) => [...oldList, expense]);
        
      } else if (formType === "Income") {
        const income = await api.addIncome(values);
        setIncome((oldList) => [...oldList, income])
        console.log(income);
      }
      toast({
        title: t("submitSuccess", {
          formType: t(formType.toLowerCase(), { ns: "forms" }),
          amountValue: values.amount,
          ns: "forms",
        }),
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: t("submitFailed", {
          formType: t(formType.toLowerCase(), { ns: "forms" }),
          ns: "forms",
        }),
        status: "error",
        isClosable: true,
      });
    }
    reset(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing='4' divider={<StackDivider borderColor='gray.200' />}>
        <Grid
          w={{ base: "100%", md: "" }}
          templateColumns={{ base: "", md: "repeat(3, 1fr)" }}
          gap={{ base: 5, md: 10 }}
        >
          {formType === "Expense" ? (
            <InputSelect
              register={register}
              errors={errors}
              id='category'
              label={t("category", { ns: "forms" })}
              placeHolder={t("select", { ns: "forms" })}
              isRequired
              selectOptions={categoriesState}
            />
          ) : null}
          <InputSelect
            register={register}
            errors={errors}
            id='source'
            label={t("paymentType", { ns: "forms" })}
            placeHolder={t("select", { ns: "forms" })}
            isRequired
            selectOptions={paymentTypesState}
          />
          <FormControl isInvalid={errors.amount}>
            <FormLabel htmlFor='amount'>
              {t("amount", { ns: "forms" })}
            </FormLabel>
            <InputGroup>
              <NumberInput
                precision={2}
                onChange={(valueString) => setAmountValue(valueString)}
                value={amountValue}
                id={t("amount", { ns: "forms" })}
                onFocus={() => setAmountValue("")}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setAmountValue("0");
                  }
                }}
              >
                <NumberInputField />
              </NumberInput>
            </InputGroup>
            <FormErrorMessage>
              {errors.amount && errors.amount.message}
            </FormErrorMessage>
          </FormControl>
        </Grid>
        <Grid
          w={{ base: "100%", md: "" }}
          templateColumns={{ base: "", md: "repeat(3, 1fr)" }}
          gap={{ base: 5, md: 10 }}
        >
          <FormControl isInvalid={errors.date}>
            <FormLabel htmlFor='date'>{t("date", { ns: "forms" })}</FormLabel>
            <DatePicker
              onChange={(e: Date) => setDateValue(e)}
              value={dateValue}
            />
            <FormErrorMessage>
              {errors.date && errors.date.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            display={{ base: "block", md: "flex" }}
            alignItems='center'
            flexDir='column'
            isInvalid={errors.isRecurrent}
          >
            <FormLabel htmlFor='isRecurrent'>
              {t("isRecurrent", { ns: "forms" })}
            </FormLabel>
            <Switch
              size='lg'
              colorScheme='green'
              {...register("isRecurrent")}
              onChange={(e) => toggleFrequency(e.target.checked)}
            />
          </FormControl>
          {isRecurrentChecked ? (
            <InputSelect
              register={register}
              errors={errors}
              id='frequency'
              label={t("frequency", { ns: "forms" })}
              placeHolder={t("select", { ns: "forms" })}
              selectOptions={frequencies}
            />
          ) : null}
        </Grid>
        <FormControl isInvalid={errors.details}>
          <FormLabel htmlFor='name'>{t("details", { ns: "forms" })}</FormLabel>
          <Input
            id='details'
            placeholder={t("details", { ns: "forms" })}
            {...register("details")}
          />
          <FormErrorMessage>
            {errors.details && errors.details.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          alignSelf='start'
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
        >
          {t("add")}
        </Button>
      </VStack>
    </form>
  );
};
