import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { KEY_RESULTS, KEY_RESULT_OF_PARENT } from "../../Queries";
import { KeyResult } from "../../types";
import { KeyResultListItem } from "../List/KeyResultListItem";
import { useRouter } from "next/router";

const ListWrapper = styled.div`
  overflow: auto;
  max-height: 66vh;
`;

interface KeyResultList {
  parent?: number | undefined;
}

export const KeyResultList: React.FC<KeyResultList> = ({ parent }) => {
  const router = useRouter();
  const [keyResults, setKeyResults] = useState<KeyResult[]>([]);

  const [fetchAll, { data: allKR, called: allCalled }] = useLazyQuery(
    KEY_RESULTS
  );
  const [
    fetchChildren,
    { data: childKRs, called: childrenCalled },
  ] = useLazyQuery(KEY_RESULT_OF_PARENT, {
    variables: {
      parent,
    },
  });

  useEffect(() => {
    if (parent) {
      if (!childrenCalled) {
        fetchChildren();
      }
      setKeyResults(childKRs?.keyResultsOfObjective ?? []);
    } else {
      if (!allCalled) {
        fetchAll();
      }
      setKeyResults(allKR?.keyResults ?? []);
    }
  }, [parent, keyResults, childrenCalled, allCalled]);

  const selectKR = (id: number) =>
    router.push({
      pathname: "/keyresult",
      query: { id },
    });

  return (
    <ListWrapper>
      {keyResults.map(({ id, title, current, target }) => {
        return (
          <KeyResultListItem
            withHover
            onClick={() => selectKR(id)}
            key={id}
            id={id}
            title={title}
            current={current}
            target={target}
          />
        );
      })}
    </ListWrapper>
  );
};
