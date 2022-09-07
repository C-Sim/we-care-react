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

export const CARER_SIGNUP = gql`
  mutation CarerSignup($signupInput: SignupInput!, $carerInput: CarerInput!) {
    carerSignup(signupInput: $signupInput, carerInput: $carerInput) {
      success
    }
  }
`;

export const PROFILE_SETUP = gql`
  mutation Mutation($patientInput: PatientInput!) {
    patientSetup(patientInput: $patientInput) {
      success
      patient {
        username
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
