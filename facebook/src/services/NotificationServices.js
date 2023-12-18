import { createAuthHeader } from "../utils/getToken";
import request from '../utils/httpRequest';

export const getNotification = async ({index = "0", count = "10"}) => {
    try {
        console.log(index, count)
        const headers = await createAuthHeader();
        const res = await request.post('/get_notification', { index, count }, {headers});
        return res.data;
    } catch (err) {
        return err.response
    }
};