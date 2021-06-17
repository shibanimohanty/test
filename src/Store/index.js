import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import combineReducers from '../Reducers/index';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const createMiddleWare = applyMiddleware(thunkMiddleware, logger);

const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage, // define which storage to use
  blacklist: ['BellRingReducer']
}


const persistedReducer = persistReducer(persistConfig, combineReducers)

const store = createStore(
  persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
  createMiddleWare // add any middlewares here
);

const persistor = persistStore(store);

export { store, persistor }

store.subscribe(() => {
})
