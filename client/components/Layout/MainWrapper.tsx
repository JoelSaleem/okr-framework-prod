import styled from "styled-components";
import { Card } from "./Card";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 10%;
  text-align: center;
`;

const Heading = styled.h2`
  grid-area: 1 / 2 / 2/ 3;
`;

const BodyWrapper = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

interface WrapperProps {
  heading: string;
}

export const MainWrapper: React.FC<WrapperProps> = ({ children, heading }) => {
  return (
    <Grid>
      <Heading>{heading}</Heading>
      <BodyWrapper>
        <Card>{children}</Card>
      </BodyWrapper>
    </Grid>
  );
};
