import React from 'react';
import { useField } from "formik";
import "./CustomInput.css";
import BorderedContainer, { BorderedContainerProps } from '../BorderedContainer/BorderedContainer';

interface CustomInputProps {
  placeholder?: string;
  name: string;
  label?: string;
  type?: string;
  borderProps?: Partial<BorderedContainerProps>;
  hasError?: boolean;
}

const CustomInput = (props: CustomInputProps) => {
  const { hasError, name, borderProps, label, ...restProps } = props;
  const [field, meta] = useField(props.name);
  const borderColors = props.hasError ? {
    leftBorderColor: "red",
    rightBorderColor: "red",
  } : {};

  return (
    <>
    <BorderedContainer {...borderProps} {...borderColors}>
      <div className="inputBox">
        <input type="text" id={name} {...field} {...restProps} />
        <label htmlFor={name}>{label}</label>
      </div>
    </BorderedContainer>
    {meta.touched && !!meta.error && (
      <p>Error</p>
    )}
    </>
  )
}

export default CustomInput;