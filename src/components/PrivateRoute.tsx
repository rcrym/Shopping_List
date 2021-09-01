import React from "react"
import { Route, Redirect, RouteChildrenProps } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"


interface PrivateRouteProps {
  exact?: boolean;
  component: React.ComponentType;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component/> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default PrivateRoute;