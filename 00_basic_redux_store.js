const redux = require("redux");
const createStore = redux.createStore;

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

/* Initialisations complete. Now emit the ACTION and also 
  subscribe to changes in store to get updates */
store.dispatch({
  type: 'BUY_CAKE',
  payload: 1,
});

store.dispatch({
  type: 'BUY_CAKE',
  payload: 1,
});

store.dispatch({
  type: 'BUY_CAKE',
  payload: 1,
});

store.dispatch({
  type: 'BUY_CAKE',
  payload: 2,
});

unsubscriber();


