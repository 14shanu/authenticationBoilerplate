import React from 'react';
import { FormInputDate } from './FormInputDate';
import { FormInputDropdown } from './FormInputDropdown';
import { FormInputMultiCheckbox } from './FormInputMultiCheckbox';
import { FormInputMultiDropdown } from './FormInputMultiDropdown';
import { FormInputRadio } from './FormInputRadio';
import { FormInputSlider } from './FormInputSlider';
import { FormInputText } from './FormInputText';

export const FormControl = ({ compType, ...rest }) => {
  switch (compType) {
    case 'input':
      return <FormInputText {...rest} />;
    case 'dropdown':
      return <FormInputDropdown {...rest} />;
    case 'multidropdown':
      return <FormInputMultiDropdown {...rest} />;
    case 'date':
      return <FormInputDate {...rest} />;
    case 'checkbox':
      return <FormInputMultiCheckbox {...rest} />;
    case 'radio':
      return <FormInputRadio {...rest} />;
    case 'slider':
      return <FormInputSlider {...rest} />;
  }
};
