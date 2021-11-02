import React, { useEffect, useMemo } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import cityApi from './api/cityApi';
import { Route, Switch } from 'react-router';

function App() {
  useEffect(() => {
    cityApi.getAll().then((response) => console.log(response.data));
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/login">

        </Route>

        <Route path="/admin">

        </Route>

        <Route>
          
        </Route>
      </Switch>
    </div>
  );
}

export default App;
