import { Platform } from 'quasar'
import Vue from 'vue'

const mobile = !Platform.is.desktop
Vue.prototype.$mobile = mobile
