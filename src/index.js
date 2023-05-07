import React from 'react';
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


const routing = (
	<Router>
		<React.StrictMode>
			<Header />
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<ProtectedRoute path="/logout" component={Logout} />
				<ProtectedRoute path="/perfil" component={Perfil}/>
				
			</Switch>
			<Footer />
		</React.StrictMode>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
