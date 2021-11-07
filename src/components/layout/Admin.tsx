import { makeStyles, Box } from '@material-ui/core';
import { Header, SideBar } from '../common';
import { Route, Switch } from 'react-router';
import DashboardFeature from '../../features/dashboard';
import StudentFeature from '../../features/student';

const useStyles = makeStyles(them => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '300px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh'
  },
  header: {
    gridArea: 'header',
    border: `1px solid ${them.palette.divider}`
  },
  sidebar: {
    gridArea: 'sidebar',
    border: `1px solid ${them.palette.divider}`,
    backgroundColor: them.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: them.palette.background.paper,
    padding: '20px'
  }
}));

export function AdminLayout () {
  const classes = useStyles();

  return (
    <Box className={ classes.root }>
      <Box className={ classes.header }>
        <Header />
      </Box>
      <Box className={ classes.sidebar }>
        <SideBar />
      </Box>
      <Box className={ classes.main }>
        <Switch>
          <Route path="/admin/dashboard">
            <DashboardFeature />
          </Route>

          <Route path="/admin/students"> 
            <StudentFeature />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
