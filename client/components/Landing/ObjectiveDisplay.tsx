import { useRouter } from "next/router";
import { Objective } from "../../types";
import { useQuery } from "@apollo/react-hooks";
import { ROOT_OBJECTIVES } from "../../Queries";

import { ObjectiveListItem } from "../List/ObjectiveListItem";
import { ResponsiveListWrapper } from "../List/ResponsiveListWrapper";
import { CardContainer } from "../List/CardContainer";

interface ObjectiveDisplayProps {
  isSmallScreen: boolean;
}

export const ObjectiveDisplay: React.FC<ObjectiveDisplayProps> = ({
  isSmallScreen,
}) => {
  const router = useRouter();

  const { data } = useQuery(ROOT_OBJECTIVES);
  const objectives: Objective[] = data?.rootObjectives ?? [];

  const onClick = () => {
    router.push({
      pathname: "/objectives",
    });
  };

  return (
    <CardContainer onClick={onClick}>
      <h3>Objectives</h3>
      <ResponsiveListWrapper isSmallScreen={isSmallScreen}>
        {objectives.map(({ createdAt, description, title, id }) => {
          return (
            <ObjectiveListItem
              id={id}
              createdAt={createdAt}
              description={description}
              title={title}
              key={id}
            />
          );
        })}
      </ResponsiveListWrapper>
    </CardContainer>
  );
};
