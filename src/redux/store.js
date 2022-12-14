import {configureStore, createSlice} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState: {number: 0},
  reducers: {
    counterUp: prevState => {
      prevState.number = prevState.number + 1;
    },
    counterDown: prevState => {
      prevState.number = prevState.number === 0 ? 0 : prevState.number - 1;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, counterSlice.reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store);
export default store;
