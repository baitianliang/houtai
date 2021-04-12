import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // 用户列表
    getUserList(offset, limit) {
        return instance.get(`/admin/user/list/${offset}/${limit}`)
    },
    // 修改用户密码
    updataUserPwd(form) {
        return instance.post(`/admin/user/pwd`, form)
    },
}