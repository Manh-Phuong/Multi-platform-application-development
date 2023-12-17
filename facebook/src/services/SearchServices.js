import { createAuthHeader } from "../utils/getToken";
import request from "../utils/httpRequest";

export const search = async ({ keyword, user_id = "1", index = "0", count = "20" }) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/search', { keyword, index, count }, {headers});
        return res.data;
    } catch (err) { 
        return err.response
    }
};

export const getListHistory = async ({index = "0", count = "20" }) => {
    try {
        const headers = await createAuthHeader();
        console.log(headers)
        const res = await request.post('/get_saved_search', {index, count }, {headers});
        return res.data;
    } catch (err) { 
        return err.response
    }
};

export const deleteHistory = async ({search_id, all}) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/del_saved_search', {search_id, all}, {headers});
        return res.data;
    } catch (err) { 
        return err.response
    }
};