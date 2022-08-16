import { Slider } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export const FormInputSlider = ({ name, label, control, ...rest }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Slider
          value={value}
          onChange={onChange}
          valueLabelDisplay="auto"
          {...rest}
        />
      )}
    />
  );
};
