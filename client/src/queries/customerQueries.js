import { gql } from '@apollo/client';

const GET_CUSTOMERS = gql`
  query getCustomers {
    customers {
      id
      name
      email
      phone
    }
  }
`;

export { GET_CUSTOMERS };
