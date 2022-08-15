import rootReducer from '../reducer/RootReducer';
import { applyMiddleware, compose, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['UserReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
      )
    : applyMiddleware(sagaMiddleware)
);

//sagaMiddleware.run(rootSaga);

export default store;
