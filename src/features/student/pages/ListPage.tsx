import { Box, Button, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCityList, selectCityMap } from '../../city/citySlice';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import StudentTable from '../components/StudentTable';
import { StudentFilter } from '../components/StudentFilter';
import { ListParams, Student } from '../../../models';
import { useHistory, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

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

export default function ListPage() {
  const match = useRouteMatch();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();

  const studentList = useAppSelector(selectStudentList);
  const loading = useAppSelector(selectStudentLoading);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const page = filter._page;
  const limit = filter._limit ?? 1;
  const totalRows = pagination?._totalRows ?? 0;
  const totalPage = Math.ceil(totalRows / limit);

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page
    }));
  }

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  }

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  }

  const handleRemoveStudent = (student: Student) => {
    dispatch(studentActions.removeStudent(student));
  }

  const handleEditStudent = (student: Student) => {
    history.push(`${match.url}/${student.id}`)
  }

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>
      <Box mb={3}>
        <StudentFilter
          filter={filter}
          cityList={cityList}
          onSearchChange={handleSearchChange}
          onChange={handleFilterChange}
        />
      </Box>
      <StudentTable
        studentList={studentList || []}
        cityMap={cityMap}
        onRemove={handleRemoveStudent}
        onEdit={handleEditStudent} />
      <Box mt={2} className={classes.pagination}>
        <Pagination
          count={totalPage}
          page={page}
          onChange={handlePageChange}
          color="primary" />
      </Box>
    </Box>
  );
}
