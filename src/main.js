import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueCompositionAPI, {createApp} from '@vue/composition-api'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'
import {useSecurityStore} from "@/stores/SecurityStore";

Vue.use(VueCompositionAPI)
Vue.use(PiniaVuePlugin)

const pinia = createPinia()

const app = createApp(App)
app.use(pinia);

useSecurityStore().init();

Vue.config.productionTip = false
new Vue({
    pinia,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')