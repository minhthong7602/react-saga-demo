import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import LoginPage from './features/auth/pages/LoginPage';
import { AdminLayout } from './components/layout';
import { NotFound, PrivateRoute } from './components/common';

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact>
          <Redirect to="/admin/dashboard" />
        </PrivateRoute>

        <Route path="/login">
          <LoginPage />
        </Route>

        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
