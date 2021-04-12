import axios from 'axios'
import instance from './post'
// import { Message } from 'element-plus';
import { ElMessage } from 'element-plus'
import router from '../../router'

function open(message) {
    ElMessage({
        showClose: true,
        message,
        type: 'error'
    });
}
const config = {
    baseURL: '/rest/',
    timeout: 60 * 1000000,
};
const jsonAxios = axios.create(config)

instance.interceptors.request.use(
    config => {
        if (localStorage.token) { //判断token是否存在
            config.headers.Authorization = localStorage.token
            //  = 'Bearer f71b0217-6cdc-4f96-b752-6722cc8bf818';  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    response => {
        // console.log(response)
        return response;
    },
    error => {
        // console.log(error.response)
        if (error.response.status === 403 || error.response.status === 401) {
            localStorage.clear()
            open('登录过期，请退出重新登录')
            // Message.error('登录过期，请退出重新登录')
            return router.replace('/login');
        } else if (error.response.status === 502) {
            return open('服务器响应失败，请稍后重试')
            // return Message.error('服务器响应失败，请稍后重试')
        } else {
            return Promise.reject(error);
        }
    }
);

export default {instance, jsonAxios}