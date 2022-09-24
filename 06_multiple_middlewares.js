const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const combineReducers = redux.combineReducers;

const BUY_CAKE = 'BUY_CAKE';
const RESTOCK_CAKE = 'RESTOCK_CAKE';

const BUY_ICECREAM = 'BUY_ICECREAM';
const RESTOCK_ICECREAM = 'RESTOCK_ICECREAM';

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

const buyIceCream = (qty = 1) => {
  return {
    type: BUY_ICECREAM,
    payload: qty,
  };
};

const restockIceCream = (qty = 1) => {
  return {
    type: RESTOCK_ICECREAM,
    payload: qty,
  };
};

const initialCakeState = {
  cakeCount: 10,
};

const initialIceCreamState = {
  iceCreamCount: 10,
};

const cakeRreducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamState, action) => {
  if (action.type === 'BUY_ICECREAM') {
    return {
      ...state,
      iceCreamCount: state.iceCreamCount - action.payload,
    }
  } else if (action.type === 'RESTOCK_ICECREAM') {
    return {
      ...state,
      iceCreamCount: state.iceCreamCount + action.payload,
    } 
  } else {
    return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeRreducer,
  iceCream: iceCreamReducer,
})
const store = createStore(rootReducer);

store.dispatch(buyCake(1));
store.dispatch(buyCake(3));
store.dispatch(buyIceCream(3));
store.dispatch(buyCake(1));
store.dispatch(buyCake(2));
store.dispatch(buyIceCream(7));

store.dispatch(restockCake(10));
store.dispatch(restockIceCream(15));
