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
      user {
        id
        firstName
        lastName
        email
        accountType
        postcode
        phoneNumber
        address {
          fullAddress
        }
      }
    }
  }
`;

export const PATIENT_PROFILE = gql`
  mutation UpdatePatientInfo(
    $userId: ID!
    $updatePatientInput: PatientInfoInput
  ) {
    updatePatientInfo(
      userId: $userId
      updatePatientInput: $updatePatientInput
    ) {
      success
      userId
    }
  }
`;

export const UPDATE_CHECKIN = gql`
  mutation UpdateAppointmentCheckin(
    $appointmentId: ID!
    $trigger: String!
    $appointmentUpdateInput: AppointmentUpdateInput
  ) {
    updateAppointment(
      appointmentId: $appointmentId
      trigger: $trigger
      appointmentUpdateInput: $appointmentUpdateInput
    ) {
      success
      appointment {
        id
        appointmentDate
        patientId {
          id
          firstName
          lastName
          postcode
          address {
            line_1
            fullAddress
          }
          patientProfileId {
            username
            gender
          }
        }
        start
        end
        actualStart
        status
      }
    }
  }
`;
