import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
} from '@mui/material';
import { Controller } from 'react-hook-form';

export const FormInputMultiDropdown = ({
  name,
  control,
  label,
  options,
  setValue,
  variant = 'standard',
  ...rest
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const selectOptions = () => {
    return options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        <Checkbox checked={selectedOptions.indexOf(option.value) > -1} />
        {option.label}
      </MenuItem>
    ));
  };

  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedOptions);
  }, [selectedOptions]);

  return (
    <FormControl>
      <InputLabel id={label}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ fieldState: { error } }) => (
          <Select
            labelId={label}
            id={name}
            multiple
            value={selectedOptions}
            onChange={handleChange}
            variant={variant}
            {...rest}
          >
            {selectOptions()}
          </Select>
        )}
      />
    </FormControl>
  );
};
