import { gql } from "@apollo/client";

export const CARERS = gql`
  query Carers {
    carers {
      userId {
        id
        email
      }
      username
      gender
    }
  }
`;
