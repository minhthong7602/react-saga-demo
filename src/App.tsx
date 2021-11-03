import React, { useEffect, useMemo } from 'react';
import './App.css';
import cityApi from './api/cityApi';
import { Route, Switch } from 'react-router';
import LoginPage from './features/auth/pages/LoginPage';
import { AdminLayout } from './components/layout';
import { NotFound, PrivateRoute } from './components/common';
import { Button } from '@material-ui/core';
import { useAppDispatch } from './app/hooks';
import { authActions } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response.data));
  }, []);

  return (
    <div className="App">
      <Button variant="contained" color="primary" onClick={ () => dispatch(authActions.logout()) }>Logout</Button>
      <Switch>
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
