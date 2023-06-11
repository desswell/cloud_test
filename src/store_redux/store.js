import { combineReducers, configureStore } from "@reduxjs/toolkit"
import DataReducer from "../store_redux/slices/dataUser";
export default configureStore({
    reducer: combineReducers({
        data: DataReducer
    })
})