import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";

type SelectOptionType = {
    id: string;
    name: string;
}
type InputSelectTypes = {
    id: string
  label: string,
  register: Function,
  placeHolder: string,
  errors: Record<string, any>,
  isRequired?: boolean,
  selectOptions: SelectOptionType[],
}

export const InputSelect: React.FC<InputSelectTypes> = ({
  id,
  label,
  register,
  placeHolder,
  errors,
  isRequired = false,
  selectOptions,
}) => {
  return (
    <FormControl isInvalid={errors[id]}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        placeholder={placeHolder}
        id={id}
        {...register(id, {
          required: isRequired,
        })}
      >
        {selectOptions.map(({ id, name }: Record<string, string>) => {
          return <option key={`${id}_${name}`} value={id}>{name}</option>;
        })}
      </Select>
      <FormErrorMessage>
        {errors[id] && errors[id].message}
      </FormErrorMessage>
    </FormControl>
  );
};
