import { useRouter } from "next/router";
import { useEffect } from "react";
import { LOCAL_STORAGE_TOKEN_KEY } from "./_app";
import { MainWrapper } from "../components/Layout/MainWrapper";
import { ObjectiveUpdate } from "../components/Objectives/ObjectiveUpdate";
import { ObjectiveCreate } from "../components/Objectives/ObjectiveCreate";

export default () => {
  const router = useRouter();
  const objectiveId = router.query.id;

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
    <MainWrapper heading="Objective">
      {objectiveId && <ObjectiveUpdate id={parseInt(objectiveId as string)} />}
      {!objectiveId && <ObjectiveCreate />}
    </MainWrapper>
  );
};
