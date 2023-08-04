import { configureStore } from "@reduxjs/toolkit";
import userReducer from './store/userSlice'
import adminReducer from './store/adminSlice'
import {  persistReducer } from 'redux-persist';
import { combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version:1,
  storage
}

const reducer=combineReducers({
   user:userReducer,
   details:adminReducer
});
 const persistedReducer=persistReducer(persistConfig,reducer)
export const store=configureStore({
    reducer:persistedReducer
});