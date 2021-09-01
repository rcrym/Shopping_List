import React, { useRef, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link as ReachLink, useHistory } from "react-router-dom";
import { Field, Form, FieldProps, Formik, FormikHelpers } from "formik";
import {
  FormControl,
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { signup, currentUser } = useAuth();
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const Toast = useToast();

  interface Values {
    email: string;
    password: string;
    passwordConfirm: string;
  }

  async function handleSubmit(
    { email, password }: Values,
    setSubmitting: FormikHelpers<Values>["setSubmitting"]
  ) {
    // if (password !== passwordConfirm) {
    //   return setError("Passwords do not match")
    // }
    setLoading(true);
    // setTimeout(async () => {
    console.log("sign up:", email, password);
    try {
      if(signup) await signup(email, password);
      setLoading(false);
    } catch (err) {
      Toast({
        title: err.toString(),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
    // .then(() => {
    // console.log(result)
    // history.push("/");
    console.log(currentUser);
    // }).catch( (err: Error) => {

    // });
    // }, 5000);
    // setError("");
  }

  const validateConfirmPassword = (
    password: string,
    passwordConfirm: string
  ) => {
    let error: string | undefined = undefined;
    if (password !== passwordConfirm) {
      error = "Password does not match";
      console.log("npe", password, passwordConfirm);
    }
    console.log("npe");
    return error;
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} minW={"30%"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading textAlign="center" fontSize={"4xl"}>
            Sign up to continue
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            100% Free - No commitment
            {/* to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️ */}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ email: "", password: "", passwordConfirm: "" }}
            onSubmit={async (
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              handleSubmit(values, setSubmitting);
            }}
          >
            {(props) => (
              <Form>
                <Stack spacing={4}>
                  <Field name="email">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={!!form.errors.email && !!form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          {...field}
                          // autoComplete="off"
                          id="email"
                          placeholder="email"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.password && !!form.touched.password
                        }
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          // autoComplete="off"
                          id="password"
                          placeholder="password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field
                    name="passwordConfirm"
                    validate={(value: string) =>
                      validateConfirmPassword(props.values.password, value)
                    }
                  >
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          !!form.errors.passwordConfirm &&
                          !!form.touched.passwordConfirm
                        }
                      >
                        <FormLabel htmlFor="email">
                          Password Confirmation
                        </FormLabel>
                        <Input
                          {...field}
                          type="password"
                          // autoComplete="off"
                          id="passwordConfirm"
                          placeholder="passwordConfirm"
                        />
                        <FormErrorMessage>
                          {form.errors.passwordConfirm}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={5}
                    width={"100%"}
                    colorScheme="teal"
                    disabled={props.isSubmitting || loading}
                    isLoading={props.isSubmitting || loading}
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
          <Text w={"100"} textAlign="center" mt={5} className="w-100 text-center mt-2">
        Have an account? <Link as={ReachLink} color="teal.100" to="/login" >Sign In</Link>
      </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
