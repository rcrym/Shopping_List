import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  useNumberInput,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import React from "react";

interface TextInputProps {
  name: string;
  label: string;
}

const CountInput: React.FC<TextInputProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
        ...field,
        step: 1,
        defaultValue: 1,
        min: 1,
        max: 100,
        precision: 1,    
      onChange: (valueAsString, valueAsNumber) =>
        helpers.setValue(valueAsNumber),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ ...field, readOnly: true },);

  return (
    <Field name={name}>
      {({ form }: any) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <HStack maxW="320px">
              <Button {...inc}>+</Button>
              <Input
                id={name}
                onChange={(val) => form.setFieldValue(field.name, val)}
                {...input}
              />
              <Button {...dec}>-</Button>
            </HStack>
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CountInput;
