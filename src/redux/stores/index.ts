import { configureStore, Action, combineReducers } from '@reduxjs/toolkit'
import thunk, { ThunkAction } from 'redux-thunk'
import { persistReducer, createMigrate, PersistConfig, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { useDispatch } from 'react-redux'
import stateUpgradeMigrations from './stateUpgradeMigrations'
import { persistStore } from 'redux-persist'

import userReducer, { UserState } from '@redux/reducers/User'

const rootReducer = combineReducers({
  User: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage: storage,
  debug: true,
  stateReconciler: autoMergeLevel2,
  migrate: createMigrate(stateUpgradeMigrations, { debug: true }),
  whitelist: ['User'] // Only saves User reducer
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getdefaultMiddleware =>
    getdefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
        ignoreState: true
      }
    })
})

// Types
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

// Typed useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch

// Persistor (used to make sure that we keep redux data on page reload)
export const persistor = persistStore(store)

export default store
