import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_ORDER } from '../mutations/orderMutations';
import { GET_ORDERS } from '../queries/orderQueries';
import { GET_CUSTOMERS } from '../queries/customerQueries';

export default function AddOrderModal() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [status, setStatus] = useState('new');
  
  const [addOrder] = useMutation(ADD_ORDER, {
    variables: { name, description, customerId, status },
    update(cache, { data: { addOrder } }) {
      const { orders } = cache.readQuery({ query: GET_ORDERS });
      cache.writeQuery({
        query: GET_ORDERS,
        data: { orders: [...orders, addOrder] },
      });
    },
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || description === '' || status === '') {
      return alert('Please fill in all fields');
    }

    addOrder(name, description, customerId, status);

    setName('');
    setDescription('');
    setStatus('new');
    setCustomerId('');
  };

  if (loading) return null;
  if (error) return 'Something Went Wrong';
  return (
    <>
      {!loading && !error && (
        <>
          <button
            type='button'
            className='btn btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#addOrderModal'
          >
            <div className='d-flex align-items-center'>
              <FaList className='icon' />
              <div>New Order</div>
            </div>
          </button>

          <div
            className='modal fade'
            id='addOrderModal'
            aria-labelledby='addOrderModalLabel'
            aria-hidden='true'
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='addOrderModalLabel'>
                    New Order
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={onSubmit}>
                    <div className='mb-3'>
                      <label className='form-label'>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Description</label>
                      <textarea
                        className='form-control'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Status</label>
                      <select
                        id='status'
                        className='form-select'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value='new'>Not Started</option>
                        <option value='progress'>In Progress</option>
                        <option value='completed'>Completed</option>
                      </select>
                    </div>

                    <div className='mb-3'>
                      <label className='form-label'>Customer</label>
                      <select
                        id='customerId'
                        className='form-select'
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                      >
                        <option value=''>Select Customers</option>
                        {data.customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type='submit'
                      data-bs-dismiss='modal'
                      className='btn btn-primary'
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
