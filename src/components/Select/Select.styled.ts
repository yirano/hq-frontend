import styled from "@emotion/styled";
import { colors } from "consts";

interface SelectProps {
  padding?: string;
  cursor?: string;
  alignSelf?: string;
  background?: string;
  fontFamily?: string;
  color?: string;
  weight?: string;
  minWidth?: string;
  maxWidth?: string;
  margin?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  outline?: string;
}

export const SelectStyled = styled.select<SelectProps>`
  border: none;
  width: ${({ width = "100%" }) => width};
  padding: ${({ padding }) => padding};
  cursor: ${({ cursor }) => cursor};
  background: ${({ background = colors.gray60 }) => background};
  alignSelf: ${({ alignSelf }) => alignSelf};
  font-size: 16px;
  font-family: ${({ fontFamily }) => fontFamily};
  line-height: 24px;
  color: ${({ color = colors.black }) => color};
  font-weight: ${({ weight = "normal" }) => weight};

  :focus {
    outline: none;
  }

  // Add the rest of your input styles here
`;
