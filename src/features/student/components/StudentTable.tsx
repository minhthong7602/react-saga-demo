import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Student, City } from '../../../models';
import { Box, Button } from '@material-ui/core';
import { capitalizeString, getMarkColor } from '../../../utils';

const useStyles = makeStyles(theme => ({
  table: {
    
  },
  edit: {
    marginRight: theme.spacing(2)
  }
}));

export interface StudentListProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City
  };

  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({ studentList, cityMap, onEdit, onRemove }: StudentListProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student: Student, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{ student.name }</TableCell>
              <TableCell>{ capitalizeString(student.gender) }</TableCell>
              <TableCell>
                <Box color= { getMarkColor(student.mark)}>
                  { student.mark }
                </Box>
              </TableCell>
              <TableCell>{ cityMap[student.city]?.name }</TableCell>
              <TableCell align="right">
                <Button className = { classes.edit } variant="contained" color="primary" onClick= { () => onEdit?.(student) }>
                  Edit
                </Button>

                <Button variant="outlined" color="secondary" onClick= { () => onRemove?.(student) }>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}