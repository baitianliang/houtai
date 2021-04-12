import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // 产品列表
    getOrderList(offset, limit) {
        return instance.get(`/admin/order/list/${offset}/${limit}`)
    },
}