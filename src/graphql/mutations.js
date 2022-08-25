import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Mutation($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      success
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const PROFILE_SETUP = gql`
  mutation Mutation($patientInput: PatientInput!) {
    patientSetup(patientInput: $patientInput) {
      success
      patient {
        username
        // gender
        // genderPreference
        // postcode
        // days
      }
      userId
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      success
      token
      user {
        id
        firstName
        lastName
        email
        accountType
      }
    }
  }
`;
