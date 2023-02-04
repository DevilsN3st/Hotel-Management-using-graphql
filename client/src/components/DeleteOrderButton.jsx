import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { DELETE_ORDER } from '../mutations/orderMutations';
import { GET_ORDERS } from '../queries/orderQueries';
import { useMutation } from '@apollo/client';

export default function DeleteOrderButton({ orderId }) {
  const navigate = useNavigate();

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    variables: { id: orderId },
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_ORDERS }],
  });

  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger m-2' onClick={deleteOrder}>
        <FaTrash className='icon' /> Delete Order
      </button>
    </div>
  );
}
