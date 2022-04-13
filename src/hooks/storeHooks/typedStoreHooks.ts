import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {RootStateType} from "../../redux/rootReducer";

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector

export const useTypedDispatch = () => useDispatch<AppDispatch>();