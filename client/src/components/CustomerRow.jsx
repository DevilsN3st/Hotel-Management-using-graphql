import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CUSTOMER } from '../mutations/customerMutations';
import { GET_CUSTOMERS } from '../queries/customerQueries';
import { GET_ORDERS } from '../queries/orderQueries';

export default function CustomerRow({ customer }) {
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    variables: { id: customer.id },
    refetchQueries: [{ query: GET_CUSTOMERS }, { query: GET_ORDERS }],
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteCustomer}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
