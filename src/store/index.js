import Vuex from 'vuex'


/**
 * 批量引入modules中js文件
 */
let modulesFiles = require.context('./modules', true, /\.js$/);
let modules = modulesFiles.keys().reduce((modules = {},modulePath) => {
	let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
	modules[moduleName] = modulesFiles(modulePath).default;
	return modules
},{});
export default Vuex.createStore({
    state: {},
    mutations: {},
    actions: {},
    modules
});
