import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // vip配置列表
    getVipConfigurationList(offset, limit) {
        return instance.get(`/admin/vip/cfg/list/${offset}/${limit}`)
    },
    // 下架vip配置
    offVipConfiguration(vipCfgId) {
        return instance.get(`/admin/vip/cfg/off/${vipCfgId}`)
    },
    // 上架vip配置
    onVipConfiguration(vipCfgId) {
        return instance.get(`/admin/vip/cfg/on/${vipCfgId}`)
    },
    // 修改vip配置
    updateVipConfiguration(form) {
        return instance.post(`/admin/vip/cfg/update`, form)
    },
    // 新增vip配置
    addVipConfiguration(form) {
        return instance.post(`/admin/vip/cfg/add`, form)
    },
}