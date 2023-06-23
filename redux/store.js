import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authSlice } from "./authSlice";

const persistConfig = {
  key: "auth",
  storage: AsyncStorage,
};
const rootReducers = combineReducers({ [authSlice.name]: authSlice.reducer });

const reducer = persistReducer(persistConfig, rootReducers);
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);