import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export const FormInputRadio = ({ name, label, options, control }) => {
  const generateRadioOptions = () => {
    return options.map(eachOption => (
      <FormControlLabel
        key={eachOption.value}
        value={eachOption.value}
        label={eachOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <FormControl>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <RadioGroup row value={value} onChange={onChange}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
