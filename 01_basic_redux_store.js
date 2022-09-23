const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';

const buyCake = (qty) => {
  return {
    type: BUY_CAKE,
    quantity: qty,
  };
};

const initialState = {
  cakeCount: 10,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'BUY_CAKE') {
    return {
      ...state,
      cakeCount: state.cakeCount - action.quantity,
    }
  } else {
    return state;
  }
};

const store = createStore(reducer);

const unsubscriber = store.subscribe(() => {
  console.log(`There was a purchase and now we have ${store.getState().cakeCount} cakes in the shop`);
})

/* Initialisations complete. Now emit the ACTION and also 
  subscribe to changes in store to get updates */
store.dispatch(buyCake(1));
store.dispatch(buyCake(1));
store.dispatch(buyCake(1));
store.dispatch(buyCake(2));

unsubscriber();


