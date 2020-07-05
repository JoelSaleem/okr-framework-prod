import { gql } from "apollo-boost";

export const TOKEN_KEY = "__okr__fram__token__";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const SET_USER_DETAILS_CLIENT = gql`
  mutation SetUserDetails($id: ID, $username: String) {
    setUserDetails(id: $id, username: $username) @client
  }
`;

export const GET_USER_DETAILS_CLIENT = gql`
  query User {
    User @client {
      id
      username
    }
  }
`;
