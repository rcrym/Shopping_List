import React from "react";
import "./App.css";
import { ItemForm } from "./components/ItemForm";
import { ChakraProvider, useColorMode } from "@chakra-ui/react"
import theme from './theme'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute"
// import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import UpdateProfile from "./components/UpdateProfile";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <ChakraProvider theme={theme}>

        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={ItemForm} />
              {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              {/* <Route path="/forgot-password" component={ForgotPassword} /> */}
            </Switch>
          </AuthProvider>
        </Router>
   </ChakraProvider>
  ) 
  
}

export default App;
