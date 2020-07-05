import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "../components/Layout/Button";
import { MainWrapper } from "../components/Layout/MainWrapper";
import { ObjectivesList } from "../components/Objectives/ObjectivesList";
import { LOCAL_STORAGE_TOKEN_KEY } from "./_app";

export default () => {
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!token) {
      router.push({
        pathname: "/login",
      });
    }
  });

  return (
    <MainWrapper heading="Objectives">
      <ObjectivesList />
      <Button
        onClick={() => {
          router.push({
            pathname: "/objective",
            query: { parent: router.query.parent },
          });
        }}
      >
        Create
      </Button>
      <Button
        onClick={() => {
          router.push("/");
        }}
        secondary
      >
        Back
      </Button>
    </MainWrapper>
  );
};
