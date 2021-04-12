import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // 店铺列表
    getVenderList(offset, limit) {
        return instance.get(`/admin/vender/list/${offset}/${limit}`)
    },
    // 解冻
    recoverVender(venderId) {
        return instance.get(`/admin/vender/recover/${venderId}`)
    },
    // 上架
    onVender(venderId) {
        return instance.get(`/admin/vender/on/${venderId}`)
    },
    // 下架
    offVender(venderId) {
        return instance.get(`/admin/vender/off/${venderId}`)
    },
    // 添加分账
    addVenderReceiver(venderId, trueName) {
        return instance.get(`/admin/vender/receiver/add/${venderId}/${trueName}`)
    },
    // 删除分账
    deleteVenderReceiver(venderId) {
        return instance.get(`/admin/vender/receiver/delete/${venderId}`)
    },
    // 店铺详情
    getVenderDetail(venderId) {
        return instance.get(`/admin/vender/detail/${venderId}`)
    },
    // 注销店铺
    utilLogoutOther(userName) {
        return instance.get(`/public/util/logoutOther?userName=${userName}`)
    },
    
}