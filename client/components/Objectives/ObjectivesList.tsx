import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { ROOT_OBJECTIVES, OBJECTIVES_OF_PARIENT } from "../../Queries";
import { Objective } from "../../types";
import { ObjectiveListItem } from "../List/ObjectiveListItem";
import { useRouter } from "next/router";

const ListWrapper = styled.div`
  overflow: auto;
  max-height: 66vh;
`;

export const ObjectivesList = () => {
  const router = useRouter();
  const parent = router.query?.parent;

  // Fetch Objectives
  const [fetchAll, { data: allObjectives, called: allCalled }] = useLazyQuery(
    ROOT_OBJECTIVES
  );

  // Fetch child Objectives
  const [
    fetchChildren,
    { data: childObjectives, called: childrenCalled },
  ] = useLazyQuery(OBJECTIVES_OF_PARIENT, {
    variables: {
      parent: parseInt(parent as string),
    },
  });

  // decide to render either child obj or all objectives
  const [objectives, setObjectives] = useState<Objective[]>([]);
  useEffect(() => {
    if (parent) {
      if (!childrenCalled) {
        fetchChildren();
      }
      setObjectives(childObjectives?.objectivesOfParent ?? []);
    } else {
      if (!allCalled) {
        fetchAll();
      }
      setObjectives(allObjectives?.rootObjectives ?? []);
    }
  }, [parent, objectives, childrenCalled, allCalled]);

  const selectObjective = (id: number) =>
    router.push({
      pathname: "/objective",
      query: { id },
    });

  return (
    <ListWrapper>
      {objectives.map(({ id, title, description, createdAt }) => {
        return (
          <ObjectiveListItem
            withHover
            onClick={() => selectObjective(id)}
            key={id}
            id={id}
            title={title}
            description={description}
            createdAt={createdAt}
          />
        );
      })}
    </ListWrapper>
  );
};
