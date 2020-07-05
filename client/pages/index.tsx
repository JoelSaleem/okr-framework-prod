import styled from "styled-components";
import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useWindowSize } from "react-use";

import { LOCAL_STORAGE_TOKEN_KEY } from "./_app";
import { Card } from "../components/Layout/Card";

import { ObjectiveDisplay } from "../components/Landing/ObjectiveDisplay";
import { KeyResultDisplay } from "../components/Landing/KeyResultDisplay";

interface hasSmallScreen {
  isSmallScreen: boolean;
}

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 2% 1fr 10%;
  grid-template-rows: 10% 1fr 2% 1fr 10%;
`;

const SmallGrid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 2% 1fr 2% 1fr 10%;
`;

const Heading = styled.h1`
  text-align: center;
  grid-area: 1 / 2 / 2 / 5;
`;

const SmallHeading = styled.h1`
  text-align: center;
  grid-area: 1 / 2 / 2 / 3;
`;

const ObjectiveSpacing = styled.div`
  grid-area: 2 / 2 / 3 / 5;
`;

const SmallObjectiveSpacing = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

const KeyResultSpacing = styled.div`
  grid-area: 4 / 2 / 5 / 3;
`;

const SmallKeyResultSpacing = styled.div`
  grid-area: 4 / 2 / 5 / 3;
`;

const StatsSpacing = styled.div`
  grid-area: 4 / 4 / 5 / 5;
`;

const SmallStatsSpacing = styled.div`
  grid-area: 6 / 2 / 7 / 3;
`;

export default () => {
  const router = useRouter();
  const { width } = useWindowSize();

  const [isSmallScreen, setIsSmallScreen] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!token) {
      router.push({
        pathname: "/login",
      });
    }
  });

  useEffect(() => {
    setIsSmallScreen(width < 500);
  }, [width]);

  const renderObjectives = useCallback(() => {
    const Wrapper = isSmallScreen ? SmallObjectiveSpacing : ObjectiveSpacing;
    return (
      <Wrapper>
        <Card>
          <ObjectiveDisplay isSmallScreen={isSmallScreen} />
        </Card>
      </Wrapper>
    );
  }, [isSmallScreen]);

  const renderKeyResults = useCallback(() => {
    const Wrapper = isSmallScreen ? SmallKeyResultSpacing : KeyResultSpacing;
    return (
      <Wrapper>
        <Card>
          <KeyResultDisplay isSmallScreen={isSmallScreen} />
        </Card>
      </Wrapper>
    );
  }, [isSmallScreen]);

  const renderStats = useCallback(() => {
    const Wrapper = isSmallScreen ? SmallStatsSpacing : StatsSpacing;
    return (
      <Wrapper>
        <Card>Stats</Card>
      </Wrapper>
    );
  }, [isSmallScreen]);

  const Container = isSmallScreen ? SmallGrid : Grid;
  const H = isSmallScreen ? SmallHeading : Heading;

  return (
    <Container>
      <H>Welcome</H>
      {renderObjectives()}
      {renderKeyResults()}
      {renderStats()}
    </Container>
  );
};
