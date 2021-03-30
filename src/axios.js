import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.3:9000'
});

axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default instance;