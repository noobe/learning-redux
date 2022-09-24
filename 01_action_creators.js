const redux = require("redux");
const createStore = redux.createStore;

/* 
  ACTION objects can be directly created in the store.dispatch() method but
  its a lot cleaner and re-usable if we take this out into a function.
  ACTION types are unique, so we could also create standard constants for them.
*/
const BUY_CAKE = 'BUY_CAKE';
const buyCake = qty => {
  return {
    type: BUY_CAKE,
    payload: qty,
  };
};

const initialState = {
  cakeCount: 10,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'BUY_CAKE') {
    return {
      ...state,
      cakeCount: state.cakeCount - action.payload,
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
store.dispatch(buyCake(1));
store.dispatch(buyCake(1));
store.dispatch(buyCake(2));

unsubscriber();


