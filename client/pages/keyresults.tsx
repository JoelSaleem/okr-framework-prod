import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "../components/Layout/Button";
import { MainWrapper } from "../components/Layout/MainWrapper";
import { KeyResultList } from "../components/KeyResults/KeyResultList";
import { LOCAL_STORAGE_TOKEN_KEY } from "./_app";

export default () => {
  const router = useRouter();

  const parent = router.query.parent;

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
    <MainWrapper heading="Key Results">
      <KeyResultList
        parent={(parent as string) ? parseInt(parent as string) : undefined}
      />
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
