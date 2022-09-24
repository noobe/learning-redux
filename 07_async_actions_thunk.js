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

  If we make the API call from normal actionCreator method 
*/

const fetchUsers = () => {
  // return fetchUsersSuccess([ { username: 'test', userId: 1 } ]);
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      const users = response.data;
      return fetchUsersSuccess(users);
    })
    .catch(response => {
      const err = response.message;
      return fetchUsersFailed(err);
    });
};

const store = Redux.createStore(reducer, Redux.applyMiddleware(logger));

store.dispatch(fetchUsers());