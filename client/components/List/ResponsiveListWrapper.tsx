import styled from "styled-components";

export const ResponsiveListWrapper = styled.div`
  overflow: auto;
  max-height: ${({ isSmallScreen }: { isSmallScreen: boolean }) => {
    return isSmallScreen ? "20vh" : "30vh";
  }};
`;
