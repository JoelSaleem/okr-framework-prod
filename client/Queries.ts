import { gql } from "apollo-boost";

export const OBJECTIVES = gql`
  {
    objectives {
      id
      title
      description
      createdAt
    }
  }
`;

export const ROOT_OBJECTIVES = gql`
  {
    rootObjectives {
      id
      title
      description
      createdAt
    }
  }
`;

export const OBJECTIVE = gql`
  query Objective($id: Int!) {
    objective(id: $id) {
      id
      title
      description
      createdAt
    }
  }
`;

export const OBJECTIVES_OF_PARIENT = gql`
  query ObjectivesOfParent($parent: Int!) {
    objectivesOfParent(parent: $parent) {
      id
      title
      description
      createdAt
      parentObjective {
        id
      }
    }
  }
`;

export const KEY_RESULTS = gql`
  {
    keyResults {
      id
      title
      description
      target
      current
      createdAt
      objective {
        id
      }
    }
  }
`;

export const KEY_RESULT = gql`
  query KeyResult($id: Int!) {
    keyResult(id: $id) {
      id
      title
      description
      target
      current
      createdAt
      objective {
        id
      }
    }
  }
`;

export const KEY_RESULT_OF_PARENT = gql`
  query KR($parent: Int!) {
    keyResultsOfObjective(parent: $parent) {
      id
      title
      description
      target
      current
      createdAt
      objective {
        id
      }
    }
  }
`;
