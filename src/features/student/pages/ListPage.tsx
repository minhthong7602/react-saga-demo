import { Box, Button, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCityMap } from '../../city/citySlice';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
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
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function ListPage () {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const studentList = useAppSelector(selectStudentList);
  const loading = useAppSelector(selectStudentLoading);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);

  const page = filter._page;
  const limit = filter._limit ?? 1;
  const totalRows = pagination?._totalRows ?? 0;
  const totalPage = Math.ceil(totalRows/limit);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page
    }));
  }

  return (
    <Box className = { classes.root }>
       { loading && <LinearProgress className= { classes.loading } /> }
      <Box className = { classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Button variant="contained" color="primary">
          Add new student
        </Button>
      </Box>
      <StudentList studentList= { studentList || [] } cityMap = { cityMap } />
      <Box mt={2} className= { classes.pagination }>
        <Pagination
        count={ totalPage } 
        page= { page } 
        onChange= { handlePageChange } 
        color="primary" />
      </Box>
    </Box>
  );
}
