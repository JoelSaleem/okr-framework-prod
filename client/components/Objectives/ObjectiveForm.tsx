import styled from "styled-components";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { LabelInput } from "../Layout/LabelInput";
import { useState } from "react";
import { Button } from "../Layout/Button";

import { OBJECTIVE } from "../../Queries";
import { UPDATE_OBJECTIVE } from "../../Mutations";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 50%;
  height: 100%;
  justify-content: space-evenly;
  padding: 12px;
  overflow: auto;
`;

interface ObjectiveFormProps {
  id?: string;
  title: string;
  description: string;
  createdAt?: string;
  updateLoading: boolean;
  setTitle: (title: string) => void;
  setDescription: (descr: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitText: string;
  createMode?: boolean;
}

export const ObjectiveForm: React.FC<ObjectiveFormProps> = ({
  id,
  title,
  description,
  createdAt,
  setTitle,
  setDescription,
  updateLoading,
  onSubmit,
  onBack,
  submitText,
  createMode = false,
}) => {
  return (
    <FormWrapper>
      {!createMode && (
        <LabelInput disabled label="Id" value={id} onChange={() => {}} />
      )}
      <LabelInput
        label="Title"
        value={title ?? ""}
        onChange={(e) => setTitle(e.target.value)}
      />
      <LabelInput
        label="Description"
        value={description ?? ""}
        onChange={(e) => setDescription(e.target.value)}
      />
      {!createMode && (
        <LabelInput
          label="Created At"
          disabled
          value={createdAt}
          onChange={() => {}}
        />
      )}
      {updateLoading ? (
        "Loading"
      ) : (
        <Button onClick={onSubmit}>{submitText}</Button>
      )}
      <Button onClick={onBack} secondary>
        Back
      </Button>
    </FormWrapper>
  );
};
