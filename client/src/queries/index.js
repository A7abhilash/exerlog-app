import { gql } from "@apollo/client";

export const getUserExercises = gql`
  query ($id: ID!) {
    user(id: $id) {
      exercises {
        name
        workouts
        id
      }
    }
  }
`;

export const getUserLogsQuery = gql`
  query ($id: ID!) {
    user(id: $id) {
      logs {
        date
        logs {
          exercise
          workout
        }
        id
      }
    }
  }
`;

export const addNewExerciseMutation = gql`
  mutation ($name: String!, $userId: ID!) {
    addNewExercise(input: { name: $name, userId: $userId }) {
      name
    }
  }
`;

export const updateExerciseMutation = gql`
  mutation ($id: ID!, $name: String!, $workouts: [String]) {
    updateExercise(input: { id: $id, name: $name, workouts: $workouts }) {
      name
    }
  }
`;

export const deleteExerciseMutation = gql`
  mutation ($id: ID!) {
    deleteExercise(input: { id: $id }) {
      id
    }
  }
`;

export const addNewLogMutation = gql`
  mutation ($date: String!, $userId: ID!) {
    addNewLog(input: { date: $date, userId: $userId }) {
      date
      id
    }
  }
`;

export const updateLogMutation = gql`
  mutation ($id: ID!, $logs: [EachLogInput]!) {
    updateLog(input: { id: $id, logs: $logs }) {
      id
      logs {
        exercise
        workout
      }
    }
  }
`;

export const deleteLogMutation = gql`
  mutation ($id: ID!) {
    deleteLog(input: { id: $id }) {
      id
    }
  }
`;
