const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';
const CHECK_INVENTORY = 'CHECK_INVENTORY';
const FIND_BALANCE = 'FIND_BALANCE';

const buyCake = qty => {
  return {
    type: BUY_CAKE,
    qty: qty,
  };
};

const checkInventory = qty => {
  return {
    type: CHECK_INVENTORY,
    qty: qty,
  };
};

const findBalance = () => {
  return {
    type: FIND_BALANCE,
  };
};

const initialState = {
  cakeCount: 10,
  balance: 0,
  price: 5,
};

