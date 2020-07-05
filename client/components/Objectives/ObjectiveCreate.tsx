import { Objective } from "../../types";
import { useRouter } from "next/router";
import { ObjectiveForm } from "./ObjectiveForm";
import { useState } from "react";
import { CREATE_OBJECTIVE } from "../../Mutations";
import { useMutation } from "@apollo/react-hooks";

export const ObjectiveCreate = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const parentId = router.query.parent;
  const [createObjective, { data, loading }] = useMutation(CREATE_OBJECTIVE, {
    variables: {
      title,
      description,
      parentId: parseInt(parentId as string),
    },
  });

  return (
    <ObjectiveForm
      createMode
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      submitText="Create"
      onSubmit={() =>
        createObjective().then((data: any) => {
          if (data?.data?.createObjective) {
            const id = data?.data?.createObjective?.id;
            router.push({
              pathname: "/objective",
              query: {
                id,
              },
            });
          }
        })
      }
      onBack={() => router.push({ pathname: "/objectives" })}
      updateLoading={false}
    />
  );
};
