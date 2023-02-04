import Spinner from './Spinner';
import { useQuery } from '@apollo/client';
import OrderCard from './OrderCard';
import { GET_ORDERS } from '../queries/orderQueries';

export default function Orders() {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.orders.length > 0 ? (
        <div className='row mt-4'>
          {data.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p>No Orders</p>
      )}
    </>
  );
}
