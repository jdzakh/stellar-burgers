import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch, AppThunk } from '../services/store'

// Вместо простых `useDispatch` и `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector