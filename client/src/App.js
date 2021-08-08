import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./components/routing/PrivateRoute";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import AddAppPassword from './components/screens/AddAppPassword';
import GetAppNames from './components/screens/GetAppNames';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          {/* <PrivateRoute exact path="/addPassword" component={AddAppPassword} /> */}
          <PrivateRoute exact path="/getAppNames" component={GetAppNames} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </div>
    </Router>

  )
}

export default App