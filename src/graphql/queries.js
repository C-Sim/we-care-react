import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Mutation($signupInput: SignupInput!) {
    signup(signupInput: $signupInput) {
      success
    }
  }
`;

export const LOGIN = gql`
  mutation Mutation($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      success
      token
      user {
        id
        firstName
        lastName
        email
        phoneNumber
        imageUrl
        userType
        address {
          _id
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
          fullAddress
        }
      }
    }
  }
`;
