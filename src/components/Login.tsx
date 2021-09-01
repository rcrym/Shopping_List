import React, { useContext, useRef, useState } from "react";
import { Card, Alert } from "react-bootstrap";
import { AuthContext, IAuthContext, useAuth } from "../contexts/AuthContext";
import { Link as  ReachLink, useHistory } from "react-router-dom";
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
  VStack,
} from "@chakra-ui/react";
import GoogleButton from "react-google-button";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { login, googleLogin, currentUser } = useAuth();
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const Toast = useToast();

  interface Values {
    email: string;
    password: string;
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
      login(email, password);
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

  async function googleHandle() {
    try{
      if(googleLogin) await googleLogin()
      history.push("/")
    } catch {
      console.log("Failed to login using google");
    }
 }

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
            Sign in to continue
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Welcome!
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
            initialValues={{ email: "", password: ""}}
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
                  <Button
                    mt={5}
                    width={"100%"}
                    colorScheme="teal"
                    disabled={props.isSubmitting || loading}
                    isLoading={props.isSubmitting || loading}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
          <VStack>
          <Text>or</Text>
          <GoogleButton onClick={googleHandle}/>
            
          </VStack>
          <Text w={"100"} textAlign="center" mt={5} className="w-100 text-center mt-2">
        Need an account? <Link as={ReachLink} color="teal.100" to="/signup" >Sign Up</Link>
      </Text>
        </Box>
      </Stack>
    </Flex>
  );
}
