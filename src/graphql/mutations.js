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
      }
    }
  }
`;

// //export const CreateCarePlan = gql`
//   mutation ($notificationId: ID!, $userId: ID) {
//     updateIsReadStatus(notificationId: $notificationId, userId: $userId) {
//       id
//       notificationDate
//       senderId
//       receiverId
//       notificationText
//       isRead
//     }
//   }
// `;
