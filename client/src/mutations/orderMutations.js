import { gql } from '@apollo/client';

const ADD_ORDER = gql`
  mutation AddOrder(
    $name: String!
    $description: String!
    $status: OrderStatus!
    $customerId: ID!
  ) {
    addOrder(
      name: $name
      description: $description
      status: $status
      customerId: $customerId
    ) {
      id
      name
      description
      status
      customer {
        id
        name
        email
        phone
      }
    }
  }
`;

const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $id: ID!
    $name: String!
    $description: String!
    $status: OrderStatusUpdate!
  ) {
    updateOrder(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      customer {
        id
        name
        email
        phone
      }
    }
  }
`;

export { ADD_ORDER, DELETE_ORDER, UPDATE_ORDER };
