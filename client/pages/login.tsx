import { useRouter } from "next/router";
import { DocumentNode } from "apollo-boost";
import styled from "styled-components";
import { Card } from "../components/Layout/Card";
import { LoginForm } from "../components/Login/LoginForm";
import { LOGIN, SIGNUP } from "../components/Login/LoginMutations";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 10% 1fr 10%;
  grid-template-rows: 10% 1fr 60%;
`;

const Heading = styled.h1`
  text-align: center;
  grid-area: 1 / 2 / 2 / 3;
`;

const CentreGrid = styled.div`
  grid-area: 2 / 2 / 3 / 3;
`;

const loginOptions = {
  login: {
    buttonText: "Log In",
    submitMutation: LOGIN,
    routeButtonText: "Register",
    routeButtonQuery: { page: "signup" },
  },
  signup: {
    buttonText: "Sign Up",
    submitMutation: SIGNUP,
    routeButtonText: "Log In",
    routeButtonQuery: { page: "login" },
  },
};
type loginPages = "signup" | "login" | undefined;

export default () => {
  const router = useRouter();

  let buttonText: string;
  let submitMutation: DocumentNode;
  let routeBtnQuery: { page: string };
  let routeBtnText: string;
  const page = router.query.page as loginPages;
  switch (page) {
    case "signup":
      buttonText = loginOptions.signup.buttonText;
      submitMutation = loginOptions.signup.submitMutation;
      routeBtnQuery = loginOptions.signup.routeButtonQuery;
      routeBtnText = loginOptions.signup.routeButtonText;
      break;
    default:
      buttonText = loginOptions.login.buttonText;
      submitMutation = loginOptions.login.submitMutation;
      routeBtnQuery = loginOptions.login.routeButtonQuery;
      routeBtnText = loginOptions.login.routeButtonText;
  }

  return (
    <Grid>
      <Heading>OKR</Heading>
      <CentreGrid>
        <Card>
          <LoginForm
            routeButtonQuery={routeBtnQuery}
            routeButtonText={routeBtnText}
            buttonText={buttonText}
            submitMutation={submitMutation}
          />
        </Card>
      </CentreGrid>
    </Grid>
  );
};
