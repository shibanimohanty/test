export const createOrder = `
mutation CreateOrder($input: OrderInput!) {
    createOrder(inputOrder: $input) {
      incomingOrderTs
      isPaid
      orderDuration
      orderId
      payMethod
      tableName
      userId
      wish
    }
  } 
`;
