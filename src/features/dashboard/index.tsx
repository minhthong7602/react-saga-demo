import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { PeopleAlt } from '@material-ui/icons';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticsItem from './components/StatisticItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardActions, selectDashboardHighestStudentList, selectDashboardLoading, selectDashboardLowestStudentList, selectDashboardRankingByCityList, selectDashboardStatistics } from './dashboardSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%'
  }
}));
export default function DashboardFeature() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statictis = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectDashboardHighestStudentList);
  const lowestStudentList = useAppSelector(selectDashboardLowestStudentList);
  const rankingByCityList = useAppSelector(selectDashboardRankingByCityList);

  const classes = useStyles();
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <Box className= { classes.root }>
      { loading && <LinearProgress className= { classes.loading } /> }
      <Grid container spacing={ 3 }>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            value={statictis.maleCount}
            label="male" />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            value={statictis.femaleCount}
            label="female" />

        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            value={statictis.highMarkCount}
            label="mark >= 8" />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <StatisticsItem
            icon={<PeopleAlt fontSize="large" color="primary" />}
            value={statictis.lowMarkCount}
            label="mark <= 5" />
        </Grid>
      </Grid>
      {/* All students rankings */}
      <Box mt={4}>
        <Typography variant="h4"> All Student </Typography>
        <Box mt={ 2 }>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Widget title="Student with highest mark">
              <StudentRankingList studentList={ highestStudentList } />
            </Widget>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Widget title="Student with lowest mark">
            <StudentRankingList studentList = { lowestStudentList } />
            </Widget>
          </Grid>
        </Grid>
        </Box>
      </Box>

      {/* Ranking by city */}
      <Box mt={5}>
        <Typography variant="h4">
          Ranking by city
        </Typography>

        <Box mt={2}>
          <Grid container spacing={3}>
            {
              rankingByCityList.map((city, idx) => (
                <Grid item xs={12} md={6} lg={6} key={ idx }>
                  <Widget title={ `Thành phố ${city.cityName}` }>
                  <StudentRankingList studentList = { city.rankingList } />
                  </Widget>
                </Grid>
              )) 
            }
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
