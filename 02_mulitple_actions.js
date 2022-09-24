const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';
const RESTOCK_CAKE = 'RESTOCK_CAKE';

const buyCake = (qty = 1) => {
  return {
    type: BUY_CAKE,
    payload: qty,
  };
};

const restockCake = (qty = 1) => {
  return {
    type: RESTOCK_CAKE,
    payload: qty,
  };
};

const initialState = {
  cakeCount: 10,
};

/* Updated a new case for new action type */
const reducer = (state = initialState, action) => {
  if (action.type === 'BUY_CAKE') {
    return {
      ...state,
      cakeCount: state.cakeCount - action.payload,
    }
  } else if (action.type === 'RESTOCK_CAKE') {
    return {
      ...state,
      cakeCount: state.cakeCount + action.payload,
    } 
  } else {
    return state;
  }
};

const store = createStore(reducer);

const unsubscriber = store.subscribe(() => {
  console.log(`There was a purchase and now we have ${store.getState().cakeCount} cakes in the shop`);
})


store.dispatch(buyCake(1));
store.dispatch(buyCake(3));
store.dispatch(buyCake(1));
store.dispatch(buyCake(2));

/* New action can be dispatched directly */
store.dispatch(restockCake(10));

unsubscriber();


