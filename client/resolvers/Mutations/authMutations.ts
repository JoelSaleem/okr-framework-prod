import { gql } from "apollo-boost";
import { CLIENT_RENEG_WINDOW } from "tls";

export const authMutations = {
  setUserDetails: (_root, variables, { cache, getCacheKey }) => {
    const id = getCacheKey({ __typename: "User", id: "loggedInUser" });
    const fragment = gql`
      fragment userDetails on User {
        id
        username
      }
    `;
    const user = cache.readFragment({ fragment, id });
    const data = {
      ...user,
      username: variables.username + 123,
      id: variables.id,
    };
    cache.writeData({ id, data });
    console.log("cac hE", cache);
  },
};
