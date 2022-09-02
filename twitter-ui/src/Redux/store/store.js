import rootReducer from '../reducer/RootReducer';
import { applyMiddleware, compose, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import rootSaga from '../Saga';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['UserReducer', 'RegisterAPIReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
      )
    : applyMiddleware(middleware)
);

sagaMiddleware.run(rootSaga);

export default store;
