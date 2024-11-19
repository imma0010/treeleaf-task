import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Custom hook to use the typed AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to use the typed RootState with useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
