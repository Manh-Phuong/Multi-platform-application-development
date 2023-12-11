import request from '../utils/httpRequest';

export const signup = async ({ email, password, uuid }) => {
    try {
        const res = await request.post('/signup', { email, password, uuid });

        return res;
    } catch (err) {
        console.log(err);
    }
};

export const login = async ({ email, password }) => {
    try {
        const res = await request.post('/login', { email, password, uuid });

        return res;
    } catch (err) {
        console.log(err);
    }
};