import React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import frLocale from 'date-fns/locale/fr';

export const FormInputDate = ({
  name,
  label,
  control,
  variant = 'standard',
  ...rest
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState, formState }) => (
          <DatePicker
            label={label}
            defaultValue={new Date()}
            value={value}
            onChange={onChange}
            id={`date-${Math.random()}`}
            renderInput={params => (
              <TextField {...params} {...rest} variant={variant} />
            )}
            // {...field}
          />
        )}
      />
    </LocalizationProvider>
  );
};
