import styled from "styled-components";
import { Theme } from "../../themes";

export const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props: { theme: Theme }) => {
    return props.theme.CardColour;
  }};
  box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.4),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
`;
