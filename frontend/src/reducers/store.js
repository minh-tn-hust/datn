import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "@/reducers/authentication/authenticationReducer";
import problemReducer from "@/reducers/problem/problemReducer";
import {createWrapper} from "next-redux-wrapper";
import appRoutesReducer from "@/reducers/appRoutes/appRoutesReducer";

const reducers = combineReducers(
    {
        authentication: authenticationReducer,
        problem: problemReducer,
        appRoutes : appRoutesReducer
    }
);

const makeStore = () => configureStore({
    reducer : reducers
});

export const wrapper = createWrapper(makeStore);

