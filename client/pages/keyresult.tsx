import { useRouter } from "next/router";
import { useEffect } from "react";
import { LOCAL_STORAGE_TOKEN_KEY } from "./_app";
import { MainWrapper } from "../components/Layout/MainWrapper";

import { KeyResultCreate } from "../components/KeyResults/KeyResultCreate";
import { KeyResultUpdate } from "../components/KeyResults/KeyResultUpdate";

export default () => {
  const router = useRouter();

  const keyResultId = router.query?.id;
  const objectiveId = router.query?.parent;

  const isCreateView = !keyResultId && objectiveId;
  const isUpdateView = keyResultId && !objectiveId;

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
    } else if (isCreateView && isUpdateView) {
      router.push({
        pathname: "/",
      });
    }
  });

  return (
    <MainWrapper heading="Key Results">
      {isUpdateView && <KeyResultUpdate id={parseInt(keyResultId as string)} />}
      {isCreateView && (
        <KeyResultCreate objectiveId={parseInt(objectiveId as string)} />
      )}
    </MainWrapper>
  );
};
