import { createAuthHeader } from '../utils/getToken';
import request from '../utils/httpRequest';

export const getListComment = async ({id = "790", index = "0", count = "10"}) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_mark_comment', {id, index, count}, { headers });
        return res.data;
    } catch (err) {
        return err.response
    }
};

export const setComment = async ({id = "790", content, index="0",count = "10", mark_id="",type}) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/set_mark_comment', {id, content, index,count, mark_id,type}, { headers });
        return res.data;
    } catch (err) {
        return err.response
    }
};


export const setFeel = async ({id = "790", type}) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/feel', {id,type}, { headers });
        return res.data;
    } catch (err) {
        return err.response
    }
};

export const deleteFeel = async ({id = "790"}) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/delete_feel', {id}, { headers });
        return res.data;
    } catch (err) {
        return err.response
    }
};

export const getListFeel = async ({id = "790", index="0", count="1000"}) => {
    try {
        const headers = await createAuthHeader();
        const res = await request.post('/get_list_feels', {id, index, count}, { headers });
        return res.data;
    } catch (err) {
        return err.response
    }
};