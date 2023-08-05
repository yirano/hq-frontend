import React, { forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import * as Styled from "./Select.styled";
import * as InputStyled from "../Input/Input.styled";

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}

export type SelectProps = {
  error?: string;
  className?: string;
  marginBottom?: string;
  margin?: string;
  border?: string;
  options?: Option[];
  register?: UseFormRegisterReturn;
  value?: any;
  name?: string;
  width?: string;
  padding?: string;
  hidden?: boolean;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLSelectElement>;
  id?: string;
  weight?: string;
  fontFamily?: string;
  background?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      error: hasError,
      className,
      marginBottom,
      margin,
      border,
      width,
      padding,
      weight,
      fontFamily,
      background,
      hidden,
      onChange,
      options = [],
      ...selectProps
    },
    ref
  ) => {

    // ========================== RENDER =============================
    return (
      <InputStyled.LabelStyled
        {...{
          width,
          hidden,
          marginBottom,
          className,
          hasError,
        }}
      >
        <Styled.SelectStyled
          {...{
            className,
            padding,
            weight,
            fontFamily,
            background,
            border,
            margin,
            width,
            hidden,
            onChange,
            ref,
            ...selectProps,
          }}
        >
          {options.map((option) => (
            <option key={option.value} disabled={option.disabled} selected={option.selected} value={option.value}>
              {option.label}
            </option>
          ))}
        </Styled.SelectStyled>
      </InputStyled.LabelStyled>
    );
  }
);

Select.displayName = "Select";

export default Select;
