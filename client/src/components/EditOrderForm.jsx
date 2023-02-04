import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_ORDER } from "../queries/orderQueries";
import { UPDATE_ORDER } from "../mutations/orderMutations";

export default function EditOrderForm({ order }) {
  const [name, setName] = useState(order.name);
  const [description, setDescription] = useState(order.description);
  const [status, setStatus] = useState(() => {
    switch (order.status) {
      case "Not Started":
        return "new";
      case "In Progress":
        return "progress";
      case "Completed":
        return "completed";
      default:
        throw new Error(`Unknown status: ${order.status}`);
    }
  });

  const [updateOrder] = useMutation(UPDATE_ORDER, {
    variables: { id: order.id, name, description, status },
    refetchQueries: [{ query: GET_ORDER, variables: { id: order.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !status) {
      return alert("Please fill out all fields");
    }

    updateOrder(name, description, status);
  };

  return (
    <div className="mt-5">
      <h3>Update Order Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
