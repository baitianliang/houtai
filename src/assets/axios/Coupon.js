import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // 获取优惠劵规则列表
    getPromoRuleList(offset, limit) {
        return instance.get(`/admin/promo/rule/list/${offset}/${limit}`)
    },
    // 添加优惠劵规则
    addPromoRule(form) {
        return instance.post(`/admin/promo/rule/add`, form)
    },
    // 获取优惠劵列表
    getPromoCouponList(offset, limit) {
        return instance.get(`/admin/promo/coupon/list/${offset}/${limit}`)
    },
    // 上架优惠劵
    onPromoCoupon(couponId) {
        return instance.get(`/admin/promo/coupon/on/${couponId}`)
    },
    // 下架优惠劵
    offPromoCoupon(couponId) {
        return instance.get(`/admin/promo/coupon/off/${couponId}`)
    },
}