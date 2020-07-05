import { Objective } from "../../types";
import { useRouter } from "next/router";
import { KeyResultForm } from "./KeyResultForm";
import { useState } from "react";
import { CREATE_KEY_RESULT } from "../../Mutations";
import { KEY_RESULTS } from "../../Queries";
import { useMutation } from "@apollo/react-hooks";

interface KeyResultCreateProps {
  objectiveId: number;
}

export const KeyResultCreate: React.FC<KeyResultCreateProps> = ({
  objectiveId,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState(0);

  const parentId = router.query.parent;
  const [createObjective, { data, loading }] = useMutation(CREATE_KEY_RESULT, {
    variables: {
      title,
      description,
      objective: parseInt(parentId as string),
      target,
    },
    refetchQueries: [{ query: KEY_RESULTS }],
    awaitRefetchQueries: true,
  });

  return (
    <KeyResultForm
      createMode
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      target={target}
      setTarget={setTarget}
      updateLoading={loading}
      submitText="Create"
      onSubmit={() => {
        createObjective().then((data) => {
          if (data?.data?.createKeyResult) {
            router.push({
              pathname: "/keyresult",
              query: {
                id: data.data?.createKeyResult?.id,
              },
            });
          }
        });
      }}
      onBack={() =>
        router.push({
          pathname: "/objectives",
        })
      }
    />
  );
};
