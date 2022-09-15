import { gql } from "@apollo/client";

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
      isProcessed
      appointmentId
      appointmentDate
      patientUsername
    }
  }
`;

// userId of patient - correctly referenced here
export const PATIENT_APPROVE = gql`
  mutation UpdateApprovedStatus($userId: ID!) {
    updateApprovedStatus(userId: $userId) {
      success
      userId
    }
  }
`;

// passing a new carerId into the appointmentUpdateInput
export const UPDATE_CARER = gql`
  mutation UpdateCarer(
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
