const Redux = require("redux");
const ReduxLogger = require("redux-logger");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const logger = ReduxLogger.logger;

const initialState = {
  loading: false,
  users: [],
  error: '',
};

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUESTED });

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  }
};
const fetchUsersFailed = error => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  }
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
      }
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
};

/*
  In normal case where we have all the data in the local redux store, the action creator
  just has to trigger the action needed for the corresponding update to the store and 
  fetch final data using subscribe or getState.

  But when the same data is needed from an async call, we need to create custom action creator
  which can make the API call as well.

  If we make the API call from normal actionCreator method we get the following error:
  Error: Actions must be plain objects. Instead, the actual type was: 'Promise'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.

  By adding the thunk middleware the store.dispatch which normally accepts only an 
  ACTION object, will now have the capability to accept a callback function as well.

  So when we pass this new function to store.dispatch(), it will triggeer the function and
  pass it an argument called dispatch which can be used my the passed function internally
  to emit any ACTIONs from within.

  Remember its not the action creator that gets the dispatch, but the function it 
  returns which gets it.
*/



const fetchUsers = () => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios.get('https://jsonplaceholder.typicode.com/users/2')
    .then(response => {
      const users = response.data;
      dispatch(fetchUsersSuccess(users));
    })
    .catch(response => {
      const err = response.message;
      dispatch(fetchUsersFailed(err));
    });
  };
};

const store = Redux.createStore(reducer, Redux.applyMiddleware(logger, thunkMiddleware));

store.dispatch(fetchUsers());