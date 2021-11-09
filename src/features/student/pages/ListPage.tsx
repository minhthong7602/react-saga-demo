import { Box, Button, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectStudentList, selectStudentLoading, studentActions } from '../studentSlice';
import StudentList from './StudentList';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1)
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: theme.spacing(4)
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%'
  }
}));

export default function ListPage () {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList({
      _page: 1,
      _limit: 15
    }));
  }, []);

  const studentList = useAppSelector(selectStudentList);
  const loading = useAppSelector(selectStudentLoading);

  console.log('loading', loading);
  return (
    <Box className = { classes.root }>
       { loading && <LinearProgress className= { classes.loading } /> }
      <Box className = { classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>
      <StudentList studentList= { studentList || [] } />
    </Box>
  );
}
