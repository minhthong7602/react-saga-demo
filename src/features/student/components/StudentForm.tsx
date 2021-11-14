import { Student } from '../../../models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { InputField, RadioGroupField, SelectField } from '../../../components/formfields';
import { useAppSelector } from '../../../app/hooks';
import { selectCityOptions } from '../../city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name.')
    .test(
      'two-words',
      'Please enter at least two words',
      (value) => {
        if (!value) return true;
        const parts = value?.split(' ') || [];
        return parts.filter((x) => !!x).length >= 2
      }
    ),
  age: yup
    .number()
    .positive('Please enter a positive numer')
    .integer('Please enter an integer')
    .required('Please enter age.'),
  mark: yup
    .number()
    .positive('Please enter a positive numer')
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .required('Please enter mark.'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please slect either male or female')
    .required('Please select gender'),
  city: yup
    .string()
    .required('Please select city')
});

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema)
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Box maxWidth={350}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <InputField name="age" control={control} label="Age" type="number" />
        <InputField name="mark" control={control} label="Mark" type="number" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' }
          ]}
        />

        { Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField
          name="city"
          control={control}
          label="City"
          options={cityOptions} />
        )}
        
        {error && <Alert severity="error">{error}</Alert>}
        <Box>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress color="primary" size={16} />}  Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}