import styled from "styled-components";
import { Theme } from "../../themes";

export const ListContainer = styled.div<{
  withHover: boolean;
  onClick: () => void;
}>`
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 12px;
  height: 70px;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  cursor: ${({ withHover }) => {
    return withHover ? "pointer" : "default";
  }};

  &:hover {
    background: ${({
      theme,
      withHover,
    }: {
      theme: Theme;
      withHover?: boolean;
    }) => {
      return withHover ? theme.CardHighlight : theme.CardColour;
    }};
    transition: background 0.2s linear;
    -webkit-transition: background 0.2s linear;
  }
`;
