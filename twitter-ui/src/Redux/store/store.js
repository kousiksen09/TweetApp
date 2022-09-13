import rootReducer from '../reducer/RootReducer';
import { applyMiddleware, compose, createStore } from 'redux';

import createSagaMiddleware from 'redux-saga';
//import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage/session';
import rootSaga from '../Saga';

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['UserReducer', 'RegisterAPIReducer'],
// };

//const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(
        applyMiddleware(sagaMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
      )
    : applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;
