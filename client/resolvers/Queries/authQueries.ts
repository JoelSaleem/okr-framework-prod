import { gql } from "apollo-boost";

export const authQueries = {
  User(launch, _args, { cache, getCacheKey }) {
    const user = cache?.data?.data["User:loggedInUser"];
    console.log("USER", cache.data.data);
    return user;
  },
};
