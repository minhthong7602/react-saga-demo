import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import studentApi from '../../../api/studentApi';
import { Student } from '../../../models';
import StudentForm from '../components/StudentForm';

export default function AddEditPage() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  useEffect(() => {
    if (!isEdit) return;
    let isMounted = true;
    studentApi.getById(studentId).then((data: Student) => {
      if (isMounted) {
        setStudent(data);
      }
    });
    return () => {
      isMounted  = false;;
    };
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student
  } as Student;

  const handleStudentFormSubmit = async (formValues: Student) => {
    if(isEdit) {
      await studentApi.update(formValues.id || '', formValues);
    } else {
      await studentApi.add(formValues);
    }
    toast.success(isEdit ? 'Update student successfully' : 'Add student successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Redirect back to student list
    history.push('/admin/students');
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
