export default function OrderCard({ order }) {
  return (
    <div className='col-md-6'>
      <div className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='card-title'>{order.name}</h5>

            <a className='btn btn-light' href={`/orders/${order.id}`}>
              View
            </a>
          </div>
          <p className='small'>
            Status: <strong>{order.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
