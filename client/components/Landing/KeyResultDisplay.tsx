import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { KEY_RESULTS } from "../../Queries";
import { KeyResultListItem } from "../List/KeyResultListItem";
import { ResponsiveListWrapper } from "../List/ResponsiveListWrapper";
import { CardContainer } from "../List/CardContainer";
import { KeyResult } from "../../types";

interface KeyResultDisplayProps {
  isSmallScreen: boolean;
}

export const KeyResultDisplay: React.FC<KeyResultDisplayProps> = ({
  isSmallScreen,
}) => {
  const router = useRouter();

  const { data } = useQuery(KEY_RESULTS);
  const keyResults: KeyResult[] = data?.keyResults ?? [];

  return (
    <CardContainer>
      <h3>Key Results</h3>
      <ResponsiveListWrapper isSmallScreen={isSmallScreen}>
        {keyResults.map(({ id, title, target, current }) => {
          return (
            <KeyResultListItem
              onClick={() => {
                router.push({
                  pathname: "/keyresults",
                });
              }}
              id={id}
              key={id}
              title={title}
              target={target}
              current={current}
            />
          );
        })}
      </ResponsiveListWrapper>
    </CardContainer>
  );
};
