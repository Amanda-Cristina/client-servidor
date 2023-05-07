import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({component: Component, ...rest }) => {
  const token = localStorage.getItem("access_token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) return <Component {...props} />;
        if (!token)
          return (
            <Redirect to={{ path: "/", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;