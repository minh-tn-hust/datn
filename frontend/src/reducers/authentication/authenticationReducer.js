import {createSlice} from "@reduxjs/toolkit";
import {ROLE} from "@/constants/role";
import {signIn, signUp} from "@/reducers/authentication/authenticationThunk";
import {getSuccessMessage} from "@/reducers/authentication/authenticationSelector";

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        id : -1,
        role: ROLE.NON_AUTHORIZE,
        email: "",
        username: "",
        successMessage : "",
        failMessage : ""
    },
    reducers: {
        resetMessage : (state) => {
            state.successMessage = "";
            state.failMessage = "";
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                let payload = action.payload;
                if (payload.status !== undefined) {
                    state.failMessage = payload.message;
                } else {
                    state.id = payload.id;
                    state.role = payload.roles;
                    state.username = payload.username;
                    state.email = payload.email;
                    localStorage.setItem("access_token", payload.accessToken);
                }
            })
            .addCase(signUp.fulfilled, (state, action) => {
                let payload = action.payload;
                if (!payload.status) {
                    state.failMessage = payload.message;
                } else {
                    state.successMessage = payload.message;
                }
            })
    }
})

export const {resetMessage} = authenticationSlice.actions;
export default authenticationSlice.reducer;