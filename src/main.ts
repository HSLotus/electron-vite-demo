import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';

import './style.css'
import 'ant-design-vue/dist/reset.css';

import './demos/ipc'
import api from '@/api/api.js'


// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)

app.config.globalProperties.$api = api

app.use(Antd).mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
})
