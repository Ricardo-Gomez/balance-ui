import React from "react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { categories } from "../../recoil/userData";
import { api } from "../../api";

type FormValues = {
  name: string;
};
export const AddCategory: React.FC = ({ t }) => {
  const setCategory = useSetRecoilState(categories);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  async function onSubmit(values: FormValues) {
    const category = await api.addCategory(values.name);

    setCategory((categories) => {
      const exists = categories.find((m) => {
        return m.id === category.id;
      });

      return exists ? categories : [...categories, category];
    });

    reset();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack spacing='4'>
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
        <Button
          display='flex'
          alignSelf='end'
          mt={4}
          colorScheme='teal'
          isLoading={isSubmitting}
          type='submit'
        >
          {t("add", { ns: "appContainer" })}
        </Button>
      </HStack>
    </form>
  );
};
