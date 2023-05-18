import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import Perfil from './components/perfil';
import ProtectedRoute from './components/protectedRoute';

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(token ? true : false);
  }, []);
  
  console.log(isLoading);

  return (
    <Router>
      <React.StrictMode>
        <Header isLoading={isLoading} />
        <Switch>
          <Route exact path="/"  component={App}/>
          <Route path="/register" component={Register} />
          <Route path="/login" render={(props) => <Login {...props} setIsLoading={setIsLoading} />} />
		  <Route element={<ProtectedRoute setIsLoading={setIsLoading} />}>
			<Route path="/logout" render={(props) => <Logout {...props} setIsLoading={setIsLoading} />} />
			<Route path="/perfil" render={(props) => <Perfil {...props} setIsLoading={setIsLoading} />} />
		  </Route>
        </Switch>
        <Footer />
      </React.StrictMode>
    </Router>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));

serviceWorker.unregister();