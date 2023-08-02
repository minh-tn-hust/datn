import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "@/network/authApi";

const signIn = createAsyncThunk(
    'authentication/signIn',
    async (loginInfo, thunkApi) => {
        try {
            const response = await AuthApi.signIn(loginInfo);
            console.log("🚀 ~ file: authenticationThunk.js:8 ~ response:", response.data)
            if (response.status != 200) {
                return {
                    status: false,
                    message: response.data.message
                }
            }
            return response.data;

        } catch (error) {
            console.log("🚀 ~ file: authenticationThunk.js:19 ~ error:", error)
        }
    }
)

const signUp = createAsyncThunk(
    'authentication/signUp',
    async (signUpInfo, thunkApi) => {
        const response = await AuthApi.signUp(signUpInfo)
        return response.data;
    }
)

export {
    signIn,
    signUp
}