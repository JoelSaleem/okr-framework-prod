import styled from "styled-components";
import { Theme } from "../../themes";

export const Input = styled.input<{ disabled?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  background: transparent;
  border: ${({ disabled }) => {
      return disabled ? "0px" : "1px";
    }}
    solid
    ${(props: { theme: Theme }) => {
      return props.theme.ButtonColour;
    }};
  color: ${(props: { theme: Theme }) => {
    return props.theme.TextColour;
  }};
`;
