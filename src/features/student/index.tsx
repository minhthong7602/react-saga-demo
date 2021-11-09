import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { cityActions } from '../city/citySlice';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export default function StudentFeature () {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  return (
    <Box>
      <Switch>
        <Route path={ match.path } exact>
          <ListPage />
        </Route>

        <Route path={ `${match.path}/add` }>
          <AddEditPage />
        </Route>

        <Route path={ `${match.path}/:studentId` }>
          <AddEditPage />
        </Route>
      </Switch>
    </Box>
  );
}
