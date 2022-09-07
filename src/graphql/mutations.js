import { gql } from "@apollo/client";

export const PATIENT_SIGNUP = gql`
  mutation PatientSignup(
    $signupInput: SignupInput!
    $patientInput: PatientInput!
  ) {
    patientSignup(signupInput: $signupInput, patientInput: $patientInput) {
      success
      user {
        firstName
        lastName
        email
        accountType
        postcode
      }
      patient {
        username
        days
        notificationCount
        appointmentCount
        gender
      }
      userId
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
