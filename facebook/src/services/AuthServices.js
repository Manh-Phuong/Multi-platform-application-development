import { createAuthHeader } from '../utils/getToken';
import request from '../utils/httpRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signup = async ({ email, password, uuid="string" }) => {
    try {
        const res = await request.post('/signup', { email, password, uuid });
        console.log(res.response)
        return res;
    } catch (err) {
        console.log(err.response.data);
    }
};

export const login = async ({ email, password, uuid="string" }) => {
    try {
        const res = await request.post('/login', { email, password, uuid });
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const checkEmail = async (email) => {
    try {
        const res = await request.post('/check_email', { email});
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const checkVerifyCode = async (email, code) => {
        try {
            const res = await request.post('/check_verify_code', { 
                email,
                code_verify: code
            });
            return res;
        }
        catch(err) {
            return err.response
        }
}

export const changeProfileAfterSignUp = async ({username}) => {
    try {
        const headers = await createAuthHeader();
        console.log(headers)
        const res = await request.post('/change_profile_after_signup', { 
            username,
        },{ headers });
        return res;
    } catch (err) {
        console.log(err.response);
    }
}