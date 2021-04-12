import baseAxios from '../js/base_axios'
let instance = baseAxios.instance
let jsonAxios = baseAxios.jsonAxios
const Qs = require('qs');

export default {
    // 产品分类列表
    getProductCategoryList(id) {
        return instance.get(`/public/category/listbyparentid/${id}?categoryStatus=active`)
    },
    // 添加产品分类
    addCategory(list) {
        return instance.post(`/admin/category/add/batch`, list)
    },
    // 删除产品分类
    deleteCategory(id) {
        return instance.get(`/admin/category/delete/${id}`)
    },
    // 编辑产品分类
    updateCategory(form) {
        return instance.post(`/admin/category/update`, form)
    },
}