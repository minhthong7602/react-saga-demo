import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupField({ name, control, label, disabled, options }: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  });
  return (
    <FormControl disabled = { disabled } margin="normal" component="fieldset">
      <FormLabel component="legend">{ label }</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={ onChange  }>
        {
          options.map((option, index) => (
            <FormControlLabel key={index} value={ option.value } control={<Radio />} label={ option.label } />
          ))
        }
      </RadioGroup>
      <FormHelperText> { error?.message }</FormHelperText>
    </FormControl>
  );
}
