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

export const UPDATE_READ = gql`
  mutation UpdateIsReadStatus($notificationId: ID!) {
    updateIsReadStatus(notificationId: $notificationId) {
      id
      notificationDate
      senderId
      receiverId
      notificationText
      isRead
    }
  }
`;

export const USER_PROFILE = gql`
  mutation UpdateUserInfo($updateInput: UserInfoInput) {
    updateUserInfo(updateInput: $updateInput) {
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
  mutation UpdatePatientInfo($updatePatientInput: PatientInfoInput) {
    updatePatientInfo(updatePatientInput: $updatePatientInput) {
      success
      userId
    }
  }
`;

// userId of patient - correctly referenced here?
export const PATIENT_APPROVE = gql`
  mutation UpdateApprovedStatus($userId: ID!) {
    updateApprovedStatus(userId: $userId) {
      success
      userId
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointmentCarer(
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
      }
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

export const PROCESS_NOTIFICATION = gql`
  mutation Mutation($processNotificationInput: ProcessNotificationInput!) {
    processNotification(processNotificationInput: $processNotificationInput) {
      id
      notificationDate
      notificationType
      notificationText
      senderId {
        id
        firstName
        lastName
        accountType
        email
      }
      receiverId
      isRead
      appointmentId
      appointmentDate
      patientUsername
    }
  }
`;
