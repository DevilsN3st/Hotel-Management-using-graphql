const Order = require('../models/Order');
const Customer = require('../models/Customer');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require('graphql');

// Order Type
const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    customer: {
      type: CustomerType,
      resolve(parent, args) {
        return Customer.findById(parent.customerId);
      },
    },
  }),
});

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    orders: {
      type: new GraphQLList(OrderType),
      resolve(parent, args) {
        return Order.find();
      },
    },
    order: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Order.findById(args.id);
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parent, args) {
        return Customer.find();
      },
    },
    customer: {
      type: CustomerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Customer.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Add a Customer
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const customer = new Customer({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return customer.save();
      },
    },
    // Delete a Customer
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Order.find({ customerId: args.id }).then((orders) => {
          orders.forEach((order) => {
            order.remove();
          });
        });

        return Customer.findByIdAndRemove(args.id);
      },
    },
    // Add a Order
    addOrder: {
      type: OrderType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: 'OrderStatus',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
          defaultValue: 'Not Started',
        },
        customerId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const order = new Order({
          name: args.name,
          description: args.description,
          status: args.status,
          customerId: args.customerId,
        });
        // console.log(order);
        return order.save();
      },
    },
    // Delete a Order
    deleteOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Order.findByIdAndRemove(args.id);
      },
    },
    // Update a Order
    updateOrder: {
      type: OrderType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: 'OrderStatusUpdate',
            values: {
              new: { value: 'Not Started' },
              progress: { value: 'In Progress' },
              completed: { value: 'Completed' },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Order.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
