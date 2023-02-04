import { gql } from '@apollo/client';

const ADD_CUSTOMER = gql`
  mutation addCustomer($name: String!, $email: String!, $phone: String!) {
    addCustomer(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { ADD_CUSTOMER, DELETE_CUSTOMER };
