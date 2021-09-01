import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Button,
  Heading,
  useToast,
  UseToastOptions,
  ChakraProvider,
  Avatar,
  Flex,
  Text,
  Container,
  Spacer,
} from "@chakra-ui/react";
import { Wrapper } from "./Wrapper";

import CountInput from "./CountInput";
import { ItemTable } from "./ItemTable";
import firebase, { auth } from "../constants/firebase";
import theme from "../theme";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import userEvent from "@testing-library/user-event";


interface ItemFormProps {}

export const ItemForm: React.FC<ItemFormProps> = ({}) => {
  const [itemList, setItemList] = useState<[] | null>(null);
  const [error, setError] = useState("");

  const { currentUser, logout } = useAuth();
  const history = useHistory();
  
  const [width, setWidth] = useState<number>(window.innerWidth);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  let isMobile: boolean = width <= 768;

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Item name is required";
    }
    // else if (value.toLowerCase() !== "naruto") {
    //   error = "Jeez! You're not a fan 😱"
    // }
    return error;
  }

  const toast = useToast();
  const Toast = ({
    title,
    description,
    status,
  }: {
    title: string;
    description?: string;
    status: UseToastOptions["status"];
  }) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 9000,
      isClosable: true,
    });
  };

  // Join
  // Toast({ title: `Another user connected.`, status: "info" })

  // Delete
  // Toast({ title: `${data.quantity} ${data.name} removed by another user.`, status: "info" })

  // Add
  // Toast({ title: `${data.quantity} ${data.name} added by another user.`, status: "info" })

  const addItem = (name: string, quantity: string) => {
    const itemsRef = firebase.database().ref("Todo/" + currentUser?.uid);
    const item = {
      name,
      quantity,
    };
    itemsRef
      .push(item)
      .then(() => {
        Toast({
          title: `${item.quantity} ${item.name} added`,
          status: "success",
        });
      })
      .catch(() => {
        Toast({
          title: `Failed to add ${item.quantity} ${item.name}`,
          status: "error",
        });
      });
    };
    
    async function handleLogout() {
      setError("");
  
      try {
        if( logout ) await logout();
        history.push("/login");
      } catch {
        Toast({
          title: `Failed to logout`,
          status: "error",
        });
      }
    }
  
  return (
    <>
      <Flex p="5"alignItems={"center"} justifyContent={"center"}>
        <Box>
          <Heading size="md">Super Shopper</Heading>
        </Box>
        <Spacer />

          <Button onClick={handleLogout} colorScheme="teal" mr="4">
            Logout
          </Button>
          <Avatar name={currentUser?.email? currentUser?.email : undefined } src={currentUser?.photoURL? currentUser?.photoURL : undefined }></Avatar>
          {/* <Button colorScheme="teal">Log in</Button> */}

      </Flex>
      {/* <Flex>
  <Box p="2">
    <Heading size="md">Chakra App</Heading>
  </Box>
  <Spacer />
  <Box>
    <Button colorScheme="teal" mr="4">
      Sign Up
    </Button>
    <Button colorScheme="teal">Log in</Button>
  </Box>
</Flex> */}
      <Wrapper variant={isMobile ? "small" : "regular"}>
        <Heading>Shopping List</Heading>
        <Formik
          initialValues={{ name: "", quantity: "1" }}
          onSubmit={async (values, actions) => {
            addItem(values.name, values.quantity);
            actions.resetForm({});
          }}
        >
          {(props) => (
            <Form>
              <Box mt={5}>
                <Field name="name" validate={validateName}>
                  {({ field, form }: FieldProps) => (
                    <FormControl
                      isInvalid={!!form.errors.name && !!form.touched.name}
                    >
                      <FormLabel htmlFor="name">Item Name</FormLabel>
                      <Input
                        {...field}
                        autoComplete="off"
                        id="name"
                        placeholder="name"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box mt={4}>
                <CountInput name="quantity" label="Quantity"></CountInput>
              </Box>
              <Button
                mt={5}
                width={"100%"}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Add
              </Button>
            </Form>
          )}
        </Formik>
        <ItemTable />
      </Wrapper>
</>
  );
};

export default ItemForm;
