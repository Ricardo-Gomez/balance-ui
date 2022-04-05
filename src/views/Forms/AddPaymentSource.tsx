import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { paymentTypes } from "../../recoil/userData";
import { InputSelect } from "../Common/InputSelect";
import { api } from "../../api";

type FormValues = {
  paymentType: string;
  name: string;
};
export const AddPaymentSource = ({ t }) => {
  const setpaymentTypes = useSetRecoilState(paymentTypes);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  async function onSubmit(values: FormValues) {
    console.log(values);

    const paymentType = await api.addPaymentType({
      name: values.name,
      paymentType: values.paymentType,
    });
    console.log(paymentType);
    setpaymentTypes((paymentTypes) => [...paymentTypes, paymentType]);
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack spacing='4'>
        <FormControl isInvalid={errors.paymentType}>
          <InputSelect
            register={register}
            errors={errors}
            id='paymentType'
            label={t("paymentType", { ns: "forms" })}
            placeHolder={t("select", { ns: "forms" })}
            isRequired
            selectOptions={[
              { id: "Card", name: "Card" },
              { id: "Other", name: "Other" },
            ]}
          />
          <FormErrorMessage>
            {errors.paymentType && errors.paymentType.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor='name'>{t("name")}</FormLabel>
          <Input
            id='name'
            placeholder='name'
            {...register("name", {
              required: "is required",
              minLength: { value: 3, message: "Minimum length should be 3" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
      </HStack>
      <Flex justifyContent='center'>
        <Button
          display='flex'
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
        >
          {t("add", { ns: "appContainer" })}
        </Button>
      </Flex>
    </form>
  );
};
