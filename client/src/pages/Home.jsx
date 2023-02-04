import Customers from '../components/Customers';
import Orders from '../components/Orders';
import AddCustomerModal from '../components/AddCustomerModal';
import AddOrderModal from '../components/AddOrderModal';

export default function Home() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddCustomerModal />
        <AddOrderModal />
      </div>
      <Orders />
      <hr />
      <Customers />
    </>
  );
}
