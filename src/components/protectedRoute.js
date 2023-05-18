import React from "react";
import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ setIsLoading, component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) return <Component {...props} setIsLoading={setIsLoading} />;
        if (!token)
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};


export default ProtectedRoute;

