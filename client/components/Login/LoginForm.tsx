import { useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { LabelInput } from "../Layout/LabelInput";
import { Button } from "../Layout/Button";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../pages/_app";
import { DocumentNode } from "graphql";
import { withAuthCtx, AuthContext } from "../../state/authContext";

const Container = styled.div`
  min-width: 330px;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 10%;
  height: 100%;
`;

const CentreWrapper = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  display: grid;
  grid-template-rows: 5% repeat(4, 1fr) 5%;
`;

const EmailWrapper = styled.div`
  grid-area: 2 / 1 / 3 / 2;
`;

const PasswordWrapper = styled.div`
  grid-area: 3 / 1 / 4 / 2;
`;

const SubmitWrapper = styled.div`
  grid-area: 4 / 1 / 5 / 2;
`;

const SwitchPageWrapper = styled.div`
  grid-area: 5 / 1 / 6 / 2;
`;

interface LoginFormProps {
  submitMutation: DocumentNode;
  buttonText: string;
  routeButtonText: string;
  routeButtonQuery: { page: string };
}

export const LoginForm: React.FC<LoginFormProps> = withAuthCtx<LoginFormProps>(
  ({
    buttonText,
    submitMutation,
    routeButtonQuery,
    routeButtonText,
  }: LoginFormProps) => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setEmail: setEmailCtx } = useContext(AuthContext);

    const [onSubmit, { loading, error }] = useMutation(submitMutation, {
      variables: {
        email,
        password,
      },
    });

    const handleSubmit = () => {
      onSubmit().then(async ({ data }) => {
        if (typeof window === "undefined") {
          return;
        }
        const token = data?.login?.token;
        localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
        setEmailCtx(data?.login?.user?.email);

        router.push({
          pathname: "/",
        });
      });
    };

    return (
      <Container>
        <CentreWrapper>
          <EmailWrapper>
            <LabelInput
              label="Email:"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </EmailWrapper>
          <PasswordWrapper>
            <LabelInput
              type="password"
              label="Password:"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </PasswordWrapper>
          <SubmitWrapper>
            {loading ? (
              "Loading..."
            ) : (
              <Button onClick={handleSubmit}>{buttonText}</Button>
            )}
          </SubmitWrapper>
          <SwitchPageWrapper>
            <Button
              onClick={() => {
                router.push({
                  pathname: "/login",
                  query: routeButtonQuery,
                });
              }}
              secondary
            >
              {routeButtonText}
            </Button>
          </SwitchPageWrapper>
        </CentreWrapper>
      </Container>
    );
  }
);
