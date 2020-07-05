import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useState } from "react";
import Popup from "reactjs-popup";

import { OBJECTIVE, ROOT_OBJECTIVES } from "../../Queries";
import { UPDATE_OBJECTIVE, DELETE_OBJECTIVE } from "../../Mutations";

import { Button } from "../Layout/Button";
import { ObjectiveForm } from "./ObjectiveForm";

interface ObjectiveUpdate {
  id: number;
}

export const ObjectiveUpdate: React.FC<ObjectiveUpdate> = ({ id }) => {
  const router = useRouter();
  const { data, loading } = useQuery(OBJECTIVE, { variables: { id } });
  const [deleteObjective] = useMutation(DELETE_OBJECTIVE, {
    variables: { id },
    refetchQueries: [{ query: ROOT_OBJECTIVES }],
    awaitRefetchQueries: true,
  });

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  let formattedDate: string | null = null;
  if (data?.objective?.createdAt) {
    formattedDate = new Date(data?.objective?.createdAt).toString();
  }

  // Set data after query fetched
  useEffect(() => {
    if (!loading) {
      setTitle(() => data?.objective?.title ?? "");
      setDescription(() => data?.objective?.description ?? "");
    }
  }, [loading]);

  const [updateObjective, { loading: updateLoading }] = useMutation(
    UPDATE_OBJECTIVE,
    {
      variables: data?.objective ? { id, title, description } : { id },
      refetchQueries: [{ query: ROOT_OBJECTIVES }],
      awaitRefetchQueries: true,
    }
  );

  return (
    <>
      <ObjectiveForm
        id={id.toString()}
        title={title}
        description={description}
        createdAt={formattedDate}
        setTitle={setTitle}
        setDescription={setDescription}
        updateLoading={updateLoading}
        onSubmit={updateObjective}
        onBack={() => {
          router.push({
            pathname: "/objectives",
          });
        }}
        submitText={"Save"}
      />
      <Button
        onClick={() => {
          router.push({
            pathname: "/objectives",
            query: {
              parent: id,
            },
          });
        }}
      >
        View Child Objectives
      </Button>
      <Button
        onClick={() => {
          router.push({
            pathname: "/objective",
            query: {
              parent: id,
            },
          });
        }}
      >
        Create Child Objectives
      </Button>
      <Button
        onClick={() => {
          router.push({
            pathname: "/keyresults",
            query: {
              parent: id,
            },
          });
        }}
      >
        View Key Results
      </Button>
      <Button
        onClick={() => {
          router.push({
            pathname: "/keyresult",
            query: {
              parent: id,
            },
          });
        }}
      >
        Create Key Result
      </Button>
      <Popup
        trigger={<Button secondary>Delete Objective</Button>}
        position="center center"
      >
        <Button
          onClick={() => {
            deleteObjective().then((data) => {
              if (data.data?.deleteObjective) {
                router.push({
                  pathname: "/objectives",
                });
              }
            });
          }}
        >
          Confirm
        </Button>
      </Popup>
    </>
  );
};
