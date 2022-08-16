import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

export const FormInputMultiCheckbox = ({
  name,
  label,
  setValue,
  options,
  control,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // we are handling the selection manually here
  const handleSelect = value => {
    const isPresent = selectedOptions.indexOf(value);

    if (isPresent !== -1) {
      const remainingItems = selectedOptions.filter(
        eachOption => eachOption !== value
      );
      setSelectedOptions(remainingItems);
    } else {
      setSelectedOptions(prevItems => [...prevItems, value]);
    }
  };

  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedOptions);
  }, [selectedOptions]);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <div>
        {options.map(option => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  control={control}
                  render={() => (
                    <Checkbox
                      checked={selectedOptions.includes(option.value)}
                      onChange={() => handleSelect(option.value)}
                    />
                  )}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};
