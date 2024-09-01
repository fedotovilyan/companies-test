import { companiesSlice } from "@/entities/Company";
import {
  configureStore,
  ThunkAction,
  UnknownAction,
} from "@reduxjs/toolkit";
import {
  useDispatch,
  TypedUseSelectorHook,
  useSelector,
  useStore,
} from "react-redux";

const extraArgument = {};

export const store = configureStore({
  reducer: {
    [companiesSlice.name]: companiesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<R = void> = ThunkAction<
  R,
  RootState,
  typeof extraArgument,
  UnknownAction
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
