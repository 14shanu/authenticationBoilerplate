import { MenuItem, TextField, Select, InputLabel } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

// <div>
//   <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
//   <Select fullWidth onChange={onChange} value={value} label={label}>
//     {selectOptions()}
//   </Select>
// </div>

export const FormInputDropdown = ({
  name,
  control,
  label,
  options,
  variant = 'standard',
  ...rest
}) => {
  const selectOptions = () => {
    return options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          fullWidth
          select
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          variant={variant}
          {...rest}
        >
          {selectOptions()}
        </TextField>
      )}
    />
  );
};
