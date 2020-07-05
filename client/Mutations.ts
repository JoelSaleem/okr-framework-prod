import { gql } from "apollo-boost";

export const UPDATE_OBJECTIVE = gql`
  mutation UpdateObjective($id: Int!, $title: String, $description: String) {
    updateObjective(id: $id, title: $title, description: $description) {
      id
      title
      description
      createdAt
    }
  }
`;

export const CREATE_OBJECTIVE = gql`
  mutation Objective($title: String!, $description: String!, $parentId: Int) {
    createObjective(
      title: $title
      description: $description
      parentObjective: $parentId
    ) {
      title
      id
    }
  }
`;

export const DELETE_OBJECTIVE = gql`
  mutation DeleteObjective($id: Int!) {
    deleteObjective(id: $id)
  }
`;

export const UPDATE_KEY_RESULT = gql`
  mutation UpdateKR(
    $id: Int!
    $title: String
    $current: Int
    $target: Int
    $description: String
  ) {
    updateKeyResult(
      id: $id
      title: $title
      current: $current
      target: $target
      description: $description
    ) {
      id
      title
      current
      description
      target
      current
    }
  }
`;

export const CREATE_KEY_RESULT = gql`
  mutation CreateKR(
    $title: String!
    $target: Int!
    $description: String!
    $objective: Int!
  ) {
    createKeyResult(
      title: $title
      target: $target
      description: $description
      objective: $objective
    ) {
      id
      title
      current
      target
      description
      objective {
        id
      }
    }
  }
`;

export const DELETE_KEY_RESULT = gql`
  mutation DeleteKeyResult($id: Int!) {
    deleteKeyResult(id: $id)
  }
`;
