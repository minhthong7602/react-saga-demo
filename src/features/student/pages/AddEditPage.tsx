import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  useEffect(() => {
    if (!isEdit) return;

    //IFFE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log('Failed to fetch student details', error);
      }
    })();
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student
  } as Student;

  const handleStudentFormSubmit = (formValues: Student) => {

  }

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">
        {isEdit ? 'Update student' : 'Add new student'}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
