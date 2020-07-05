import { createContext, useState } from "react";

interface AuthFields {
  email: string;
  setEmail: (email: string) => void;
}

export const AuthContext = createContext<AuthFields>({
  email: "",
  setEmail(email: string) {},
});

export const withAuthCtx = <T extends {}>(WrappedComponent: any) => (
  props: T
) => {
  const [email, setEmail] = useState("");
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      <WrappedComponent {...props} />
    </AuthContext.Provider>
  );
};
