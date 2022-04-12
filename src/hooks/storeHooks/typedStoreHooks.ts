import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootStateType} from "../../redux/store";

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector

export const useTypedDispatch = () => useDispatch<AppDispatch>();