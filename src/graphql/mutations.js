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
        phoneNumber
        postcode
        address {
          fullAddress
        }
      }
    }
  }
`;

export const USER_PROFILE = gql`
  mutation UpdateUserInfo($userId: ID!, $updateInput: UserInfoInput) {
    updateUserInfo(userId: $userId, updateInput: $updateInput) {
      success
      userId
    }
  }
`;

export const PATIENT_INFO = gql`
  mutation UpdatePatientInfo($userId: ID!, $updateInput: PatientInfoInput) {
    updatePatientInfo(userId: $userId, updateInput: $updateInput) {
      success
      userId
    }
  }
`;

export const USER_INFO = gql`
  mutation UpdateUserInfo($updateInput: UserInfoInput) {
    updateUserInfo(updateInput: $updateInput) {
      success
      userId
    }
  }
`;
