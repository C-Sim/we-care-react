import { gql } from "@apollo/client";

export const PATIENT_SIGNUP = gql`
  mutation PatientSignup(
    $signupInput: SignupInput!
    $patientInput: PatientInput!
  ) {
    patientSignup(signupInput: $signupInput, patientInput: $patientInput) {
      success
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

export const LOGIN = gql`
  mutation Login($loginInput: LoginInput!) {
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
