import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// import 'dayjs/locale/zh-cn'
// ElementPlus默认为英文，切换为中文
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router'
// import store from './store'
// import axios from 'axios'

// Vue.prototype.axios = axios;
// createApp(App).mount('#app')
createApp(App)
	.use(router)
	.use(ElementPlus, { locale })
	.mount('#app')

     
// const app = createApp(App)
// app.use(router)
// app.mount('#app')
    