import { Student } from '../../../models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button } from '@material-ui/core';
import { InputField, RadioGroupField } from '../../../components/formfields';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const {
    control,
    handleSubmit
  } = useForm<Student>({
    defaultValues: initialValues
  });

  const handleFormSubmit = (formValues: Student) => {
    console.log('Submit:', formValues);
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
        <InputField name="city" control={control} label="City" />
        <Box>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  )
}