import { gql } from "@apollo/client";

export const USER_ID = gql`
  query UserInfo {
    userInfo {
      id
      firstName
      lastName
      email
      phoneNumber
      accountType
      postcode
      address {
        fullAddress
      }
    }
  }
`;

export const CARER_DASHBOARD = gql`
  query CarerDashboard {
    carerDashboard {
      carer {
        userId
        postcode
        days
        notificationCount
      }
      appointments {
        id
        patientId
        carerId
        start
        end
        status
        actualStart
        actualEnd
      }
      notifications {
        notificationDate
        receiverId
        senderId
        isRead
        notificationText
      }
    }
  }
`;

export const PATIENT_DASHBOARD = gql`
  query PatientDashboard {
    patientDashboard {
      patient {
        userId
        postcode
        days
        notificationCount
      }
      appointments {
        id
        patientId
        carerId
        start
        end
        status
        actualStart
        actualEnd
      }
      notifications {
        notificationDate
        receiverId
        senderId
        isRead
        notificationText
      }
    }
  }
`;

export const FIND_BY_GENDER = gql`
  query FindPatientsByCarerGender($userId: ID!) {
    findPatientsByCarerGender(userId: $userId) {
      userId {
        id
        firstName
        lastName
        email
        phoneNumber
      }
      gender
      postcode
      days
      notificationCount
      appointmentCount
    }
  }
`;

export const FIND_BY_GENDER_AND_DAY = gql`
  query FindPatientsByCarerGenderAndDay($userId: ID!, $dayInput: DayInput) {
    findPatientsByCarerGenderAndDay(userId: $userId, dayInput: $dayInput) {
      userId {
        id
        firstName
        lastName
        email
        phoneNumber
      }
      gender
      postcode
      days
      notificationCount
      appointmentCount
    }
  }
`;

export const ADDRESS_LOOKUP = gql`
  query AddressLookup($postcode: String!) {
    addressLookup(postcode: $postcode) {
      postcode
      latitude
      longitude
      addresses {
        formatted_address
        thoroughfare
        building_name
        sub_building_name
        sub_building_number
        building_number
        line_1
        line_2
        line_3
        line_4
        locality
        town_or_city
        county
        district
        country
        _id
        fullAddress
      }
    }
  }
`;

export const APPOINTMENTS_BY_ID = gql`
  query AppointmentsByUserId {
    appointmentsByUserId {
      id
      appointmentDate
      patientId {
        id
        firstName
        lastName
        postcode
        address {
          fullAddress
        }
        patientProfileId {
          username
          gender
        }
      }
      carerId {
        id
        firstName
        lastName
        carerProfileId {
          username
          gender
        }
      }
      start
      end
      status
    }
  }
`;

export const RECEIVED_NOTIFICATIONS = gql`
  query ReceivedNotificationsByUserId {
    notificationsByUserId {
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
export const AVAILABLE_CARERS = gql`
  query AvailableCarers($selectedDate: String!) {
    availableCarersByDate(selectedDate: $selectedDate) {
      userId
      username
      gender
      appointments {
        appointmentDate
        title
      }
    }
  }
`;

export const AVAILABLE_PATIENTS = gql`
  query AvailablePatients($userId: ID!, $selectedDate: String!) {
    availablePatientsByCarerGenderAndDay(
      userId: $userId
      selectedDate: $selectedDate
    ) {
      userId
      username
      gender
      appointments {
        appointmentDate
        title
      }
    }
  }
`;
