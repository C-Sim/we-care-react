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
    }
  }
`;

export const UPDATE_CHECKOUT = gql`
  mutation UpdateAppointmentCheckout(
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
    }
  }
`;

export const UPDATE_CARER_NOTES = gql`
  mutation UpdateCarerNotes(
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
    }
  }
`;

export const CREATE_APPOINTMENTS = gql`
  mutation CreateAppointments($appointments: [AppointmentInput]!) {
    createAppointments(appointments: $appointments) {
      success
    }
  }
`;
