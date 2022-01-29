import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
// import { useDataManager } from "../../context/hooks/useFetchUserData";
import { InputSelect } from "../Common/InputSelect";
import { api } from "../../api";

type FormValues = {
  paymentType: string;
  name: string;
};
export const AddIncome = ({ t }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  //   const { addCategory, addPaymentType } = useDataManager();
  async function onSubmit(values: FormValues) {
    console.log(values);

    const a = await api.addPaymentType({
      name: values.name,
      paymentType: values.paymentType,
    });
    console.log(a);
    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing='4' divider={<StackDivider borderColor='gray.200' />}>
        <FormControl isInvalid={errors.paymentType}>
          <InputSelect
            register={register}
            errors={errors}
            id='paymentType'
            label={t("paymentType", { ns: "forms" })}
            placeHolder={t("select", { ns: "forms" })}
            isRequired
            selectOptions={[
              { id: "2", name: "Card" },
              { id: "3", name: "Other" },
            ]}
          />
          <FormErrorMessage>
            {errors.paymentType && errors.paymentType.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor='name'>Category Name</FormLabel>
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
        <Button
          alignSelf='center'
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
        >
          Add
        </Button>
      </VStack>
    </form>
  );
};
