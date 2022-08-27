import { gql } from "@apollo/client";

export const USERS = gql`
  query Users {
    users {
      id
      firstName
      lastName
      email
      accountType
    }
  }
`;

export const USER_ID = gql`
  query UserInfo($userId: ID!) {
    userInfo(userId: $userId) {
      id
      firstName
      lastName
      email
      accountType
    }
  }
`;

export const CARER_DASHBOARD = gql`
  query CarerDashboard($userId: ID!) {
    carerDashboard(userId: $userId) {
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
  query PatientDashboard($userId: ID!) {
    patientDashboard(userId: $userId) {
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

export const FIND_BY_GENDER = gql`query FindPatientsByCarerGender($userId: ID!) {
  findPatientsByCarerGender(userId: $userId) {
      userId {
          id
          firstName
          lastName
          email
      }
      gender
      postcode
      days
      notificationCount
      appointmentCount
    }`;

export const FIND_BY_GENDER_AND_DAY = gql`
  query FindPatientsByCarerGenderAndDay($userId: ID!, $dayInput: DayInput) {
    findPatientsByCarerGenderAndDay(userId: $userId, dayInput: $dayInput) {
      userId {
        id
        firstName
        lastName
        email
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
  query Query($postcode: String!) {
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
