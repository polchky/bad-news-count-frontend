import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;

export default {

    async getComments(limit, offset) {
        const res = await axios.get(`/comments/?limit=${limit}&offset=${offset}`);
        return res.data;
    },

    async getMaster() {
        const res = await axios.get('/comments/master');
        return res.data;
    },

    async getMasterReplies(limit, offset) {
        const res = await axios.get(`/comments/master/replies/?limit=${limit}&offset=${offset}`);
        return res.data;
    },

    async getMasterRepliesCount() {
        const res = await axios.get('/comments/master/replies/count');
        return res.data;
    },

    async getCount() {
        const res = await axios.get('/comments/count');
        return res.data;
    },
};
