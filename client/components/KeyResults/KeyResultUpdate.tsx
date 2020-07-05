import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { KEY_RESULT, KEY_RESULTS } from "../../Queries";
import { UPDATE_KEY_RESULT, DELETE_KEY_RESULT } from "../../Mutations";
import Popup from "reactjs-popup";
import { Button } from "../Layout/Button";

import { KeyResultForm } from "./KeyResultForm";
import { useState, useEffect } from "react";

interface KeyResultUpdateProps {
  id: number;
}

export const KeyResultUpdate: React.FC<KeyResultUpdateProps> = ({ id }) => {
  const router = useRouter();
  const [deleteKR] = useMutation(DELETE_KEY_RESULT, {
    variables: {
      id,
    },
    refetchQueries: [{ query: KEY_RESULTS, variables: { id } }],
    optimisticResponse: true,
    awaitRefetchQueries: true,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState(0);
  const [current, setCurrent] = useState(0);

  const { data, loading } = useQuery(KEY_RESULT, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (!loading) {
      setTitle(data?.keyResult?.title ?? "");
      setDescription(data?.keyResult?.description ?? "");
      setTarget(data?.keyResult?.target ?? 0);
      setCurrent(data?.keyResult?.current ?? 0);
    }
  }, [loading]);

  const [updateKR, { loading: updateLoading }] = useMutation(
    UPDATE_KEY_RESULT,
    {
      variables: {
        id,
        title,
        description,
        target,
        current,
      },
    }
  );

  return (
    <>
      <KeyResultForm
        id={id.toString()}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        current={current}
        setCurrent={setCurrent}
        target={target}
        setTarget={setTarget}
        submitText="Save"
        onBack={() => {
          router.push({
            pathname: "/",
          });
        }}
        onSubmit={() => {
          updateKR().then((data) => {
            if (data?.data?.updateKeyResult) {
              router.push({
                pathname: "/",
              });
            }
          });
        }}
        updateLoading={updateLoading}
      />
      <Popup
        trigger={<Button secondary>Delete KR</Button>}
        position="center center"
      >
        <Button
          onClick={() => {
            deleteKR().then((data: any) => {
              if (data.data?.deleteKeyResult) {
                router.push({
                  pathname: "/keyresults",
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
